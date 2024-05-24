import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {setLogin,setUserId,setLogout} from "../../Service/redux/reducers/auth"
import { HStack, Button, Text } from "@chakra-ui/react";
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa"; 
import "./style.css";
import { useDispatch } from "react-redux";
export default function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
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
          leftIcon={<FaComments />}
          onClick={() => {
            navigate("/chat");
          }}
        >
          Chat
        </Button>
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
