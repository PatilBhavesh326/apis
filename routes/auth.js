const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const Candidate = require('../models/Candidate');

// @route   POST /auth/register
// @desc    Register user
// access   Public
router.post('/register', [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        const {firstName, lastName, email, phone, password} = req.body;

        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        const newUser = new User({
            firstName, lastName, email, phone, password
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        const newCandidate = new Candidate({
            userId: newUser._id
        });
        await newCandidate.save();

        return res.status(201).json({body: 'User registered successfully'});
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({errors: ['Server error']});
    }
});

// @route   POST /auth/login
// @desc    Login with username and password
// access   Public
router.post('/login', [
    check('email', 'Please enter valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6})
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({errors: [{msg: 'User not found'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        if (user.status === 'inactive') {
            return res.status(400).json({errors: [{msg: 'Please verify your account'}]});
        }

        const payload = {
            user: {id: user.id}
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: '5 days'},
            (err, token) => {
                if (err) throw err;
                return res.json({body: {token}});
            }
        );
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({errors: ['Server error']});
    }
});

module.exports = router;