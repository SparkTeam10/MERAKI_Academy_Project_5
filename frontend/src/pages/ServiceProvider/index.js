import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector} from "react-redux";

import {setCreatService} from "../../Service/redux/reducers/serviceprovider"



 export default function ServiceProvider() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategory_Id] = useState("");

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
            <Button variant="warning" onClick={() => {
                axios.post(`http://localhost:5001/serviceProvider/`, {
                    title,
                    description,
                    address,
                    img,
                    price,   
                }).then((resulte)=>{
                    console.log(resulte);
                    dispatch(setCreatService(resulte.data.product[0]))
                })
                .catch((error)=>{
                    console.log(error);
                })
            }}>Create Service</Button>
            
            
            <Button 
                onClick={() => {
                    navigate("/");
                }}
            >
                Home
            </Button>
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


