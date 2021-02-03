const mongoose = require("mongoose");

const employeerep = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    companyId : {type: mongoose.Schema.Types.ObjectId, ref:'company'},
    employeeRole : {type:String, required:true},
    isAdmin : {type:Boolean, default:false}
});


module.exports = EmployeeRep = mongoose.model("EmployeeRep", employeerep);