import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { setDeleteService, setAllService, setUpdateService } from '../../Service/redux/reducers/serviceprovider'

export default function GetAllService() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [shwo, setShwo] = useState(false);
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const token = useSelector((state) => state.auth.token)
    const { service } = useSelector((state) => {
        return {
            service: state.service.service
        }
    })
    const allSerivces = async () => {
        try {
            const results = await axios.get(`http://localhost:5001/serviceProvider/`);
            console.log(results)
            dispatch(setAllService(results.data.result))
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {

        allSerivces()
    }, [])




    return (
        <div>
            <h1>All Service</h1>
            <div>
                {service &&

                    service.map((elem, i) => {

                        return <div key={i}>
                            <h3>{elem.title}</h3>
                            <p>{elem.description}</p>
                            <h2>{elem.address}</h2>
                            <img src={elem.img} />
                            <h1>{elem.price}</h1>
                            <button onClick={() => {
                                axios.delete(`http://localhost:5001/serviceProvider/${elem.id}`,
                                    {
                                        headers: { Authorization: `Bearer ${token}` }
                                    })
                                    .then((result) => {
                                       
                                        dispatch(setDeleteService(result.data.result[0].id))
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    })

                            }}>Delet</button>
                            <br></br>
                            <div>
                                {shwo && (
                                    <div>
                                        <input
                                            placeholder="Title"
                                            type="text"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <input
                                            placeholder="Description"
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <input
                                            placeholder="Address"
                                            type="text"
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <input
                                            placeholder="Image"
                                            type="text"
                                            onChange={(e) => setImg(e.target.value)}
                                        />
                                        <input
                                            placeholder="Price"
                                            type="number"
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>
                                )}
                                <button onClick={() => setShwo(true)}>Show Update</button>
                                <br></br>
                                <button
                                    onClick={() => {
                                        axios
                                            .put(`http://localhost:5001/serviceProvider/${elem.id}`, { title, description, address, img, price }, {
                                                headers: { Authorization: `Bearer ${token}` }
                                            })
                                            .then((result) => {
                                                setShwo(false);
                                                console.log(result);
                                                dispatch(setUpdateService({
                                                    title: result.data.result[0].title,
        
                                                    description: result.data.result[0].description,
                                                    address: result.data.result[0].address,
                                                    img: result.data.result[0].img,
                                                    price: result.data.result[0].price,
                                                    id:elem.id
                                            
                                                }));
                                            })
                                            .catch((error) => {
                                                console.log(error);
                                            });
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    })}

            </div>
            <br></br>
            <button onClick={() => {
                navigate('/createprovider')
            }}>
                Create Provider</button>
                <br></br>
            <button onClick={() => {
                navigate('/')
            }}>
                Home</button>
                <br></br>
            <button onClick={() => {
                navigate(-1);
            }}>Back</button>

        </div>
    )
};

