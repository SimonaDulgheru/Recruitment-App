import { v4 as uuidv4 } from "uuid"; // Debugged, uuid needs to be in curly brackets https://www.npmjs.com/package/uuid
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
	const id = uuidv4;

	dispatch({
		type: SET_ALERT,
		userIdAuth: { msg, alertType, id }
	});

	// Remove password alert after cert amount of time(5 secs)
	setTimeout(() => dispatch({ type: REMOVE_ALERT, userIdAuth: id }), timeout);
};
