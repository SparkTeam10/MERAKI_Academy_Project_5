import React, { useState,Suspense } from "react";
import { useLoaderData, useNavigate,Await, } from "react-router-dom";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
//   const {results}=useLoaderData()
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  // const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
   return (
    <div>
      <input
        placeholder="userName"
        type="text"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        placeholder="age"
        type="number"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />
      <input
        placeholder="phone"
        type="number"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <input
        placeholder="country"
        type="text"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <input
        placeholder="image"
        type="text"
        onChange={(e) => {
          setImage(e.target.value);
        }}
      />
      <input
        placeholder="email"
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={()=>{
         axios.post(`http://localhost:5001/users/register`, {
            userName,
            age,
            PhoneNumber,
            email,
            password,
            country,
            image,
          })
      }}>register</button>
   
     {/* {
    error && <p>{error}</p>
     } */}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
    </div>
  );
}
// export const getRegister = async () => {
//   const results = axios.post(`http://localhost:5001/users/register`, {
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
