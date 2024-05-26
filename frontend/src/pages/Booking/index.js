import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addBooking } from "../../Service/redux/reducers/booking";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { Box, Button, Input } from "@chakra-ui/react"; 
import BGimg from "../Booking/bg4.jpeg";
import logo from "../Booking/icon.jpg";

export default function Booking() {
  const { serviceProviderId, userId, price } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
        setMsg("Please try again, something went wrong");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: " Please try again something went wrong",
        });
      });
  };

  return (
    <Box textAlign="center" background={`url(${BGimg})`} backgroundSize="cover" backgroundPosition="center" minHeight="100vh" padding="100px">
      <Box marginBottom="50px">
        <h3 style={{ color: "black", marginTop: "20px", fontSize: "40px", fontFamily: "Arial, sans-serif" ,backgroundColor: "#FFFFFF80"}}>Enjoy A Luxury Experience</h3>
      </Box>

      <h4 style={{ color: "black", marginBottom: "20px", fontSize: "24px" ,backgroundColor: "#FFFFFF80" }}>Ready to book? Let's get started!</h4>

      <Box marginBottom="20px">
        <h3 style={{ color: "black", marginBottom: "20px", fontSize: "24px", backgroundColor: "#FFFFFF80" }}>Booking Confirmation</h3>
      </Box>
     
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <label htmlFor="startDate" style={{ color: "black", fontSize: "25px", marginRight: "10px" }}>From:</label>
        <Input
          id="startDate"
          placeholder="Start Date" 
          type="date" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ width: "calc(50% - 5px)", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: "10px", marginRight: "10px" }}
        />
        
        <label htmlFor="endDate" style={{ color: "black", fontSize: "25px", marginRight: "10px" }}>To:</label>
        <Input
          id="endDate"
          placeholder="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{ width: "calc(50% - 5px)", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: "10px", marginLeft: "10px" }}
        />
      </Box>
      
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <label style={{ color: "black", fontSize: "25px", marginRight: "10px" }}>Price:</label>
        <Input
          placeholder="Price"
          type="number"
          value={price}
          readOnly
          style={{ width: "calc(50% - 5px)", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", padding: "10px", marginRight: "10px" }}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Button
          onClick={handleBookingSubmit}
          _hover={{ bg: "#ffcc00", color: "black" }}
          borderRadius="8px"
          padding="12px 24px"
          fontSize="16px"
          fontWeight="bold"
          cursor="pointer"
          boxShadow="0 6px 12px rgba(0, 0, 0, 0.15)"
          backgroundColor="#FFFFFF80"
          color="teal"
          border="none"
          width="50%"
        >
          Confirm
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" >
        <Button
          onClick={() => {
            navigate("/");
          }}
          _hover={{ bg: "#e6b800", color: "black" }}
          borderRadius="8px"
          padding="12px 24px"
          fontSize="16px"
          fontWeight="bold"
          backgroundColor="#ffcc00"
          color="black"
          border="none"
          cursor="pointer"
          marginRight="10px"
          boxShadow="0 6px 12px rgba(0, 0, 0, 0.15)"
        >
          <FaHome style={{ marginRight: "8px" }} />
          Home
        </Button>
        <Button
          onClick={() => {
            navigate(-1);
          }}
          _hover={{ bg: "#e6b800", color: "black" }}
          borderRadius="8px"
          padding="12px 24px"
          fontSize="16px"
          fontWeight="bold"
          backgroundColor="#ffcc00"
          color="black"
          border="none"
          cursor="pointer"
          boxShadow="0 6px 12px rgba(0, 0, 0, 0.15)"
        >
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back
        </Button>
      </Box>
    </Box>
  );
}
