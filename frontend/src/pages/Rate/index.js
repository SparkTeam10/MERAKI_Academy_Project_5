import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  setRate,
  addRate,
  updateRateByUserId,
  deleteRateByUserId,
  setMyRate,
} from "../../Service/redux/reducers/rate";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Divider,
  Heading,
  Container
} from "@chakra-ui/react";
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa"; 

const Rate = () => {
  const token = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.auth.userId);
  const rates = useSelector((state) => state.rates.rates);
  const myRate = useSelector((state) => state.rates.myRate);
  console.log(myRate);
  const { serviceProvider_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    rateFun();
    axios
      .get(`http://localhost:5001/rate/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        dispatch(setMyRate(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(user_id,token);
  const rateFun = () => {
    axios
      .get(`http://localhost:5001/rate/`)
      .then((result) => {
        console.log(result.data.result);
        dispatch(setRate(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
        <Container centerContent minH="100vh" justifyContent="center">
      <VStack spacing={6} p={6} align="center" w="full">
        <Heading as="h1" size="xl" mb={4}>
          Rate
        </Heading>
        <VStack spacing={4} w="100%" maxW="md" align="center">
          <Input
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Input
            placeholder="Enter any comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={() => {
              axios
                .post(
                  `http://localhost:5001/rate/`,
                  { userName, user_id, serviceProvider_id, rating, comment },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((result) => {
                  console.log(result.data.product);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  dispatch(addRate(result.data.product));
                })
                .catch((err) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong, try again",
                  });
                });
            }}
          >
            Add
          </Button>
        </VStack>

        <Divider />

        <Heading as="h2" size="lg">
          My Rates
        </Heading>
        {myRate && myRate.length > 0 ? (
          myRate.map((elem, i) => (
            <Box
              key={i}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="lg"
              w="100%"
              bg="white"
              position="relative"
              _hover={{ boxShadow: "2xl" }}
            >
              <Text fontWeight="bold">{elem.rating}</Text>
              <Text>{elem.comment}</Text>
              <Button
                colorScheme="red"
                size="sm"
                position="absolute"
                top="4"
                right="4"
                onClick={() => {
                  axios
                    .delete(`http://localhost:5001/rate/${elem.id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((result) => {
                      dispatch(deleteRateByUserId(result.data.result[0].id));
                      console.log(elem.id);
                      console.log(result.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                X
              </Button>
            </Box>
          ))
        ) : (
          <Text>No rates found</Text>
        )}

        <Divider />

        {/* <Heading as="h2" size="lg">
        All Rates
      </Heading>
      {rates &&
        rates.map((elem, i) => (
          <Box
            key={i}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="lg"
            w="100%"
            bg="white"
            _hover={{ boxShadow: "2xl" }}
          >
            <Text fontWeight="bold">{elem.username}</Text>
            <Text>{elem.rating}</Text>
            <Text>{elem.comment}</Text>
          </Box>
        ))} */}

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
      </VStack>
    </Container>
  );
};

export default Rate;
