import axios from "axios";
import React, { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { Box, Text, Image, Grid, GridItem, VStack, Heading, Container,Button,HStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
const My = () => {
    const navigate=useNavigate()
  const token = useSelector((state) => state.auth.token);
  const id = useSelector((state) => state.auth.userId);
  const [users, setUser] = useState("")
  console.log(id);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5001/users/user/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data.result);
        console.log(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, token]);
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>My Profile</Heading>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
        {users && users.map((user, i) => (
          <React.Fragment key={i}>
            <GridItem>
              <VStack spacing={4} align="start" p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Text fontSize="lg"><strong>Name:</strong> {user.username}</Text>
                <Text fontSize="lg"><strong>Phone Number:</strong> {user.phonenumber}</Text>
                <Text fontSize="lg"><strong>Country:</strong> {user.country}</Text>
                <Text fontSize="lg"><strong>Email:</strong> {user.email}</Text>
              </VStack>
            </GridItem>
            <GridItem>
              <Box p={3} borderWidth="1px" borderRadius="lg" boxShadow="md">
                <Image src={user.image} alt={user.username} objectFit="cover" borderRadius="lg" />
              </Box>
            </GridItem>
          </React.Fragment>
        ))}
      </Grid>
      <HStack spacing={8} className="b1"justify="center" mt={8}>
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
    </Container>
  );
};

export default My;
