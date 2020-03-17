// recuder for auth
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS
	// LOGIN_FAIL,
	// LOGOUT,
	// ACCOUNT_DELETED
} from "../actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null
};

export default function(state = initialState, action) {
	const { type, userIdAuth } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: userIdAuth
			};
		case REGISTER_SUCCESS:
			localStorage.setItem("token", userIdAuth.token);
			return {
				...state,
				...userIdAuth,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...userIdAuth,
				isAuthenticated: true,
				loading: false
			};

		default:
			return state;
	}
}
