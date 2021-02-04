
import {HashRouter as Router, Route , Switch} from "react-router-dom";
import Auth from "routes/auth";
import Home from "../routes/home";
import Profile from "../routes/profile";
import Navigation from "./navigation";

const AppRouter =  ( {isLoggedIn ,userObj} )  => {
    return(
       <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
          </>
        )}
      </Switch>
    </Router>
    );
}

export default AppRouter;