import {BrowserRouter,Routes,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Home from "./components/Home"
function App() {


 

  return (
    <BrowserRouter>
    <Routes>
    <Route exact path="/" element={<Login/>}/>
      <Route exact path="/register" element={<SignUp/>}/>
      
      <Route exact path="/home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App