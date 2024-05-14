import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  setBooking, 
  addBooking, 
  updateBookingById, 
  updateByUserId , 
  ReadAllByUserId , 
  deleteById } from "../../Service/redux/reducers/booking"
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

export default function Booking() {
  //const navigate = useNavigate();

  const [serviceProvider_id, setServiceProvider_id] = useState("");
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [price, setPrice] = useState("");
  const [booking_status, setBooking_status] = useState("");
  const [user_id, setUser_id] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div className="Booking">
      <h3>Booking Confirmation</h3>
      <input
        placeholder="serviceProvider_id"
        type="text"
        onChange={(e) => {
          setServiceProvider_id(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="start_date"
        type="number"
        onChange={(e) => {
          setStart_date(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="end_date"
        type="number"
        onChange={(e) => {
          setEnd_date(e.target.value);
        }}
      />
      <br />
      <input
         placeholder="price"
         type="number"
         onChange={(e) => {
            setPrice(e.target.value);
         }}
       />
      <br />
      <input 
        placeholder="booking_status"
        type="text"
        onChange={(e) => {
            setBooking_status(e.target.value);
        }}
      />
      <br />
      <input 
       placeholder="user_id"
       type="text"
       onChange={(e) => {
        setUser_id(e.target.value);
       }}
      /> <br />

      <button onClick={()=>{

        axios
        .post(`http://localhost:5001/users/booking`,{
            serviceProvider_id,
            start_date ,
            end_date ,
            price ,
            booking_status  ,
            user_id
        })
        .then((result)=>{
            setSuccess(true)
            setMsg(result.data.message)
            Swal.fire({
                position: "center",
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500, 
            })
        })
        .catch((error)=>{
            setSuccess(true)
            setMsg(" Please try agian something went wrong")
            Swal.fire({
                icon: "error",
                title : "error",
                text :" Please try agian something went wrong"
            })
        })
      }}
      >Confirm</button>



   
    </div>
  );
}
