const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/employee")
.then(()=>console.log("mongodb connected"))
.catch(()=>console.log("error"))

const EmployeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const EmployeeModel=mongoose.model("employee",EmployeeSchema)
module.exports=EmployeeModel