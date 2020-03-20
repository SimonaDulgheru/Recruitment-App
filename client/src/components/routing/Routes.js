import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-form/CreateProfile";
import EditProfile from "../profile-form/EditProfile";
import AddExperience from "../profile-form/AddExperience";

const Routes = () => {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/dashboard' component={Dashboard} />
				<Route exact path='/create-profile' component={CreateProfile} />
				<Route exact path='/edit-profile' component={EditProfile} />
				<Route exact path='/add-experience' component={AddExperience} />
			</Switch>
		</section>
	);
};

export default Routes;
