
// import React, { useState, useEffect } from 'react';
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
//   const user_id = useSelector((state) => state.auth.userId); 

//   const [bookings, setBookings] = useState([]);
//   const [editingBooking, setEditingBooking] = useState(null);
//   const [newStartDate, setNewStartDate] = useState('');
//   const [newEndDate, setNewEndDate] = useState('');

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/booking/${user_id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setBookings(response.data.result);
//         console.log(response.data.result);
//       } catch (error) {
//         console.error('Error fetching bookings:', error.message);
//       }
//     };

//     if (token && user_id) {
//       fetchBookings();
//     } else {
//       console.error('Token or userId is missing');
//     }
//   }, [token, user_id]);

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
//         window.location.reload();

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
//       {bookings && bookings.length > 0 ? (
//         bookings.map((booking) =>
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
//                   <Button colorScheme="red" onClick={() => handleDelete(booking.id) }>Delete</Button>
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

//--------------------------------------------------------------------------



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// استيراد المكونات من Chakra UI
import { Button, Text, Box, Input, HStack } from '@chakra-ui/react';
import Swal from 'sweetalert2';

// استيراد الإجراءات اللازمة من متجر Redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteById, updateBookingById } from '../../Service/redux/reducers/booking';

const AllBooking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // استخدام useSelector للاطلاع على الحالة العامة
  const token = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.auth.userId); 

  // حالة محلية لحفظ الحجوزات
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
        window.location.reload();

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
        window.location.reload();
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
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>My Bookings</Text>
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) =>
          booking && booking.id ? (
            <Box key={booking.id} p={5} shadow="md" borderWidth="1px" mb={4}>
              {editingBooking === booking.id ? (
                <>
                  <Input placeholder="Start Date" type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} mb={2} />
                  <Input placeholder="End Date" type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} mb={2} />
                  <HStack spacing={4}>
                    <Button colorScheme="green" onClick={() => handleSave(booking.id)}>Save</Button>
                    <Button onClick={() => setEditingBooking(null)}>Cancel</Button>
                  </HStack>
                </>
              ) : (
                <>
                  <Text>Booking ID: {booking.id}</Text>
                  <Text>Start Date: {booking.start_date}</Text>
                  <Text>End Date: {booking.end_date}</Text>
                  <HStack spacing={4} mt={2}>
                    <Button colorScheme="blue" onClick={() => handleEdit(booking)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => handleDelete(booking.id)}>Delete</Button>
                  </HStack>
                </>
              )}
            </Box>
          ) : (
            <Box p={5} shadow="md" borderWidth="1px" mb={4}>
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
    </Box>
  );
};

export default AllBooking;

