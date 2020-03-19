import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
// import Routes from './components/routing/Routes';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Profiles from './components/profiles/Profiles';
import CreateProfile from './components/profile-form/CreateProfile';

//Redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/auth';

import userToken from './utils/userToken';

import './App.css';
// import Navbar from "./components/layout/Navbar";

// if (localStorage.token) {
//   userToken(localStorage.token);
// }
//https://reactjs.org/docs/hooks-effect.html  ckeck Note about empty array

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      userToken(localStorage.token);
      // Only runs once when is loaded ([])
      // https://reactjs.org/docs/hooks-effect.html - check Note in docs
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />

          <Route exact path='/' component={Landing} />

          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/create-profile' component={CreateProfile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
