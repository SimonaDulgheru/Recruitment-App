// User token with npm package
// https://jwcrypto.readthedocs.io/en/latest/jwt.html
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
	const userToken = req.header("x-auth-token");

	if (!userToken) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}
	try {
		const secretToken = jwt.verify(userToken, config.get("jwtSecret"));

		req.user = secretToken.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: "Token is not valid" });
	}
};
