import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './loader.js'
import admin_connexion from  './Components/Admin/connexion/Connexion'
import Admin from './Components/Admin/Route'
import AjoutHebergements from './Components/pages/AjoutHebergements'
import forgot from "./Components/Admin/connexion/Forgot";
import newPassword from "./Components/Admin/connexion/Newpassword";
class App extends React.Component {
  render() {
      const { isAuthenticated } = this.props;
      const { user } = this.props;
    return (
      <>
        <BrowserRouter>
          <Switch>
            {
              isAuthenticated  && user.admin === true ?(
                <div>
                  <Admin />

                </div>
              ):null
            }
            {
              !isAuthenticated ? (
                <>
                    <Route exact path='/'  component={admin_connexion} >
                    </Route>
                  <Route excat path="/forgot/password" component={forgot} />
                  <Route exact path="/:run/:mot_id/:time_id/:email_id/:passe_id/:day_id" component={newPassword} />

                </>
              ) : null
            }
            </Switch>
        </BrowserRouter>
      </>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    ...state.auth
  }
}
export default connect(mapStateToprops)(App);
