import React, { useState, Suspense } from "react";
import { useLoaderData, useNavigate, Await } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
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
      <Button
        variant="primary"
        onClick={() => {
          axios
            .post(`http://localhost:5001/users/register`, {
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
              console.log(result.data.message);
            })
            .catch((error) => {
              setStatus(true);
              setError("The email already exists");
            });
        }}
      >
        User Register
      </Button>{" "}
      <Button
        variant="primary"
        onClick={() => {
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
              console.log(result.data.message);
            })
            .catch((error) => {
              setStatus(true);
              setError("The email already exists");
            });
        }}
      >
        Service Provider Register
      </Button>{" "}
      <br />
      {status && <>{error1}</>}
      <br />
      <div>
        <Button
          variant="dark"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
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
