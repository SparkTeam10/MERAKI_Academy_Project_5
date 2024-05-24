import React, { useState, Suspense } from "react";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import axios from "axios";
//import Button from "react-bootstrap/Button";
import "./style.css"
import Swal from "sweetalert2";

import {
  Button,
  Image,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";

import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  //   const {results}=useLoaderData()
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [error1, setError] = useState("");
  const [status, setStatus] = useState(false);
  // const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="main">
        <h3>Register Now and Join Us</h3>
     <br /> 
    <div className="form">
    <input
        placeholder="User Name"
        type="text"
        className="w-75"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
       <br /> 
      <input
        placeholder="Age"
        type="number"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      /> 
      <br /> 
      <input
        placeholder="Phone Number"
        type="number"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
       <br /> 
      <input
        placeholder="Country"
        type="text"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
       <br /> 
      <input
        placeholder="Image"
        type="text"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
       <br /> 
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
       <br /> 
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
       <br /> 
       <div>
            <Button  onClick={() => {
          axios
            .post("http://localhost:5001/users/register", {
              userName,
              age,
              PhoneNumber,
              email,
              password,
              country,
              image,
            })
            .then((result) => {
              setStatus(true);
              setError(result.data.message);
              Swal.fire({
                position: "center",
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(()=>{
                navigate("/login")
              },1500)
            })
            .catch((error) => {
              setStatus(true);
              setError("The email already exists");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The email already exists",
              });
            });
        }}>
 
  Register By User
</Button> <br/>
<Button  onClick={() => {
          axios
            .post(`http://localhost:5001/users/ServiceProvider`, {
              userName,
              age,
              PhoneNumber,
              email,
              password,
              country,
              image,
            })
            .then((result) => {
              setStatus(true);
              setError(result.data.message);
              Swal.fire({
                position: "center",
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(()=>{
                navigate("/login")
              },1500)
            })
            .catch((error) => {
              setStatus(true);
              setError("The email already exists");
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The email already exists",
              });
            });
        }}>
 
        Register By Service Provider
</Button>
</div>
    </div>

    
      <br />
     
      <HStack spacing={8} className="navigation-buttons">
            <Button
              colorScheme="yellow"
              leftIcon={<FaHome />}
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Button>
            <Button
              colorScheme="yellow"
              leftIcon={<FaArrowLeft />}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          </HStack>

    </div>
  );
}
// export const getRegister = async () => {
//   const results = axios.post(http://localhost:5001/users/register, {
//     userName,
//     age,
//     PhoneNumber,
//     email,
//     password,
//     country,
//     image,
//   });
//   return { results };
// };