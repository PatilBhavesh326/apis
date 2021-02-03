const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const {check, validationResult} = require("express-validator");

router.get("/company/:companyName",  async (req, res)=>{
    
    const getCompany = await Company.findOne({companyName : req.params.companyName});

    try {
        res.send(getCompany);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});


router.post("/company", [
    check('companyName', 'Company Name is required').not().isEmpty(),
    check('companyEmail', 'Email is required').not().isEmpty().isEmail(),
    check('companyPhoneNumber', 'Company Phone Number is required').not().isEmpty().isNumeric(),
    check('companyFaxNumber', 'Fax Number is required').not().isEmpty().isAlphanumeric(),
    check('companyWebsite', 'Website is required').not().isEmpty(),
   // check('companyAddress', 'Company Address is required').not().isEmpty(),
], async (req, res)=>{
        
    const companyNew = new Company({
        companyName : req.body.companyName,
        companyEmail : req.body.companyEmail,
        companyAddress : req.body.companyAddress,
        // companyAddress.buildingNumber : req.body.buildingNumber,
        companyPhoneNumber : req.body.companyPhoneNumber,
        companyFaxNumber : req.body.companyFaxNumber,
        companyWebsite : req.body.companyWebsite,
    });

    
    const addCompany = await companyNew.save();

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({errors: errors.array()});
        }
        res.send(addCompany);
    } catch (error) {
        res.status(500).send(error);
    }

});

router.get("/company", async (req, res)=>{

    const companyList = await Company.find();

    try {
        res.send(companyList);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});


router.patch("/company/:companyName", async  (req, res)=>{

    const updateCompany = await Company.updateOne(
        { companyName: req.params.companyName},
            {
                $set: req.body
            }
    );

    try {
        res.send(updateCompany);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});

router.delete("/company/:companyName", async (req, res)=>{

    const deleteCompany = await Company.deleteOne({companyName : req.params.companyName});

    try {
        res.send(deleteCompany);
    } catch (error) {
        res.statusCode(500).send(error);
    }

});



module.exports = router;