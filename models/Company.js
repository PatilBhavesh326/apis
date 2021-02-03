const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    // userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    companyName : {type:String, required:true},
    companyEmail : {type:String, required:true},
    companyAddress : 
        {
            buildingNumber : {type:Number},
            streetName : {type:String},
            city : {tpye:String},
            state : {type:String},
            zipCode : {type:String}
        },
    companyPhoneNumber : {type:Number, required:true},
    companyFaxNumber :{type:String, required:true},
    companyWebsite:{type:String, required:true},
    createdAt : {type:Date, default:Date.now}
});



module.exports = Company = mongoose.model("company", CompanySchema);