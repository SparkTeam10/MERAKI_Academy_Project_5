import   React,{ useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  setBooking, 
  addBooking, 
  updateBookingById, 
  updateByUserId , 
  ReadAllByUserId , 
  deleteById } from "../../Service/redux/reducers/booking"
import { useDispatch , useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

export default function Booking() {
  

  const dispatch = useDispatch()


  // const { serviceProvider_id } = useParams()

  const navigate = useNavigate();
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
        type="number"
        value={serviceProvider_id}
        onChange={(e) => {
          setServiceProvider_id(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="start_date"
        type="date"
        value={start_date}
        onChange={(e) => {
          setStart_date(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="end_date"
        type="date"
        value={end_date}
        onChange={(e) => {
          setEnd_date(e.target.value);
        }}
      />
      <br />
      <input
         placeholder="price"
         type="number"
         value={price}
         onChange={(e) => {
            setPrice(e.target.value);
         }}
       />
      <br />
      <input 
        placeholder="booking_status"
        type="text"
        value={booking_status}
        onChange={(e) => {
            setBooking_status(e.target.value);
        }}
      />
      <br />
      <input 
       placeholder="user_id"
       type="number"
       value={user_id}
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
          console.log(result);
          dispatch(addBooking(result.data.booking))
            setSuccess(true)
            setMsg(result.data.message)
            Swal.fire({
                position: "center",
                icon: "success",
                title: result.data.message,
                showConfirmButton: false,
                timer: 1500, 
            })
            // setTimeout(()=>{
            //   navigate(`/${id}")
            // },1500)
            
        })
        .catch((error)=>{
            setSuccess(true)
            setMsg(" Please try agian something went wrong")
            Swal.fire({
                icon: "error",
                title : "Error",
                text :" Please try agian something, went wrong"
            })
        })
      }}
      >Confirm</button>

      <button onClick={()=>{
        navigate(-1)
      }}>BACK</button>



   
    </div>
  );
}
