import React, { useState } from "react";
import {HashRouter as Router, Route , Switch} from "react-router-dom";
import Auth from "../routes/auth";
import Home from "../routes/home";

const AppRouter =  ( {isLogggedIn} )  => {
    return(
        <Router>
         <switch>
             {isLogggedIn ? (
             <>
                <Route exact path="/">
                    <Home />
                </Route> 
             </>) : (
                <Route exact path="/">
                     <Auth /> 
                </Route>)}
          </switch>
        </Router>
    );
}

export default AppRouter;