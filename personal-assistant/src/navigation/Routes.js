import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import WelcomePage from "../welcomePage/WelcomePage";
import SignupForm from "../authentication/SignupForm";
import LoginForm from "../authentication/LoginForm";
import UserAccount from "../userAccount/UserAccount";
import EventForm from "../userAccount/forms/EventsForm";
import DailiesForm from "../userAccount/forms/DailiesForm";
import NotFound from "../NotFound";

function Routes({ login, signup }) {


  
  
    return (
      <main>
        <Switch>
          <Route exact path="/">
            <WelcomePage/>
          </Route>

          <Route exact path="/login">
            <LoginForm login={login} />
          </Route>

          <Route exact path="/signup">
            <SignupForm signup={signup} />
          </Route>
          
          <PrivateRoute exact path="/:username">
            <UserAccount />
          </PrivateRoute>
          
          <Route>
            <NotFound/>
          </Route>

        </Switch>
      </main>
    );
}

export default Routes;