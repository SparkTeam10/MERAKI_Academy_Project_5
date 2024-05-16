import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setRate,
  addRate,
  updateRateByUserId,
  deleteRateByUserId,
} from "../../Service/redux/reducers/rate";
import Button from "react-bootstrap/Button";
const Rate = () => {
  const token = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  return (
    <div>
      <div>Rate</div>
      <div>
        <input
          placeholder="Enter your name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Enter rating"
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Enter any comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <br />
        <div>
          <button
//            onClick={()=>{
//             axios.post( `....`,
//             {  userName, user_id, serviceProvider_id, rating, comment},
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }).then((result)=>{
// console.log(result);
// // dispatch(addRate(result.))
//             }).catch((err)=>{
//               console.log(err);
//             })
//           }}
          >Add</button>
          <button
            onClick={() => {
              navigate("/updateRate");
            }}
          >
            Update
          </button>
        </div>
      </div>
      <div></div>
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
  );
};

export default Rate;
