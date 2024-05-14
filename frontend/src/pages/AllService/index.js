import React, { Suspense, useState } from "react";
import axios from "axios";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";

import { setAllService } from '../../Service/redux/reducers/serviceprovider'

export default function GetAllService() {

    const { results } = useLoaderData()
    // console.log(results)
    const navigate = useNavigate();
    

    return (
        <div>
            <h1>Service</h1>
            <Suspense fallback={<p>Loading data...</p>}>
                <Await resolve={results} errorElement={<p>Error </p>}>
                    {(results) => {
                        return (
                            <div>
                                {results.data.result.map((elem, i) => {
                                    return <div key={i}>
                                        <h3>{elem.title}</h3>
                                        <p>{elem.description}</p>
                                        <h2>{elem.address}</h2>
                                        <img src={elem.img} />
                                        <h1>{elem.price}</h1>
                                    </div>
                                })}
                                {console.log(results.data.product)}
                            </div>
                        )

                    }}
                </Await>
            </Suspense>
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

export const allService= async()=>{
    const results=  axios.get(`http://localhost:5001/serviceProvider/`);

    return {results}
  }