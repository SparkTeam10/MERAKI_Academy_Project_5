import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Link, Input, InputGroup, InputRightElement, IconButton, Image,Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import logo from "./logo.jpeg"
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate=useNavigate()
  const handleSearch = () => {
 console.log(searchTerm);
    if (searchTerm ==="hotels") {
    navigate('/1')
    }else if(searchTerm ==="restaurants"){
      navigate('/2')
    }
    else if(searchTerm ==="cars"){
      navigate('/3')
    }
    else if(searchTerm ==="spa"){
      navigate('/4')
    }
    else if(searchTerm ==="entertainment"){
      navigate('/5')
    }
    else if(searchTerm ==="tourism"){
      navigate('/6')
    }
  };
  return (
    <Box as="nav" bg="navy" p={4} color="white">
    <Flex align="center" justify="space-between">
      <Flex align="center">
        {/* <Image src={logo} alt="Spark Logo" boxSize="50px" mr={4} /> */}
        <Text as="h1" fontSize="xl" fontWeight="bold" color="white">
        Book&
            <Text as="span" color="#F2E32E">
              Go
            </Text>
          </Text>
      </Flex>
      <InputGroup maxW="400px" mr={4}>
        <Input placeholder="Search..." _placeholder={{ color: "gray.300" }} bg="white" color="black" onChange={(e) => setSearchTerm(e.target.value)}
  onKeyPress={(e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }}/>
        <InputRightElement>
        
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            bg="#F2E32E"
            _hover={{ bg: "yellow" }}
            color="black"
          />
          
        </InputRightElement>
      </InputGroup>
      <Flex gap={4}>
        <Link
          as={NavLink}
          to="/"
          _hover={{ textDecoration: "none", color: "teal.200" }}
          _activeLink={{ color: "teal.300" }}
          color="white"
        >
          Home
        </Link>
        <Link
          as={NavLink}
          to="about"
          _hover={{ textDecoration: "none", color: "teal.200" }}
          _activeLink={{ color: "teal.300" }}
          color="white"
        >
          About
        </Link>
        <Link
          as={NavLink}
          to="help"
          _hover={{ textDecoration: "none", color: "teal.200" }}
          _activeLink={{ color: "teal.300" }}
          color="white"
        >
          Help
        </Link>
        <Link
          as={NavLink}
          to="register"
          _hover={{ textDecoration: "none", color: "teal.200" }}
          _activeLink={{ color: "teal.300" }}
          color="white"
        >
          Register
        </Link>
        <Link
          as={NavLink}
          to="login"
          _hover={{ textDecoration: "none", color: "teal.200" }}
          _activeLink={{ color: "teal.300" }}
          color="white"
        >
          Login
        </Link>
        <Link
          as={NavLink}
          to="Account"
          _hover={{ textDecoration: "none", color: "teal.200" }}
          _activeLink={{ color: "teal.300" }}
          color="white"
        >
          Account
        </Link>
      </Flex>
    </Flex>
  </Box>

  );
};

export default Navbar;
