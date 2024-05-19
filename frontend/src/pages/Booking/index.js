// // import React, { useState, useEffect } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import {
// //   setBooking,
// //   addBooking,
// //   updateBookingById,
// //   updateByUserId,
// //   deleteById,
// // } from "../../Service/redux/reducers/booking";
// // import { useDispatch, useSelector } from "react-redux";
// // import  Button  from "react-bootstrap/Button";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import {serviceProvider_id} from ""
// // export default function Booking() {




// //   // useEffect(() => {
// //   //   const getBooking = async () => {

// //   //         try {
// //   //           const res = await fetch(`/category/${setBooking}`)
// //   //           const data = await res.json()
// //   //           if(!res.ok){
// //   //             return console.log("there is a wrong");
// //   //           }
// //   //           return addBooking(data)
// //   //         } catch (error) {
// //   //           console.log(error.message);
            
// //   //         }
// //   //   };
// //   //   getBooking();
// //   // }, []);

// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const token = useSelector((state) => state.auth.token)
// //   const userid = useSelector((state) => state.auth.userId);


// //   const [serviceProvider_id, setServiceProvider_id] = useState("");
// //   const [start_date, setStart_date] = useState("");
// //   const [end_date, setEnd_date] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [booking_status, setBooking_status] = useState("");
// //   const [user_id, setUser_id] = useState("");
// //   const [msg, setMsg] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   return (
// //     <div className="Booking">
// //       <h3>Booking Confirmation</h3>

// //       <input
// //         placeholder="user_id"
// //         type="number"
// //         value={user_id}
// //         onChange={(e) => {
// //           setUser_id(e.target.value);
// //         }}
// //       />

// //       <br />
// //       <input
// //         placeholder="start_date"
// //         type="date"
// //         value={start_date}
// //         onChange={(e) => {
// //           setStart_date(e.target.value);
// //         }}
// //       />
// //       <br />
// //       <input
// //         placeholder="end_date"
// //         type="date"
// //         value={end_date}
// //         onChange={(e) => {
// //           setEnd_date(e.target.value);
// //         }}
// //       />
// //       <br />
    
// //       <input
// //         placeholder="booking_status"
// //         type="text"
// //         value={booking_status}
// //         onChange={(e) => {
// //           setBooking_status(e.target.value);
// //         }}
// //       />
// //       <br />

// //       <Button
// //         onClick={() => {
// //           axios
// //             .post(`http://localhost:5001/users/booking`, {
// //               serviceProvider_id,
// //               start_date,
// //               end_date,
// //               price,
// //               booking_status,
// //               user_id,
// //             },{
// //               headers:{
// //                 Authorization :`Bearer ${token}`
// //               }
// //             })
// //             .then((result) => {
// //               console.log(result.data);
// //               dispatch(setBooking(result.data.booking));
// //               console.log(result.data.booking);
// //               dispatch(addBooking(result.data.booking))
// //               setSuccess(true);
// //               setMsg(result.data.message);
// //               Swal.fire({
// //                 position: "center",
// //                 icon: "success",
// //                 title: result.data.message,
// //                 showConfirmButton: false,
// //                 timer: 1500,
// //               });
// //                 setTimeout(()=>{
// //                  navigate(`/category`)
// //                },1500)
// //             })
// //             .catch((error) => {
// //               setSuccess(true);
// //               setMsg(" Please try agian something went wrong");
// //               Swal.fire({
// //                 icon: "error",
// //                 title: "Error",
// //                 text: " Please try agian something, went wrong",
// //               });
// //             });
// //         }}
// //       >
// //         Confirm
// //       </Button>

// //       <Button
// //         onClick={() => {
// //           navigate(-1);
// //         }}
// //       >
// //         BACK
// //       </Button>
// //     </div>
// //   );
// // }

// //--------------------================================


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { setBooking, addBooking } from "../../Service/redux/reducers/booking";
// // import { useDispatch, useSelector } from "react-redux";
// // import Button from "react-bootstrap/Button";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import { createSelector } from "reselect";

// // // Memoized selector
// // const selectAuthToken = createSelector(
// //   (state) => state.auth,
// //   (auth) => auth.token
// // );

// // const selectUserId = createSelector(
// //   (state) => state.auth,
// //   (auth) => auth.userId
// // );

