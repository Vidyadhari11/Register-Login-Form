import {useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"


const SignUp=()=>{
    const [name,setName]=useState("")
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

    const handleSubmit=(event)=>{
        event.preventDefault()
        if (name!=="" && email!=="" && password!==""){
            axios.post("http://localhost:3001/register",{name,email,password})
            .then(result=>{
                if (result.data==="Email already exists"){
                    setShowError(true)
                    setErrData(result.data)
                }
                else if (name!=="" && email!=="" && password!==""){
                    navigate("/")
                }
            })
            .catch(err=>console.log(err))
        }else{
            setShowError(true)
            setErrData("*All fields required")
            
        }
        
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">
                        <strong>Name</strong>
                    </label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" placehoder="Enter Name" autoComplete="off" id="name" name="name" className="form-control rounded-0"/>
                </div>
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
                <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                </form>
                {useAuthenticate()}
                <p>Already have an account</p>
                <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
            
            </div>
        </div>
    )
}

export default SignUp