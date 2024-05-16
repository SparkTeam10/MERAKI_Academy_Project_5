import axios from 'axios';
import React, { useEffect } from 'react'
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from 'react-redux';
import {setRateJoined} from "../../Service/redux/reducers/rate"
import { useNavigate } from 'react-router-dom';
export default function Rated  ()  {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rateJoined = useSelector((state) => state.rates.rateJoined);
    console.log(rateJoined);
    useEffect(() => {
        axios.get(`http://localhost:5001/rate/join/rating`).then(
            (result)=>{
                console.log(result.data.result);
                dispatch(setRateJoined(result.data.result))
            }
        ).catch((err)=>{
            console.log(err);
        })
      }, []);
  return (
    <div>
      <div>Rated</div>
     {rateJoined && rateJoined.map((elem,i)=>{
        return(
            <div key={i}>
                <h3>{elem.title}</h3>
                <h4>{elem.address}</h4>
                <h4>{elem.description}</h4>
                <br />
                <div>
                  <h4>Price: {elem.price}</h4>
                  <h4>Rate: {elem.rating}</h4>
                  <h4>Comments: {elem.comment}</h4>
                </div>
                <br /> <br />
                <img src={elem.img} />
            </div>
        )
     })}
       <br />
      <div className="b1">
        <Button
          className="b11"
          variant="dark"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>{" "}
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
  )
}

