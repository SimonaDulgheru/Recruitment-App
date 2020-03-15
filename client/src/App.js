import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { authUser } from "./actions/auth";

import "./App.css";
import userToken from "./utils/userToken";

if (localStorage.token) {
	userToken(localStorage.token);
}

//https://reactjs.org/docs/hooks-effect.html  ckeck Note about empty array
const App = () => {
	useEffect(() => {
		store.dispatch(authUser());
	}, []); // empty array means only runs once
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
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
