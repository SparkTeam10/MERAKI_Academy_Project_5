import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {setLogin,setUserId} from "../../Service/redux/reducers/auth"
import {  useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

export default function Login(){
  
    const dispatch = useDispatch()
    const {token} = useSelector((state)=>{
        return {
            token:state.auth.token
        }
    })
    
// console.log(token)
   
    const navigate = useNavigate()

    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(false);


    return(
        <div className="login">
            <h3>Welcome to your favorite booking website</h3>
            <input
            placeholder="email"
            type="text"
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
            <br /> 
            <input
            placeholder="password"
            type="password"
            onChange={(e)=>{
             setPassword(e.target.value)
            }}  
            />
            <br /> 
            <button onClick={()=>{
              axios
                .post(`http://localhost:5001/users/login`,{
                    email , 
                    password
                })
                .then((result)=>{
                    console.log(result);
                    dispatch(setLogin(result.data.token))
                    setSuccess(true)
                    setMsg(result.data.message)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: result.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      setTimeout(()=>{
                        navigate("/")
                      },1500)
                })
                .catch((error)=>{
                    setSuccess(true)
                    setMsg(" The email doesn’t exist or the password you’ve entered is incorrect")
                    Swal.fire({
                        icon: "error",
                        title : "Sorry",
                        text : "The email doesn’t exist or the password you’ve entered is incorrect"
                    })
                })
                
            }}>login</button>

            <br /> 

            <button onClick={()=>{
                navigate("/register")
                
            }}>Register</button>
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

