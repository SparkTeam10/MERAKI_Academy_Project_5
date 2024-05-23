import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../Service/redux/reducers/auth";
import axios from "axios";
import {
  Button,
  FormControl,
  Select,
  Input,
  Flex,
  Heading,
  Text,
  Box,
  HStack
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Message = ({ socket }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const from = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);
  console.log(users);
  console.log(from);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/all/all`)
      .then((res) => {
        dispatch(setUsers(res.data.result));
      })
      .catch((error) => {
        console.log(error);
      });
    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages]);
  const sendMessage = () => {
    socket.emit("message", { from, to, message });
  };
  const receivedMessage = (data) => {
    console.log(data);
    setMessages([...messages, data]);
  };
  return (
    <Flex direction="column" align="center" mt={8}>
    <Heading as="h1" mb={4}>
      Message
    </Heading>
    <FormControl mb={4}>
      <Input
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
    </FormControl>
    <Select
      placeholder="Select user"
      onChange={(e) => setTo(e.target.value)}
      mb={4}
    >
      {users.map((user) => (
        <option key={user.id} value={user.id} data-extra={user.username}>
         {user.id} {user.username}
        </option>
      ))}
    </Select>
    <Button colorScheme="blue" onClick={sendMessage} mb={4}>
      Send
    </Button>
    {/* {messages.map((message, index) => (
      <Text key={index} fontSize="sm">
        <Text as="span" fontWeight="bold">
          From: {message.from}
        </Text>{" "}
        {message.message}
      </Text>
    ))} */}
   <Box boxShadow="md">
  {messages.map((message, index) => (
    <Flex
      key={index}
      align="center"
      bg="white"
      p={3}
      borderRadius="md"
      mb={2}
      boxShadow="md"
    >
      <Text fontWeight="bold" mr={2}>
      From {message.from}:
      </Text>
      <Text>{message.message}</Text>
    </Flex>
  ))}
</Box>
<HStack spacing={8} className="b1" mt="10">
        <Button
          variant="outline"
          colorScheme="teal"
          bg="navy"
          color="white"
          borderColor="navy"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          variant="outline"
          colorScheme="teal"
          bg="navy"
          color="white"
          borderColor="navy"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </HStack>


  </Flex>
    // <div>
    //   <h1>Message</h1>

    //   <input
    //     type="text"
    //     placeholder="message"
    //     onChange={(e) => {
    //       setMessage(e.target.value);
    //     }}
    //   />
    //   <select
    //     onChange={(e) => {
    //       setTo(e.target.value);
    //     }}
    //   >
    //     {" "}
    //     {users.length &&
    //       users.map((elem, i) => {
    //         // console.log(elem.id);
    //         return (
    //           <option id={elem.id} key={i} value={elem.id} data-extra={elem.username}>
    //            {elem.id} {elem.username}
    //           </option>
              
    //         );
    //       })}
    //   </select>
    
    //   <button
    //     onClick={() => {
    //       sendMessage();
    //     }}
    //   >
    //     send
    //   </button>
    //   {messages.length > 0 &&
    //     messages.map((elem, i) => {
    //       return (
    //         <p key={i}>
    //           {" "}
    //           <small>
    //             from: {elem.from} {elem.message}
    //           </small>
    //         </p>
    //       );
    //     })}
    // </div>
  );
};

export default Message;
