require('./mongoose.js');
const Employee = require('./schema');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: mongoose } = require('mongoose');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/admin/:name', async (req, res) => {
    try{
        const { name } = req.params;  
        const data = {
            name: name
        }
        console.log(data);
        const result = await Employee.find(data).limit(10);
        console.log(result);
        res.status(200).json(result)
    }catch(e){
        console.log("error");
    }

})


app.post('/admin', (req, res) => {
    try{
        console.log("hit api")
    const { employeID, name, AadhaarNumber, mobileNumber, department, address } = req.body;

    const employee = new Employee({
        employeID: employeID,
        name: name,
        AadhaarNumber: AadhaarNumber,
        mobileNumber: mobileNumber,
        department: department,
        address: address
    })
    console.log(employee);

    employee.save((err) => {
        if (!err) {
            console.log("Successfully added");
            res.json({ msg: "successfull" })
        } else {
            console.log("Not added try again!!!");
            res.json({ e: err })
        }
    })
    }catch(e){
        console.log("error");
    }

})

app.patch('/admin', async (req, res) => {
    try {
        const { name, mobileNumber, department, address } = req.body;
        const old = {
            name: name
        }
        const update = {
            mobileNumber: mobileNumber,
            department: department,
            address: address
        }
        const result = await Employee.findOneAndUpdate(old, update, {
            returnOriginal: false
        })

        console.log(result);
        res.json(result);
    } catch (e) {
        console.log("error");
    }
})

app.delete('/admin', async (req, res) => {

    try {
        const { id } = req.body;
        await Employee.deleteOne({ employeID: id })
        res.json({ msg: "Deleted" })
    } catch (e) {
        const { id } = req.body;
        await Employee.deleteOne({ employeID: id })
        res.json({ msg: "Deleted" })
    }

})


app.listen(5550, () => {
    console.log("Application is running on port 5550");
})

