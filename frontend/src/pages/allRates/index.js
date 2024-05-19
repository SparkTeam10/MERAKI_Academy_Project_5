import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  setRate,
  addRate,
  updateRateByUserId,
  // deleteRateByUserId,
} from "../../Service/redux/reducers/rate";
import Button from "react-bootstrap/Button";
const AllRates = () => {
    const token = useSelector((state) => state.auth.token);
    const user_id = useSelector((state) => state.auth.userId);
    const rates = useSelector((state) => state.rates.rates);
    console.log(rates,user_id);
  return (
    <div>
      <div>AllRates</div>
      {rates.length && rates.map((elem,i)=>{
        return (
<div key={i}>
 <div> {elem.username}</div>
 <div> {elem.rating}</div>
 <div> {elem.comment}</div>
 <button  className="delete" onClick={()=>{

 }}>x</button>  
   {/* <button
 onClick={() => {
   axios
     .put(
       `http://localhost:5001/rate/${elem.id}`,
       { userName, user_id, serviceProvider_id, rating, comment },
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
</button> */}
</div>
        )
      })}
    </div>
  );
};

export default AllRates;