// // export default function Booking() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const token = useSelector(selectAuthToken);
// //   const userId = useSelector(selectUserId);

// //   const [serviceProviderId, setServiceProviderId] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [bookingStatus, setBookingStatus] = useState("");
// //   const [userIdInput, setUserIdInput] = useState(userId);
// //   const [msg, setMsg] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     const getBooking = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:5001/booking/${userId}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         const data = res.data;
// //         dispatch(setBooking(data.booking));
// //       } catch (error) {
// //         console.error("Error fetching bookings:", error.message);
// //       }
// //     };

// //     if (token) {
// //       getBooking();
// //     } else {
// //       console.error("Token is missing");
// //     }
// //   }, [dispatch, token, userId]);

// //   const handleBookingSubmit = () => {
// //     axios
// //       .post(
// //         `http://localhost:5001/booking`,
// //         {
// //           serviceProvider_id: serviceProviderId,
// //           start_date: startDate,
// //           end_date: endDate,
// //           price,
// //           booking_status: bookingStatus,
// //           user_id: userIdInput,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((result) => {
// //         const newBooking = result.data.booking;
// //         dispatch(addBooking(newBooking));
// //         setSuccess(true);
// //         setMsg(result.data.message);
// //         Swal.fire({
// //           position: "center",
// //           icon: "success",
// //           title: result.data.message,
// //           showConfirmButton: false,
// //           timer: 1500,
// //         });
// //         setTimeout(() => {
// //           navigate(`/category`);
// //         }, 1500);
// //       })
// //       .catch((error) => {
// //         console.error("Error creating booking:", error.message);
// //         setSuccess(true);
// //         setMsg(" Please try again, something went wrong");
// //         Swal.fire({
// //           icon: "error",
// //           title: "Error",
// //           text: " Please try again, something went wrong",
// //         });
// //       });
// //   };

// //   return (
// //     <div className="Booking">
// //       <h3>Booking Confirmation</h3>
// //       <input
// //         placeholder="user_id"
// //         type="number"
// //         value={userIdInput}
// //         onChange={(e) => setUserIdInput(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="start_date"
// //         type="date"
// //         value={startDate}
// //         onChange={(e) => setStartDate(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="end_date"
// //         type="date"
// //         value={endDate}
// //         onChange={(e) => setEndDate(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="price"
// //         type="number"
// //         value={price}
// //         onChange={(e) => setPrice(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="booking_status"
// //         type="text"
// //         value={bookingStatus}
// //         onChange={(e) => setBookingStatus(e.target.value)}
// //       />
// //       <br />
// //       <Button onClick={handleBookingSubmit}>Confirm</Button>
// //       <Button onClick={() => navigate(-1)}>BACK</Button>
// //     </div>
// //   );
// // }


// //00000000000000000000000000000000000000000000000

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { setBooking, addBooking } from "../../Service/redux/reducers/booking";
// // import { useDispatch, useSelector } from "react-redux";
// // import Button from "react-bootstrap/Button";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import { createSelector } from "reselect";

// // // Memoized selector
// // const selectAuthToken = createSelector(
// //   (state) => state.auth,
// //   (auth) => auth.token
// // );

// // const selectUserId = createSelector(
// //   (state) => state.auth,
// //   (auth) => auth.userId
// // );

// // export default function Booking() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const token = useSelector(selectAuthToken);
// //   const userId = useSelector(selectUserId);

// //   const [serviceProviderId, setServiceProviderId] = useState("");
// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [bookingStatus, setBookingStatus] = useState("");
// //   const [userIdInput, setUserIdInput] = useState(userId);
// //   const [msg, setMsg] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     const getBooking = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:5001/booking/${userId}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         const data = res.data;
// //         dispatch(setBooking(data.booking));
// //       } catch (error) {
// //         console.error("Error fetching bookings:", error.message);
// //       }
// //     };

// //     if (token) {
// //       getBooking();
// //     } else {
// //       console.error("Token is missing");
// //     }
// //   }, [dispatch, token, userId]);

