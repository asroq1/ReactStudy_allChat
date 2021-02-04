import { dbService } from '../firebase';
import React, { useEffect, useState } from 'react';
import Nweet from 'components/nweet';

const Home = ({userObj}) => {
    const [nweet , setNweet] = useState("");
    const [nweets , setNweets] = useState([]);
    useEffect (() =>{
      dbService.collection("owls").onSnapshot(snapshot => {
        const nweetArray = snapshot.docs.map (doc => ({
          id :doc.id , 
          ...doc.data(),
        }));
          setNweets(nweetArray);
      })
       }, []);
    const onSubmit = async (event) =>{
        event.preventDefault();
        await dbService.collection("owls").add({
            text : nweet ,
            createAt : Date.now(),
            creatorId : userObj.uid,
        });
        setNweet("");
    }
    const onChange = event =>{
        const{ target : { value } }= event;
        setNweet(value);
    };
    return(
        <>
       <form onSubmit={onSubmit}>
           <input 
           value={nweet}
           onChange={onChange}
           type="text" 
           placeholder="what's on your mind?" 
           maxLength={120}/>

           <input 
           type="submit" 
           value="submit"/>
       </form>
       <div>
           {nweets.map((nweet) => (
             <Nweet 
             key={nweet.id} 
             nweetObj={nweet} 
             isOwner={nweet.creatorId === userObj.uid} />
  
            ))}
       </div>
       </>
    );
}


export default Home;