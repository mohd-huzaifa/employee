const mongoose = require('mongoose');
//  const  url ="mongodb+srv://mohdhuzaifakhan:mohdhuzaifakhan@cluster0.o0unkga.mongodb.net/employee?retryWrites=true&w=majority"
const url = "mongodb://0.0.0.0:27017/employee";
mongoose.connect(url,{
    useNewUrlParser: true
}).then(()=>{
    console.log("database connect");
}).catch((err)=>{
    console.log(err);
})