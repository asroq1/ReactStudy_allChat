import { dbService } from '../firebase';
import React, { useState } from 'react';

const Nweet = ({nweetObj , isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet , setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() =>{
        const ok = window.confirm("Are you sure You Want to Delete this Tweet?");
        if(ok){
          await dbService.doc(`owls/${nweetObj.id}`).delete();
        }
    }; 
    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async event =>{
        event.preventDefault();
        await dbService.doc(`owls/${nweetObj.id}`).update({
            text : newNweet,
        });
        setEditing(false);
    }
    const onChange = event => {
        const{
            target : {value},
        } = event;
        setNewNweet(value);
    }
    return (
        <div>
          {editing ? (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  value={newNweet}
                  placeholder="Edit your tweet"
                  required
                  onChange={onChange}
                />
                <input type="submit" value="Update Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          ) : (
            <>
              <h4>{nweetObj.text}</h4>
              {isOwner && (
                <>
                  <button onClick={onDeleteClick}>Delete Nweet</button>
                  <button onClick={toggleEditing}>Edit Nweet</button>
                </>
              )}
            </>
          )}
        </div>
      );
    };

export default Nweet;