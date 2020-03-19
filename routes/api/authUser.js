//Api routes for User authentication

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

// @ route GET api/authUser
// @desc Test route
// @acess Public
const User = require("../../models/User");

router.get("/", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            "-password"
        );
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
});
//Check for validation

// @ route GET api/authUser
// @desc Authentication User
// @acess Public
router.post(
    "/", [
        check("email", "Email required ").isEmail(),
        check("password", "Password  required").exists()
    ],
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid email and password" }]
                });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(400).json({
                    errors: [{ msg: "Invalid email and password" }]
                });
            }

            const userIdAuth = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                userIdAuth,
                config.get("jwtSecret"), { expiresIn: 360000 },
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