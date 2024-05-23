import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { HStack, Button, Text } from "@chakra-ui/react";
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa"; 
import "./style.css";
export default function Account() {
  const navigate = useNavigate();

  return (
    <div>
      <Text fontSize="2xl" fontWeight="bold">
        ACCOUNT
      </Text>
      <br /> <br />
      <HStack spacing={8} className="action-buttons">
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
      </HStack>
      <br /> <br /> <br /> <br />
      <HStack spacing={8} className="navigation-buttons">
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
