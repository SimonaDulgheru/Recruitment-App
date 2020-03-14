import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
const initialState = [];
export default function(state = initialState, action) {
	const { type, userIdAuth } = action;
	switch (type) {
		case SET_ALERT:
			return [...state, userIdAuth];
		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== userIdAuth);
		default:
			return state;
	}
}
