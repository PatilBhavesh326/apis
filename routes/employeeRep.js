const express = require("express");
const router = express.Router();
const EmployeeRep = require("../models/EmployeeRep");
const {check, validationResult} = require("express-validator");
const bcrypt = require('bcrypt');

router.post("/employeerep", [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please enter a valid Email').isEmail(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    check('employeeRole', 'Employee Role is required').not().isEmpty(),
    check('companyId', 'Company Id is required').not().isEmpty()
],async (req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        
        const {firstName, lastName, email, phone, password, employeeRole} = req.body;

        let user = await User.findOne({email});
        if (user) {
            return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        const newUser = new User({
            firstName, lastName, email, phone, password
        });

        const newEmployeeRep = new EmployeeRep ({
            userId, employeeRole, companyId, isAdmin
        });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        const save = await newEmployeeRep.save();
        res.send(save);

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;