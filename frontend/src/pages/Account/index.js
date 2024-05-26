import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {setLogin,setUserId,setLogout} from "../../Service/redux/reducers/auth"
import { HStack, Button, Text } from "@chakra-ui/react";
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2'; 
import "./style.css";


export default function Account() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user_id =useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);


  
  const handleMyBooking = () => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "You are not logged in",
        text: "Please log in to view your bookings.",
      });
      navigate("/login");
    } else {
      navigate(`/mybooking/${user_id}`);
    }
  };



  return (
    <div>
      <HStack spacing={8} className="b1"justify="center" mt={8}>
      <Text fontSize="2xl" fontWeight="bold" >
        ACCOUNT
      </Text>
      </HStack>
      
      <br /> <br />
      <HStack spacing={8} className="b1"justify="center" mt={8}>
        <Button
          variant="solid"
          colorScheme="teal"
          leftIcon={<FaUser />}
          onClick={() => {
            navigate("/myOwnAccount");
          }}
        >
          My Profile
        </Button>
        <Button 
        variant="solid"
        colorScheme="teal"
        onClick={handleMyBooking}
      >
        My Booking
      </Button>

        <Button
          variant="solid"
          colorScheme="teal"
          leftIcon={<FaComments />}
          onClick={() => {
            navigate("/chat");
          }}
        >
          Chat
        </Button>
      
      

      </HStack>
   <HStack spacing={8} className="b1"justify="center" mt={8}>
   <Button
          variant="solid"
          colorScheme="teal"
          className="logout"
          onClick={() => {
            dispatch(setLogout(false));
          }}
        >
          Logout
        </Button>
   </HStack>

      <br /> <br /> <br /> <br />
      <HStack spacing={8} className="b1"justify="center" mt={8}>
        <Button
          colorScheme="yellow"
          leftIcon={<FaHome />}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          colorScheme="yellow"
          leftIcon={<FaArrowLeft />}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </HStack>
    </div>
  );
}
