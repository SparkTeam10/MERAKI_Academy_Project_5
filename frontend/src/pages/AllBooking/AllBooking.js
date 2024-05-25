// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { HStack, Button, Box, Text, VStack } from "@chakra-ui/react";
// import { setBooking, deleteById } from "../../Service/redux/reducers/booking";

// const AllBooking = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const userId = useSelector((state) => state.auth.userId);
//   const allBookings = useSelector((state) => state.booking.booking);

//   useEffect(() => {
//     if (!token) {
//       Swal.fire({
//         title: "Please log in to view your bookings",
//         icon: "warning",
//         showConfirmButton: true,
//       }).then(() => {
//         navigate("/login");
//       });
//       return;
//     }

//     axios
//       .get(`http://localhost:5001/booking/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((result) => {
//         if (result.data.result === `There is no booking for this user yet`) {
//           Swal.fire({
//             title: "There is no booking for this user yet",
//             width: 600,
//           });
//         } else {
//           dispatch(setBooking(result.data.result));
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [dispatch, token, userId, navigate]);

//   const handleDelete = (bookingId) => {
//     axios
//       .delete(`http://localhost:5001/booking/${bookingId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(() => {
//         dispatch(deleteById(bookingId));
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "Booking deleted successfully",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleEdit = (bookingId) => {
//     navigate(`/booking/edit/${bookingId}`);
//   };

//   return React.createElement(
//     Box,
//     { p: 4 },
//     React.createElement(Text, { fontSize: "2xl", mb: 4 }, "My Bookings"),
//     allBookings.length === 0
//       ? React.createElement(Text, null, "No bookings found.")
//       : React.createElement(
//           VStack,
//           { spacing: 4 },
//           allBookings.map((booking) =>
//             React.createElement(
//               Box,
//               {
//                 key: booking.id,
//                 p: 4,
//                 borderWidth: "1px",
//                 borderRadius: "lg",
//                 w: "100%",
//               },
//               React.createElement(Text, null, `Start Date: ${booking.start_date}`),
//               React.createElement(Text, null, `End Date: ${booking.end_date}`),
//               React.createElement(Text, null, `Price: $${booking.price}`),
//               React.createElement(Text, null, `Status: ${booking.booking_status}`),
//               React.createElement(
//                 HStack,
//                 { spacing: 4, mt: 4 },
//                 React.createElement(
//                   Button,
//                   {
//                     colorScheme: "teal",
//                     onClick: () => handleEdit(booking.id),
//                   },
//                   "Edit"
//                 ),
//                 React.createElement(
//                   Button,
//                   {
//                     colorScheme: "red",
//                     onClick: () => handleDelete(booking.id),
//                   },
//                   "Delete"
//                 )
//               )
//             )
//           )
//         ),
//     React.createElement(
//       HStack,
//       { spacing: 4, mt: 4 },
//       React.createElement(
//         Button,
//         { colorScheme: "blue", onClick: () => navigate("/") },
//         "Home"
//       ),
//       React.createElement(
//         Button,
//         { colorScheme: "blue", onClick: () => navigate(-1) },
//         "Back"
//       )
//     )
//   );
// };

// export default AllBooking;


//------------------------------------------------------
   
// import React, { useEffect, useState } from 'react'; // Import React
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { HStack, Button, Text, Box, Input } from '@chakra-ui/react';
// import Swal from 'sweetalert2';
// import { setBooking, deleteById, updateBookingById } from '../../Service/redux/reducers/booking';

// const AllBooking = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const allbooking = useSelector((state) => state.booking.booking);
//   const userId = useSelector((state) => state.auth.userId);

//   const [editingBooking, setEditingBooking] = useState(null);
//   const [newStartDate, setNewStartDate] = useState('');
//   const [newEndDate, setNewEndDate] = useState('');

//   useEffect(() => {
//     if (!token) {
//       Swal.fire({
//         icon: 'error',
//         title: 'You are not logged in',
//         text: 'Please log in to view your bookings.',
//       });
//       navigate('/login');
//       return;
//     }

//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'User ID is missing',
//         text: 'Unable to fetch bookings without a valid user ID.',
//       });
//       return;
//     }

//     axios
//       .get(`http://localhost:5001/booking/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((result) => {
//         if (result.data.result === 'There is no booking for this user yet') {
//           Swal.fire({
//             title: 'There is no booking for this user yet',
//             width: 600,
//           });
//         } else {
//           dispatch(setBooking(result.data.result));
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error fetching bookings',
//           text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
//         });
//       });
//   }, [dispatch, userId, token, navigate]);

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5001/booking/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((result) => {
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: result.data.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         dispatch(deleteById(id));
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error deleting booking',
//           text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
//         });
//       });
//   };

//   const handleEdit = (booking) => {
//     setEditingBooking(booking.id);
//     setNewStartDate(booking.start_date);
//     setNewEndDate(booking.end_date);
//   };

//   const handleSave = (id) => {
//     axios
//       .put(
//         `http://localhost:5001/booking/${id}`,
//         {
//           start_date: newStartDate,
//           end_date: newEndDate,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((result) => {
//         dispatch(updateBookingById({ id, start_date: newStartDate, end_date: newEndDate }));
//         setEditingBooking(null);
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: result.data.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error updating booking',
//           text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
//         });
//       });
//   };

//   return (
//     <div>
//       <Text fontSize="2xl" fontWeight="bold">My Bookings</Text>
//       {allbooking && allbooking.length > 0 ? (
//         allbooking.map((booking) =>
//           booking && booking.id ? (
//             <Box key={booking.id} p={5} shadow="md" borderWidth="1px">
//               {editingBooking === booking.id ? (
//                 <>
//                   <Input placeholder="Start Date" type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />
//                   <Input placeholder="End Date" type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
//                   <Button colorScheme="green" onClick={() => handleSave(booking.id)}>Save</Button>
//                   <Button onClick={() => setEditingBooking(null)}>Cancel</Button>
//                 </>
//               ) : (
//                 <>
//                   <Text>Booking ID: {booking.id}</Text>
//                   <Text>Start Date: {booking.start_date}</Text>
//                   <Text>End Date: {booking.end_date}</Text>
//                   <Button colorScheme="blue" onClick={() => handleEdit(booking)}>Edit</Button>
//                   <Button colorScheme="red" onClick={() => handleDelete(booking.id)}>Delete</Button>
//                 </>
//               )}
//             </Box>
//           ) : (
//             <Box p={5} shadow="md" borderWidth="1px">
//               <Text>Error: Invalid booking data</Text>
//             </Box>
//           )
//         )
//       ) : (
//         <Text>No bookings available.</Text>
//       )}
//       <HStack spacing={8} justify="center" mt={8}>
//         <Button variant="outline" colorScheme="teal" onClick={() => { navigate('/'); }}>Home</Button>
//         <Button variant="outline" colorScheme="teal" onClick={() => { navigate(-1); }}>Back</Button>
//       </HStack>
//     </div>
//   );
// };

// export default AllBooking;


//---------------------------------------------------------------------------------
//---------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button, Text, Box, Input, HStack } from '@chakra-ui/react';
// import Swal from 'sweetalert2';
// import { deleteById, updateBookingById } from '../../Service/redux/reducers/booking';

// const AllBooking = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.auth.token);
//   const allBooking = useSelector((state) => state.booking.booking);
//   const userId = useSelector((state) => state.auth.userId);

//   const [editingBooking, setEditingBooking] = useState(null);
//   const [newStartDate, setNewStartDate] = useState('');
//   const [newEndDate, setNewEndDate] = useState('');

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:5001/booking/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((result) => {
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: result.data.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         dispatch(deleteById(id));
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error deleting booking',
//           text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
//         });
//       });
//   };

//   const handleEdit = (booking) => {
//     setEditingBooking(booking.id);
//     setNewStartDate(booking.start_date);
//     setNewEndDate(booking.end_date);
//   };

//   const handleSave = (id) => {
//     axios
//       .put(
//         `http://localhost:5001/booking/${id}`,
//         {
//           start_date: newStartDate,
//           end_date: newEndDate,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((result) => {
//         dispatch(updateBookingById({ id, start_date: newStartDate, end_date: newEndDate }));
//         setEditingBooking(null);
//         Swal.fire({
//           position: 'center',
//           icon: 'success',
//           title: result.data.message,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error updating booking',
//           text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
//         });
//       });
//   };

//   return (
//     <div>
//       <Text fontSize="2xl" fontWeight="bold">My Bookings</Text>
//       {allBooking && allBooking.length > 0 ? (
//         allBooking.map((booking) =>
//           booking && booking.id ? (
//             <Box key={booking.id} p={5} shadow="md" borderWidth="1px">
//               {editingBooking === booking.id ? (
//                 <>
//                   <Input placeholder="Start Date" type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />
//                   <Input placeholder="End Date" type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
//                   <Button colorScheme="green" onClick={() => handleSave(booking.id)}>Save</Button>
//                   <Button onClick={() => setEditingBooking(null)}>Cancel</Button>
//                 </>
//               ) : (
//                 <>
//                   <Text>Booking ID: {booking.id}</Text>
//                   <Text>Start Date: {booking.start_date}</Text>
//                   <Text>End Date: {booking.end_date}</Text>
//                   <Button colorScheme="blue" onClick={() => handleEdit(booking)}>Edit</Button>
//                   <Button colorScheme="red" onClick={() => handleDelete(booking.id)}>Delete</Button>
//                 </>
//               )}
//             </Box>
//           ) : (
//             <Box p={5} shadow="md" borderWidth="1px">
//               <Text>Error: Invalid booking data</Text>
//             </Box>
//           )
//         )
//       ) : (
//         <Text>No bookings available.</Text>
//       )}
//       <HStack spacing={8} justify="center" mt={8}>
//         <Button variant="outline" colorScheme="teal" onClick={() => { navigate('/'); }}>Home</Button>
//         <Button variant="outline" colorScheme="teal" onClick={() => { navigate(-1); }}>Back</Button>
//       </HStack>
//     </div>
//   );
// };

// export default AllBooking;

//-----------------------------------




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Text, Box, Input, HStack } from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { deleteById, updateBookingById } from '../../Service/redux/reducers/booking';

const AllBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.auth.userId); 

  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/booking/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    if (token && user_id) {
      fetchBookings();
    } else {
      console.error('Token or userId is missing');
    }
  }, [token, user_id]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5001/booking/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: result.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(deleteById(id));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error deleting booking',
          text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
        });
      });
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking.id);
    setNewStartDate(booking.start_date);
    setNewEndDate(booking.end_date);
  };

  const handleSave = (id) => {
    axios
      .put(
        `http://localhost:5001/booking/${id}`,
        {
          start_date: newStartDate,
          end_date: newEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(updateBookingById({ id, start_date: newStartDate, end_date: newEndDate }));
        setEditingBooking(null);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: result.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error updating booking',
          text: `Request failed with status code ${err.response?.status}: ${err.response?.data?.message || err.message}`,
        });
      });
  };

  return (
    <div>
      <Text fontSize="2xl" fontWeight="bold">My Bookings</Text>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) =>
          booking && booking.id ? (
            <Box key={booking.id} p={5} shadow="md" borderWidth="1px">
              {editingBooking === booking.id ? (
                <>
                  <Input placeholder="Start Date" type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />
                  <Input placeholder="End Date" type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
                  <Button colorScheme="green" onClick={() => handleSave(booking.id)}>Save</Button>
                  <Button onClick={() => setEditingBooking(null)}>Cancel</Button>
                </>
              ) : (
                <>
                  <Text>Booking ID: {booking.id}</Text>
                  <Text>Start Date: {booking.start_date}</Text>
                  <Text>End Date: {booking.end_date}</Text>
                  <Button colorScheme="blue" onClick={() => handleEdit(booking)}>Edit</Button>
                  <Button colorScheme="red" onClick={() => handleDelete(booking.id)}>Delete</Button>
                </>
              )}
            </Box>
          ) : (
            <Box p={5} shadow="md" borderWidth="1px">
              <Text>Error: Invalid booking data</Text>
            </Box>
          )
        )
      ) : (
        <Text>No bookings available.</Text>
      )}
      <HStack spacing={8} justify="center" mt={8}>
        <Button variant="outline" colorScheme="teal" onClick={() => { navigate('/'); }}>Home</Button>
        <Button variant="outline" colorScheme="teal" onClick={() => { navigate(-1); }}>Back</Button>
      </HStack>
    </div>
  );
};

export default AllBooking;
