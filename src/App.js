import React, { useContext } from "react";
import { Switch, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Welcome from "./Pages/Welcome";
import AuthContext from "./Store/auth-context";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";

const App = () => {
  const authCtx = useContext(AuthContext);
  return(
    <React.Fragment>
      <Switch>
      {!authCtx.isLoggedIn && <Route path="/" exact>
        <Login />
      </Route>}
      {authCtx.isLoggedIn && <Route path="/" exact>
      <Welcome />
      </Route>}
      {!authCtx.isLoggedIn && <Route path="/login">
        <Login />
      </Route>}
      {authCtx.isLoggedIn && <Route path="/login">
        <Welcome />
        </Route>}
     <Route path="/profile">
        {authCtx.isLoggedIn && <Profile />}
        {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
    </Switch>
    </React.Fragment>
  ) 
}
export default App;