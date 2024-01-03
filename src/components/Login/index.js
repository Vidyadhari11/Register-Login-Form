import React from "react"
import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

const Login=()=>{
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [errData,setErrData]=useState("")
    const [showError,setShowError]=useState(false)
    const navigate=useNavigate()

    const useAuthenticate=()=>{
        if (showError){
            return <p className="text-danger mt-2">{errData}</p>
        }
        return null
    }

    const handleSubmit=event=>{
        event.preventDefault()
        if (email!==""){
            setShowError(false)
            setErrData("")
            
            axios.post("http://localhost:3001/",{email,password})
            .then(result=>{
                console.log(result.data)
                if (result.data==="Success"){
            
                    navigate("/home")
                }else if (result.data==="Password required"){
                    setErrData(result.data)
                    setShowError(true)
                }else if (result.data==="The password is incorrect"){
                    setErrData(result.data)
                    setShowError(true)
                }else{
                    alert("User not sign up")
                }
            })
        }else{
            setErrData("All fileds required")
            setShowError(true)
        }
        
    }

return(
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
    <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input onChange={(e)=>setEmail(e.target.value)} type="text" placehoder="Enter Email" autoComplete="off" id="email" name="email" className="form-control rounded-0"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password">
                <strong>Password</strong>
            </label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" placehoder="Enter Password" autoComplete="off" name="password" className="form-control rounded-0"/>
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        {useAuthenticate()}
       <p className="mt-2">Don't have an account</p>
        <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none mt-3">Sign Up</Link>
    
    </div>
</div>
)

}

export default Login