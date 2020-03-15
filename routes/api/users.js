const express = require("express");
const router = express.Router();
const gravatar = require("gravatar"); // https://www.npmjs.com/package/gravatar
const bcrypt = require("bcryptjs"); //https://www.npmjs.com/package/bcrypt
const jwt = require("jsonwebtoken"); //https://github.com/auth0/node-jsonwebtoken
const config = require("config");
const { check, validationResult } = require("express-validator/check"); //https://express-validator.github.io/docs/

const User = require("../../models/User");

// @ route Post api/users
// @desc Register User
// @acess Public
router.post(
	"/",
	[
		check("name", "Name is required")
			.not()
			.isEmpty(),
		check("email", "Please include a valid email ").isEmail(),
		check(
			"password",
			"Please insert a password with 6 or more characters"
		).isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// If the name, email and password don't match we get an error
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		//See if user exists, search by email
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({
					errors: [{ msg: "User already exists" }]
				});
			}
			//Get user avatar
			const userAvatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm"
			});

			user = new User({
				name,
				email,
				userAvatar,
				password
			});
			//Encrypt password with bcrypt npm
			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const userIdAuth = {
				user: {
					id: user.id
				}
			};
			//Return jsonwebtoken
			//https://jwt.io/
			jwt.sign(
				userIdAuth,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.log(err);
			res.status(500).send("Server error");
		}
	}
);

module.exports = router;
