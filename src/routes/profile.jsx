import { authService} from '../firebase';
import React, { useEffect, useState } from 'react';
import {useHistory} from "react-router-dom";

const Profile = ({ refreshUser ,userObj }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
      authService.signOut();

      history.push("/");
    };

      const onSubmit = async event =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName ){
            await userObj.updateProfile({
            displayName : newDisplayName,
          }); 
          refreshUser();
        }
      }
      const onChange = event =>{
        const{
          target : {value},
        } = event;
        setNewDisplayName(value);
      }

    return (
      <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
          <input 
           autoFocus
          onChange={onChange} 
          type="text" 
          placeholder="Display Name"
          value={newDisplayName}
          className="formInput"
          />
           <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
         Log Out
        </span>
    </div>
    );
  };

  export default Profile;