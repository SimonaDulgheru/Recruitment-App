import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
// import Route from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/auth";

import userToken from "./utils/userToken";

import "./App.css";
// import Navbar from "./components/layout/Navbar";

if (localStorage.token) {
	userToken(localStorage.token);
}
//https://reactjs.org/docs/hooks-effect.html  ckeck Note about empty array

const App = () => {
	useEffect(() => {
		// Only runs once when is loaded ([])
		// https://reactjs.org/docs/hooks-effect.html - check Note in docs
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route
								exact
								path='/register'
								component={Register}
							/>
							<Route exact path='/login' component={Login} />
							<Route
								exact
								path='/dashboard'
								component={Dashboard}
							/>
							<Route
								exact
								path='/create-profile'
								component={CreateProfile}
							/>
							<Route
								exact
								path='/edit-profile'
								component={EditProfile}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
