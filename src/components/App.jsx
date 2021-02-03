import React, { useState } from "react";
import AppRouter from "components/router";
import { authService } from "../firebase";

function App() {
  
  const [isLogggedIn , setIsLoggedIn] = useState(authService.currentUser());

  return (
    <>
      <AppRouter isLogggedIn={isLogggedIn }/>
      <footer> copy : {new Date().getFullYear()}</footer>
    </>
    
  );
}

export default App;
 