
import React, { useState, Suspense, useEffect } from "react";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Swal from "sweetalert2";
import { Button, HStack } from "@chakra-ui/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import "./style.css";

export default function Register() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState(0);
  const [age, setAge] = useState(0);
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [error1, setError] = useState("");
  const [status, setStatus] = useState(false);
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");

  const uploadImage = (files) => {
    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("upload_preset", "gdciwpq7");
    fetch(
      "https://api.cloudinary.com/v1_1/diuwwiwqs/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setImg(data.secure_url);

      });
  };

  const handleRegister = (url) => {
    axios
      .post(url, {
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
        setTimeout(() => {
          navigate("/login");
        }, 1500);
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
        <input className="filee"
          type="file"
          onChange={(e) => {

            uploadImage(e.target.files)
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
          <Button
            onClick={() => {
              handleRegister("http://localhost:5001/users/register");
            }}
          >
            Register By User
          </Button>
          <br />
          <Button
            onClick={() => {
              handleRegister("http://localhost:5001/users/ServiceProvider");
            }}
          >
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
};


