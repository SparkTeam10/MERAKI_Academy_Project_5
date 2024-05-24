import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { setCreatService } from "../../Service/redux/reducers/serviceprovider"

import  "./style.css"



export default function ServiceProvider() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token)

    const category = useSelector((state) => state.auth.category)

    const [category_id,setCategory_Id]=useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");

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

    return (
        <div className="wrapper">
        <div className="con">
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
                type="file"
                onChange={(e)=>{
                    
                    uploadImage(e.target.files)}}
            />
            <input
                placeholder="Image URL"
                type="text"
                value={img}
                onChange={(e) => setImg(e.target.value)}
            />
            <input
                placeholder="Price" type="number"
                onChange={(e) => {
                    setPrice(e.target.value)
                }}
            />
            <select onChange={(e)=>{setCategory_Id(e.target.value)}}>
            {category && category.map((elm,i)=>{
                return (
                    <option key={i} value={elm.id}>
                    {elm.title}
                    </option>
                )
            })}
            </select>
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
                        category_id
                        
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
            }}>Create Service
            </Button>
            {status && <p className="success">Service created successfully!</p>}
            {error && <p className="error">{error}</p>}
            <br></br>
            <Button onClick={() => {
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
    </div>
    )
};



