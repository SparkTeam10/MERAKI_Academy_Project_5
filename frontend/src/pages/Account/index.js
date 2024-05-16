import { Outlet } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";



export default function Account() {
    const navigate = useNavigate()

  return (
    <div className='Account'>
     

        <button onClick={()=>{
                navigate("/register")
            }}>Register</button>
            <br/>
            <button onClick={()=>{
                navigate("/login")
            }}>Login</button>
            <br/>
            <button onClick={()=>{
                navigate("/")
            }}>Home</button>
            <br/>
            <button onClick={()=>{
                navigate(-1)
            }}>Back</button>
           
    
    </div>
  )
}


