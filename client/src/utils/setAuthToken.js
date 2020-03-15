import axios from "axios";

const setAuthToken = token => {
	if (token) {
		// x-auth-token from header Postman when we get a token
		// when we have a token we send it with every request, instead of picking which req to send it with
		axios.defaults.headers.common["x-auth-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-token"];
	}
};

export default setAuthToken;
