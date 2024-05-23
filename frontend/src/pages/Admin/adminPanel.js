import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import Swal from "sweetalert2";
import { Button , HStack,FormControl,
  FormLabel,
  Input,
  Stack,Center} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {setUsers} from "../../Service/redux/reducers/auth"
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa";
const AdminPanel = () => {
    const token = useSelector(state => state.auth.token)
    console.log(token);
  const [first, setFirst] = useState("");
  const [error, setError] = useState("");
  const [second, setSecond] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch()
  return (
    <div>
      <h1>AdminPanel</h1>
      <div className="h">
        <Button 
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
        </Button>
        <Button
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
                dispatch(setUsers(res.data.result))
                setFirst(res.data.result);
                console.log(res.data.result);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Service Providers
        </Button>
        <Button
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
        </Button>
        <Button
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
        </Button>
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
                <Button
                bg="red"
                  className="delete"
                  color="white"
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
                </Button>
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
                <Button bg="red"
                  className="delete"
                  color="white"
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
                </Button>
                <Button bg="navy"
                color="white"
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
                </Button>
              </div>
            );
          })}
        </div>
      )}
      {showInput && (
        <Center>
        <Stack spacing={4} m={4}>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              placeholder="Enter description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="image">
            <FormLabel>Image URL</FormLabel>
            <Input
              type="text"
              placeholder="Enter image URL"
              onChange={(e) => {
                setImg(e.target.value);
              }}
            />
          </FormControl>
        </Stack>
      </Center>
        // <div>
        //   <input
        //     type="text"
        //     placeholder=" title"
        //     onChange={(e) => {
        //       setTitle(e.target.value);
        //     }}
        //   />
        //   <br />
        //   <input
        //     type="text"
        //     placeholder=" description"
        //     onChange={(e) => {
        //       setDescription(e.target.value);
        //     }}
        //   />
        //   <br />
        //   <input
        //     type="text"
        //     placeholder="image"
        //     onChange={(e) => {
        //       setImg(e.target.value);
        //     }}
        //   />
        // </div>
      )}
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

export default AdminPanel;
