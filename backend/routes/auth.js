const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
const JWT_SECRET = "1t415fsf5137c8@ch2#$"; //? Secret key 
let success = false;
//* Signup a user "/api/auth/signup"

router.post('/signup', [
    body('name').isLength({ min: 10 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
], async (req, res) => {
    success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        //*Check the user is already present or not
        let user = await User.findOne({ email: req.body.email });
        let password = await User.findOne({ password: req.body.password });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, this email already exists" });
        } else if (password) {
            return res.status(400).json({success, error: "Try any other password" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const securedPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securedPass,
            });
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, token });
        }
    } catch (err) {
        res.status(500).json({success,  error: err });
    }
});
//* Login User "/api/auth/login
router.post('/login', [
    body('email').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        //* Check the user is present in database or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please try again!" });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success, error: "Please try again!" });
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        success = true;
        const token = jwt.sign(payload, JWT_SECRET);
        res.json({ success, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }

});

//* Get Logged in user details : /api/auth/getuser

router.post('/getuser', fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send({user});

    } catch (error) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});
module.exports = router;
