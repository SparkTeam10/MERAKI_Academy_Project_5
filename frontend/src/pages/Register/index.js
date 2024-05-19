
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { jwtDecode } from 'jwt-decode';  // Ensure this import statement is present

import "./style.css";

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState(false);
  const [password, setPassword] = useState("");

  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    console.log(response)
    const decoded = jwtDecode(credential);
    axios.post(`http://localhost:5001/users/register`, {
      userName: decoded.name,
      email: decoded.email,
      image: decoded.picture,
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
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Error:", error);
  };

  const handleRegister = (url) => {
    axios.post(url, {
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
  };

  return (
    <GoogleOAuthProvider clientId="473978588038-ihv7cc44qg6ctcpgb3ns3sjeu8qv69lv.apps.googleusercontent.com">
      <div className="main">
        <h3>Register Now and Join Us</h3>
        <br />
        <div className="form">
          <input
            placeholder="userName"
            type="text"
            className="w-75"
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <input
            placeholder="age"
            type="number"
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <input
            placeholder="phone"
            type="number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />
          <input
            placeholder="country"
            type="text"
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />
          <input
            placeholder="image"
            type="text"
            onChange={(e) => setImage(e.target.value)}
          />
          <br />
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button onClick={() => handleRegister('http://localhost:5001/users/register')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              width="36px"
              height="36px"
            >
              <path fill="#3f51b5" d="M36,18c0,9.9-8.1,18-18,18S0,27.9,0,18S8.1,0,18,0S36,8.1,36,18z"/>
              <path fill="#fff" d="M20.5 27V20.8H23.2L23.6 18H20.5V16.5C20.5 15.7 20.8 15 22 15H23.6V12.4C22.9 12.3 21.9 12 20.7 12 17.5 12 15.6 13.7 15.6 16.4V18H13V20.8H15.6V27H20.5z"/>
            </svg>
            <span className="now">Register</span>
            <span className="play">User</span>
          </button>
          <br />
          <button onClick={() => handleRegister('http://localhost:5001/users/ServiceProvider')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 36"
              width="36px"
              height="36px"
            >
              <path fill="#4caf50" d="M36,18c0,9.9-8.1,18-18,18S0,27.9,0,18S8.1,0,18,0S36,8.1,36,18z"/>
              <path fill="#fff" d="M20.5 27V20.8H23.2L23.6 18H20.5V16.5C20.5 15.7 20.8 15 22 15H23.6V12.4C22.9 12.3 21.9 12 20.7 12 17.5 12 15.6 13.7 15.6 16.4V18H13V20.8H15.6V27H20.5z"/>
            </svg>
            <span className="now">Register</span>
            <span className="play">Service Provider</span>
          </button>
          <br />
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
          />
        </div>
        <br />
        <div className="b1">
          <Button className="b11" variant="dark" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button className="b11" variant="dark" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
