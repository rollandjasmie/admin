import React, { Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Connexion from './Components/connexion/Connexion';
import { connect } from 'react-redux';
import Home from './Components/home/Home';
import users from './Components/users/All'
import user from './Components/users/User'
import logements from './Components/logements/All'
class App extends Component {
  state = {  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <BrowserRouter>
          {isAuthenticated ?(
          <Switch>
            <Route exact path="/" component={Home} />
                    {/*  Users */}
            <Route exact path="/user/all" component={users} />
            <Route exact path="/user/:user_id/show/" component={user} />
            <Route exact path="/logements/all" component={logements} />

              
            </Switch>
          ):
          <Switch>
            <Route exact path="/admin" component={Connexion} />
            <Redirect to='/admin' />
          </Switch>
          }

      </BrowserRouter>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    ...state.auth
  }
}

export default connect(mapStateToprops )(App);