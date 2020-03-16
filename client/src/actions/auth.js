import axios from "axios";
import { setAlert } from "./alert";

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR
} from "./types";
import userToken from "../utils/userToken";

//Authenticate user/load
export const auth = () => async dispatch => {
	if (localStorage.token) {
		userToken(localStorage.token);
	}
	try {
		const res = await axios.get("/api/auth");

		dispatch({
			type: USER_LOADED,
			userIdAuth: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post("./api/users", body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			userIdAuth: res.data
		});
	} catch (err) {
		console.log(err);
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, "danger"))); // CSS
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};
