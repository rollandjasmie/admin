import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import './loader.js'
import admin_connexion from  './Components/Admin/connexion/Connexion'
import Admin from './Components/Admin/Route'
import AjoutHebergements from './Components/pages/AjoutHebergements'

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