// //   const handleBookingSubmit = () => {
// //     axios
// //       .post(
// //         `http://localhost:5001/booking`,
// //         {
// //           serviceProvider_id: serviceProviderId,
// //           start_date: startDate,
// //           end_date: endDate,
// //           price,
// //           booking_status: bookingStatus,
// //           user_id: userIdInput,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((result) => {
// //         const newBooking = result.data.booking;
// //         dispatch(addBooking(newBooking));
// //         setSuccess(true);
// //         setMsg(result.data.message);
// //         Swal.fire({
// //           position: "center",
// //           icon: "success",
// //           title: result.data.message,
// //           showConfirmButton: false,
// //           timer: 1500,
// //         });
// //         setTimeout(() => {
// //           navigate(`/category`);
// //         }, 1500);
// //       })
// //       .catch((error) => {
// //         console.error("Error creating booking:", error.message);
// //         setSuccess(true);
// //         setMsg(" Please try again, something went wrong");
// //         Swal.fire({
// //           icon: "error",
// //           title: "Error",
// //           text: " Please try again, something went wrong",
// //         });
// //       });
// //   };

// //   return (
// //     <div className="Booking">
// //       <h3>Booking Confirmation</h3>
// //       <input
// //         placeholder="user_id"
// //         type="number"
// //         value={userIdInput}
// //         onChange={(e) => setUserIdInput(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="start_date"
// //         type="date"
// //         value={startDate}
// //         onChange={(e) => setStartDate(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="end_date"
// //         type="date"
// //         value={endDate}
// //         onChange={(e) => setEndDate(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="price"
// //         type="number"
// //         value={price}
// //         onChange={(e) => setPrice(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="booking_status"
// //         type="text"
// //         value={bookingStatus}
// //         onChange={(e) => setBookingStatus(e.target.value)}
// //       />
// //       <br />
// //       <Button onClick={handleBookingSubmit}>Confirm</Button>
// //       <Button onClick={() => navigate(-1)}>BACK</Button>
// //     </div>
// //   );
// // }



// //+++++++++++++++++++++++++++++++++++++++++++++++


// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { setBooking, addBooking } from "../../Service/redux/reducers/booking";
// // import { useDispatch, useSelector } from "react-redux";
// // import Button from "react-bootstrap/Button";
// // import axios from "axios";
// // import Swal from "sweetalert2";
// // import { createSelector } from "reselect";

// // // Memoized selector
// // const selectAuthToken = createSelector(
// //   (state) => state.auth,
// //   (auth) => auth.token
// // );

// // const selectUserId = createSelector(
// //   (state) => state.auth,
// //   (auth) => auth.userId
// // );

// // const selectServiceProviderId = createSelector(
// //   (state) => state.serviceProvider,
// //   (serviceProvider) => serviceProvider.id
// // );

// // export default function Booking() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const token = useSelector(selectAuthToken);
// //   const userId = useSelector(selectUserId);
// //   const serviceProviderId = useSelector(selectServiceProviderId);

// //   const [startDate, setStartDate] = useState("");
// //   const [endDate, setEndDate] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [bookingStatus, setBookingStatus] = useState("");
// //   const [userIdInput, setUserIdInput] = useState(userId);
// //   const [msg, setMsg] = useState("");
// //   const [success, setSuccess] = useState(false);

// //   useEffect(() => {
// //     const getBooking = async () => {
// //       try {
// //         const res = await axios.get(`http://localhost:5001/booking/${userId}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         const data = res.data;
// //         dispatch(setBooking(data.booking));
// //       } catch (error) {
// //         console.error("Error fetching bookings:", error.message);
// //       }
// //     };

// //     const getServiceProviderId = async () => {
// //       try {
// //         const res = await axios.get("http://localhost:5001/serviceProvider", {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         const data = res.data;
// //         // Assuming you have an action to set the serviceProvider ID in your store
// //         dispatch(setServiceProviderId(data.id));
// //       } catch (error) {
// //         console.error("Error fetching service provider ID:", error.message);
// //       }
// //     };

// //     if (token) {
// //       getBooking();
// //       getServiceProviderId();
// //     } else {
// //       console.error("Token is missing");
// //     }
// //   }, [dispatch, token, userId]);

