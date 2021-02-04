import { authService } from '../firebase';
import React from 'react';
export default () => {
    // const history = useHistory();
    const onLogOutClick = () => {
      authService.signOut();
      // history.push("/");
    };
   
    return (
      <>  
        Profile
        <button onClick={onLogOutClick}>Log Out</button>
      </>
    );
  };