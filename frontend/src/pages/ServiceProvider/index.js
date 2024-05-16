import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { setCreatService } from "../../Service/redux/reducers/serviceprovider"



export default function ServiceProvider() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

    return (
        <div>
            <input
                placeholder="Title"
                type="text"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
            <input
                placeholder="Description" type="text"
                onChange={(e) => {
                    setDescription(e.target.value)
                }}
            />
            <input
                placeholder="Address" type="text"
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
            />
            <input
                placeholder="Image" type="text"
                onChange={(e) => {
                    setImg(e.target.value)
                }}
            />
            <input
                placeholder="Price" type="number"
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
            />
            <br></br>
            <br></br>
            <Button variant="warning" onClick={() => {
                if (!title || !description || !address || !img || !price) {
                    setError("Please fill in all fields.");
                    return;
                }
               
                axios.post(`http://localhost:5001/serviceProvider/`,
                    {
                        title,
                        description,
                        address,
                        img,
                        price,

                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                ).then((resulte) => {
                    console.log(resulte);
                    setStatus(true);
                    setError(resulte.data.message);
                    dispatch(setCreatService(resulte.data.product[0]))

                })
                    .catch((error) => {
                        console.log(error);
                        setStatus(false);
                        setError(error.message);
                    })
            }}>Create Service</Button>

            <br></br>
            <Button
                onClick={() => {
                    navigate("/");
                }}
            >
                Home
            </Button>
            <br></br>
            <button
                onClick={() => {
                    navigate(-1);
                }}
            >
                Back
            </button>
        </div>
    )
};


