import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const AdminPanel = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImNvdW50cnkiOiJqb3JkYW4iLCJyb2xlIjoxLCJpYXQiOjE3MTU2MTIyNjUsImV4cCI6MTcxNTY5ODY2NX0._hNtT5mO53dzuDz5sdwqNUu-CUn_a0VV9O97rAKRN-Y";
  const [first, setFirst] = useState("");
  const [error, setError] = useState("");
  const [second, setSecond] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <h1>AdminPanel</h1>
      <div className="h">
        <button
          onClick={() => {
            setShowInput(false);
            setSecond([]);
            axios
              .get(`http://localhost:5001/users`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setFirst(res.data.result);
                console.log(res.data.result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {" "}
          Users
        </button>
        <button
          onClick={() => {
            setShowInput(false);
            setSecond([]);
            axios
              .get(`http://localhost:5001/users/provider`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                setFirst(res.data.result);
                console.log(res.data.result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Service Providers
        </button>
        <button
          onClick={() => {
            setFirst([]);
            setShowInput(true);
            axios
              .get(`http://localhost:5001/category/`)
              .then((res) => {
                setSecond(res.data.result);
                console.log(res.data.result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          all categories
        </button>
        <button
          onClick={() => {
            setShowInput(true)
            axios
              .post(
                `http://localhost:5001/category/`,
                { title, description, img },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((res) => {
                setSecond(res.data.product);
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {" "}
          Add new Category
        </button>
      </div>
      {first.length && (
        <div className="user">
          {first.map((elem, i) => {
            return (
              <div key={i} className="userCart">
                <h2>{elem.username}</h2>
                <h3>{elem.email}</h3>
                <h3>{elem.country}</h3>
                <h3>{elem.age}</h3>
                <h3>{elem.phonenumber}</h3>
                <img src={elem.image} />
                <button
                  className="delete"
                  onClick={() => {
                    axios
                      .delete(`http://localhost:5001/users/${elem.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((result) => {
                        setFirst(
                          first.filter((one, i) => {
                            return one.id !== elem.id;
                          })
                        );
                      })
                      .catch((err) => {
                        setError(err.response.data.message);
                      });
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      )}
      {second.length && (
        <div className="user">
          {second.map((elem, i) => {
            return (
              <div key={i} className="userCart">
                <h2>{elem.title}</h2>
                <h3>{elem.description}</h3>
                <img src={elem.img} />
                <button
                  className="delete"
                  onClick={() => {
                    axios
                      .delete(`http://localhost:5001/category/${elem.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((result) => {
                        setSecond(
                          second.filter((one, i) => {
                            return one.id !== elem.id;
                          })
                        );
                      })
                      .catch((err) => {
                        setError(err.response.data.message);
                      });
                  }}
                >
                  X
                </button>
                <button
                  onClick={() => {
                    axios
                      .put(
                        `http://localhost:5001/category/${elem.id}`,
                        { title, description, img },
                        {
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      )
                      .then((result) => {
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Done ^_^",
                          showConfirmButton: false,
                          timer: 1500,
                        });
                        console.log(result.data);
                      })
                      .catch((err) => {
                        setError(err.response.data.message);
                      });
                  }}
                >
                  Update
                </button>
              </div>
            );
          })}
        </div>
      )}
      {showInput && (
        <div>
          <input
            type="text"
            placeholder=" title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder=" description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <br />
          <input
            type="text"
            placeholder="image"
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />
        </div>
      )}
      <div className="b1">
        <Button
          className="b11"
          variant="dark"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>{' '}
        <Button
          className="b11"
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
};

export default AdminPanel;
