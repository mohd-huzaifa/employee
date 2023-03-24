const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeID : {
        type: String,
        required : true
    },
    name :{
        type : String,
        required : true
    },
    AadhaarNumber : {
        type: Number,
        required : true
    },
    mobileNumber: {
        type: Number
    },
    department : {
        type: String,
        required : true
    },
    address : {
        type: String,
        required : true
    }
})

const Employee = new mongoose.model("Employee",employeeSchema);
module.exports =  Employee;