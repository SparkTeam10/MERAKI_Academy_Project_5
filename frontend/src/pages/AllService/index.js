import React, { Suspense, useState,useEffect } from "react";
import axios from "axios";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { setDeleteService ,setAllService} from '../../Service/redux/reducers/serviceprovider'

export default function GetAllService() {
const dispatch = useDispatch()
const navigate = useNavigate();
const {service} =useSelector((state)=>{
    return {
        service:state.service.service
    }
})
const allSerivces = async()=>{
try{
    const results= await axios.get(`http://localhost:5001/serviceProvider/`);
    console.log(results)
    dispatch(setAllService(results.data.result))
}catch(err){
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
                                {service&&
                                    
                                    service.map((elem, i) => {
                                       
                                    return <div key={i}>
                                        <h3>{elem.title}</h3>
                                        <p>{elem.description}</p>
                                        <h2>{elem.address}</h2>
                                        <img src={elem.img} />
                                        <h1>{elem.price}</h1>
                                        <button onClick={()=>{
                                            
                                            dispatch(setDeleteService(elem.id))
                                        }}>Delet</button>
                                    </div>
                                })}
                            
                            </div>
            <br></br>
            <button onClick={() => {
                navigate('/createprovider')
            }}>
            Create Provider</button>
            
            <button onClick={() => {
                navigate('/')
            }}>
                Home</button>
            <button onClick={() => {
                navigate(-1);
            }}>Back</button>

        </div>
    )
};

