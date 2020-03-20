import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";

// import Register from "./components/auth/Register";
// import Login from "./components/auth/Login";
// import Alert from "./components/layout/Alert";
import Navbar from "./components/layout/Navbar";
// import Dashboard from "./components/dashboard/Dashboard";
// import Route from "./components/routing/PrivateRoute";
// import CreateProfile from "./components/profile-form/CreateProfile";
// import EditProfile from "./components/profile-form/EditProfile";
// import AddExperience from "./components/profile-form/AddExperience";

import Routes from "./components/routing/Routes";

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
					<Navbar />
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