// //   const handleBookingSubmit = () => {
// //     axios
// //       .post(
// //         `http://localhost:5001/booking`,
// //         {
// //           serviceProvider_id: serviceProviderId,
// //           start_date: startDate,
// //           end_date: endDate,
// //           price,
// //           booking_status: bookingStatus,
// //           user_id: userIdInput,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       )
// //       .then((result) => {
// //         const newBooking = result.data.booking;
// //         dispatch(addBooking(newBooking));
// //         setSuccess(true);
// //         setMsg(result.data.message);
// //         Swal.fire({
// //           position: "center",
// //           icon: "success",
// //           title: result.data.message,
// //           showConfirmButton: false,
// //           timer: 1500,
// //         });
// //         setTimeout(() => {
// //           navigate(`/category`);
// //         }, 1500);
// //       })
// //       .catch((error) => {
// //         console.error("Error creating booking:", error.message);
// //         setSuccess(false);
// //         setMsg(" Please try again, something went wrong");
// //         Swal.fire({
// //           icon: "error",
// //           title: "Error",
// //           text: " Please try again, something went wrong",
// //         });
// //       });
// //   };

// //   return (
// //     <div className="Booking">
// //       <h3>Booking Confirmation</h3>
// //       <input
// //         placeholder="user_id"
// //         type="number"
// //         value={userIdInput}
// //         onChange={(e) => setUserIdInput(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="serviceProvider_id"
// //         type="number"
// //         value={serviceProviderId}
// //         readOnly
// //       />
// //       <br />
// //       <input
// //         placeholder="start_date"
// //         type="date"
// //         value={startDate}
// //         onChange={(e) => setStartDate(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="end_date"
// //         type="date"
// //         value={endDate}
// //         onChange={(e) => setEndDate(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="price"
// //         type="number"
// //         value={price}
// //         onChange={(e) => setPrice(e.target.value)}
// //       />
// //       <br />
// //       <input
// //         placeholder="booking_status"
// //         type="text"
// //         value={bookingStatus}
// //         onChange={(e) => setBookingStatus(e.target.value)}
// //       />
// //       <br />
// //       <Button onClick={handleBookingSubmit}>Confirm</Button>
// //       <Button onClick={() => navigate(-1)}>BACK</Button>
// //     </div>
// //   );
// // }

// //------000000000000-----------------------------


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setBooking, addBooking } from "../../Service/redux/reducers/booking";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { createSelector } from "reselect";


const selectAuthToken = createSelector(
  (state) => state.auth,
  (auth) => auth.token
);

const selectUserId = createSelector(
  (state) => state.auth,
  (auth) => auth.userId
);

const selectServiceProviderId = createSelector(
  (state) => state.auth,
  (auth) => auth.serviceProviderId // Assuming this is stored in the auth slice
);

const selectServiceProviderById = createSelector(
  [(state) => state.service.service, (_, id) => id],
  (services, id) => services.find(service => service.id === id)
);

export default function Booking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectAuthToken);
  const userId = useSelector(selectUserId);
  const serviceProviderId = useSelector(selectServiceProviderId);
  const serviceProvider = useSelector((state) => selectServiceProviderById(state, serviceProviderId));

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [price, setPrice] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [userIdInput, setUserIdInput] = useState(userId);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/booking/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        dispatch(setBooking(data.booking));
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    const getServiceProviderId = async () => {
      try {
        const res = await axios.get("http://localhost:5001/serviceProvider", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        dispatch(setServiceProviderId(data.id)); // Assuming this action exists in auth slice
      } catch (error) {
        console.error("Error fetching service provider ID:", error.message);
      }
    };

    if (token) {
      getBooking();
      getServiceProviderId();
    } else {
      console.error("Token is missing");
    }
  }, [dispatch, token, userId]);

  const handleBookingSubmit = () => {
    axios
      .post(
        `http://localhost:5001/booking`,
        {
          serviceProvider_id: serviceProviderId,
          start_date: startDate,
          end_date: endDate,
          price,
          booking_status: bookingStatus,
          user_id: userIdInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        const newBooking = result.data.booking;
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
        setMsg(" Please try again, something went wrong");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: " Please try again, something went wrong",
        });
      });
  };

  return (
    <div className="Booking">
      <h3>Booking Confirmation</h3>
      <input
        placeholder="user_id"
        type="number"
        value={userIdInput}
        onChange={(e) => setUserIdInput(e.target.value)}
      />
      <br />
      <input
        placeholder="serviceProvider_id"
        type="number"
        value={serviceProviderId || ''}
        readOnly
      />
      <br />
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
        onChange={(e) => setPrice(e.target.value)}
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
    </div>
  );
}

