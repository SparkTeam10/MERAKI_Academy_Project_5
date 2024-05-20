import axios from 'axios';
import React, { useEffect } from 'react'
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  Heading,
  SimpleGrid,
  Container,
  Stack,
} from '@chakra-ui/react';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';
import {setRateJoined} from "../../Service/redux/reducers/rate"
import { useNavigate } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
export default function Rated  ()  {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rateJoined = useSelector((state) => state.rates.rateJoined);
    console.log(rateJoined);
    useEffect(() => {
        axios.get(`http://localhost:5001/rate/join/rating`).then(
            (result)=>{
                console.log(result.data.result);
                dispatch(setRateJoined(result.data.result))
            }
        ).catch((err)=>{
            console.log(err);
        })
      }, []);
  return (
    <VStack spacing={8} p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Top Rated
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={10} w="100%">
        {rateJoined &&
          rateJoined.map((elem, i) => (
            <Box
              key={i}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="lg"
              bg="white"
              _hover={{ boxShadow: '2xl' }}
            >
              <VStack spacing={4} align="start">
                <Text fontWeight="bold" fontSize="2xl">
                  {elem.title}
                </Text>
                <Text fontSize="lg">{elem.address}</Text>
                <Text>{elem.description}</Text>
                <HStack>
                  <Text fontWeight="bold">Price:</Text>
                  <Text>{elem.price}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold">Rate:</Text>
                  <StarRating rating={elem.rating} />
                </HStack>
                <Text>
                  <Text fontWeight="bold">Comments:</Text> {elem.comment}
                </Text>
                <Image src={elem.img} borderRadius="md" boxSize="400px" objectFit="cover" />
              </VStack>
            </Box>
          ))}
      </SimpleGrid>
      <HStack spacing={8} className="b1">
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
    </VStack>
    // <div>
    //   <div>Rated</div>
    //  {rateJoined && rateJoined.map((elem,i)=>{
    //           return(
    //         <div key={i}>
    //             <h3>{elem.title}</h3>
    //             <h4>{elem.address}</h4>
    //             <h4>{elem.description}</h4>
    //             <br />
    //             <div>
    //               <h4>Price: {elem.price}</h4>
    //               <h4>Rate: <StarRating rating={elem.rating}/></h4>
                  
    //               <h4>Comments: {elem.comment}</h4>
    //             </div>
    //             <br /> <br />
    //             <img src={elem.img} />
    //         </div>
    //     )
    //  })}
    //    <br />
    //   <div className="b1">
    //     <Button
    //       className="b11"
    //       variant="dark"
    //       onClick={() => {
    //         navigate("/");
    //       }}
    //     >
    //       Home
    //     </Button>{" "}
    //     <Button
    //       className="b11"
    //       variant="dark"
    //       onClick={() => {
    //         navigate(-1);
    //       }}
    //     >
    //       Back
    //     </Button>
    //   </div>
    // </div>
  )
}

