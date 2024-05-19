import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLogin, setUserId } from "../../Service/redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import {GoogleLogin ,GoogleOAuthProvider,} from "@react-oauth/google"
import axios from "axios";
import Swal from "sweetalert2";

export default function Login() {
  const dispatch = useDispatch();
  const token  = useSelector((state) => state.auth.token);
  const  user_id  = useSelector((state) => state.auth.userId);

  // console.log(token)

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);


  const handleGoogleSuccess = (response) => {
    const { credential } = response;
    axios.post("http://localhost:5001/users/login", {email,password})
      .then((res) => {
        console.log(res.data);
        const { token, userId, userEmail } = res.data;
        console.log(res.data);
        dispatch(setUserId(userId));
        dispatch(setLogin(token));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate(`/home`);
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleFailure = (error) => {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Google Login Failed",
      text: error.message,
    });
  };



  if (email === "admin@yahoo.com" && password === "111") {
    navigate("/Admin");
  }
  return (
    <GoogleOAuthProvider clientId="473978588038-ihv7cc44qg6ctcpgb3ns3sjeu8qv69lv.apps.googleusercontent.com">
      <div className="login">
        <h3>Welcome to your favorite booking website</h3>
        <input
          placeholder="email"
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            axios
              .post(`http://localhost:5001/users/login`, {
                email,
                password,
              })
              .then((result) => {
                dispatch(setUserId(result.data.userId));
                dispatch(setLogin(result.data.token));
                setSuccess(true);
                setMsg(result.data.message);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: result.data.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
                setTimeout(() => {
                  navigate(`/`);
                }, 1500);
              })
              .catch((error) => {
                setSuccess(true);
                setMsg(
                  "The email doesn’t exist or the password you’ve entered is incorrect"
                );
                Swal.fire({
                  icon: "error",
                  title: "Sorry",
                  text: "The email doesn’t exist or the password you’ve entered is incorrect",
                });
              });
          }}
        >
          login
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </button>
        <br />
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <br />
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <br />
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );


}


