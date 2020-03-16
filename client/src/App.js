import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
//Redux
import { Provider } from "react-redux";
import store from "./store";

import { auth } from "./actions/auth";

import userToken from "./utils/userToken";

import "./App.css";

if (localStorage.token) {
	userToken(localStorage.token);
}
//https://reactjs.org/docs/hooks-effect.html  ckeck Note about empty array
// Only runs once when is loaded ([])
// https://reactjs.org/docs/hooks-effect.html - check Note in docs

const App = () => {
	useEffect(() => {
		store.dispatch(auth());
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
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
