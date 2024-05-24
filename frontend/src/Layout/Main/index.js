import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import {FaFacebook, FaTwitter, FaInstagram,FaPinterest} from "react-icons/fa"
import { Box, Flex, Link, Text, VStack, HStack,Center } from "@chakra-ui/react";
import Flow from "../../pages/FLOW/Flow";
export default function Main() {
  return (
    <Flex direction="column" minHeight="100vh">
      <Box as="header" bg="navy" p={4} color="white" boxShadow="sm">
        <Navbar />
      </Box>
      {/*  #FFDAB9 #800020 87CEEB*/}
      <Flex as="main" flex="1" direction="column" p={4}>
        <Center bg="teal.500" py={2} mb={4} borderRadius="md">
          <Flex as="nav" gap={14} justify="center">
            <Link
              as={NavLink}
              to="category"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              color="white"
            >
              Category
            </Link>
            <Link
              as={NavLink}
              to="/allserviceprovider"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              color="white"
            >
              All-Service
            </Link>
            <Link
              as={NavLink}
              to="/rated"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              color="white"
            >
              Top Rated
            </Link>
            <Link
              as={NavLink}
              to="Booking"
              _hover={{ textDecoration: "none", color: "teal.300" }}
              color="white"
            >
              Booking
            </Link>
          </Flex>
        </Center>
        <Outlet />
      </Flex>
      <Flow/>
      <Box as="footer" bg="#C0C0C0" py={4} mt="auto" boxShadow="sm">
      <VStack spacing={4} alignItems="center">
        <Text>Follow us:</Text>
        <HStack spacing={4} justifyContent="center">
          <Link href="https://www.facebook.com" color="#3b5998" isExternal>
            <FaFacebook size={24} /> 
          </Link>
          <Link href="https://www.twitter.com" color="#1da1f2" isExternal>
            <FaTwitter size={24} /> 
          </Link>
          <Link href="https://www.instagram.com" color="#bc2a8d" isExternal>
            <FaInstagram size={24} /> 
          </Link>
          <Link href="https://www.pinterest.com" color="#bd081c" isExternal>
            <FaPinterest size={24} /> 
          </Link>
        </HStack>
        <Box textAlign="center">
          <Text>Contact with us:</Text>
          <Text>Email: book&go@gmail.com</Text>
          <Text>Phone: +962787023107</Text>
        </Box>
        <Text>&copy; 2024 Spark. All rights reserved.</Text>
      </VStack>
    </Box>
    </Flex>
  
  );
}
