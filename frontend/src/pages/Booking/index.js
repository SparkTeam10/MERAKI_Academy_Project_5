
import React, { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import { setBooking, addBooking } from "../../Service/redux/reducers/booking";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { createSelector } from "reselect";



// const selectAuthToken = createSelector(
//   (state) => state.auth,
//   (auth) => auth.token
// );

// const selectUserId = createSelector(
//   (state) => state.auth,
//   (auth) => auth.userId
// );

// const selectServiceProviderId = createSelector(
//   (state) => state.auth,
//   (auth) => auth.serviceProviderId 
// );

// const selectServiceProviderById = createSelector(
//   [(state) => state.service.service, (_, id) => id],
//   (services, id) => services.find(service => service.id === id)
// );

export default function Booking() {
 
  const { serviceProviderId, userId, price } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  console.log(token);


  // const serviceProvider = useSelector((state) => selectServiceProviderById(state, serviceProviderId));

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [price, setPrice] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  // const [userIdInput, setUserIdInput] = useState(userId);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);


  console.log("serviceProviderId>>>>" ,serviceProviderId);
  console.log("userId>>>>>>" , userId);
  console.log("price>>>>", price);



  // useEffect(() => {
  //   const getBooking = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5001/booking/${serviceProviderId}/${userId}`, {
          
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = res.data;
  //       dispatch(setBooking(data.booking));
  //       console.log("res >>>>" ,res);
  //       console.log("dispatch(setBooking(data.booking))>>>>>>",res.data.booking);
        

  //     } catch (error) {
  //       console.error("Error fetching bookings:", error.message);
  //     }
  //   };

  //   if (token) {
  //     getBooking();
  //   } else {
  //     console.error("Token is missing");
  //   }
  // }, [dispatch, token, userId,serviceProviderId ]);

  const handleBookingSubmit = () => {
    axios

      .post(
        `http://localhost:5001/booking/`,
        {
          serviceProvider_id: serviceProviderId,
          start_date: startDate,
          end_date: endDate,
          price,
          booking_status: bookingStatus,
          user_id: userId,
        },
        {
          headers:{
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        (result) => {
          console.log(result);
        const newBooking = result.data.booking;
        console.log(result.data.booking);
        // dispatch(setBooking(result.data.token))
        dispatch(addBooking(newBooking));
        setSuccess(true);
        setMsg(result.data.message);
        Swal.fire({
          position: "center",
          icon: "success",
          title: result.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          navigate(`/category`);
        }, 1500);
      })
      .catch((error) => {
        console.error("Error creating booking:", error.message);
        setSuccess(false);
        setMsg("Please try again, something went wrong")
        Swal.fire({
          icon: "error",
          title: "Error",
          text:  " Please try again something went wrong",
        });
      });
  };

  return (
    <div className="Booking">
      <h3>Booking Confirmation</h3>
      <input
        placeholder="start_date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br />
      <input
        placeholder="end_date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br />
      <input
        placeholder="price"
        type="number"
        value={price}
        readOnly
      />
      <br />
      <input
        placeholder="booking_status"
        type="text"
        value={bookingStatus}
        onChange={(e) => setBookingStatus(e.target.value)}
      />
      <br />
      <Button onClick={handleBookingSubmit}>Confirm</Button>
      <Button onClick={() => navigate(-1)}>BACK</Button>
      <Button onClick={()=> navigate("/") }>Home</Button>
    </div>
  );
}




