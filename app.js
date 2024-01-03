const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const EmployeeModel=require('./mongo')
const bcrypt=require("bcrypt")

const  app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect("mongodb://localhost:27017/employee")

app.post("/",(req,res)=>{
    const {email,password}=req.body
    
    EmployeeModel.findOne({email:email})
    .then(user=>{
        if (user){
            if (password===""){
                res.json("Password required")
            }else{
                bcrypt.compare(password,user.password,(err,response)=>{
                    if (response){
                        res.json("Success")
                    }else{
                        res.json("The password is incorrect")
                    }
                })
            }
        }else{
            res.json("User not sign up")
        }
    })
    .catch(err=>res.json("User not sign up"))
})

app.post("/register",async(req,res)=>{
    const {email,password,name}=req.body
    try{
        const check=await EmployeeModel.findOne({email:email}) 
        if (check){
            res.json("Email already exists")
        }else{
            bcrypt.hash(password,10)
            .then(hash=>{
                EmployeeModel.create({name,email,password:hash})
                .then(employees=>res.json(employees))
                .catch(err=>res.json(err))
            })
            
        }
    }
    catch(err){
        res.json(err)
    }
    
    
})

app.listen(3001,()=>{
    console.log("Server is running on port 3001")
})
