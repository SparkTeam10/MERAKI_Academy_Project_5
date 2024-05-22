import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Box, Image, SimpleGrid, Text,Heading  } from '@chakra-ui/react';
const Flow = () => {
    const [title, setTitle] = useState("");
    useEffect(()=>{
        axios.get(`http://localhost:5001/serviceProvider/`).then((result)=>{
setTitle(result.data.result);
        }).catch((err)=>{
console.log(err);
        })
   
    },[])
  return (
    <Box p={5} maxWidth="1200px" mx="auto">
    <Heading as="h1" size="xl" mb={5} textAlign="center">Get inspiration for your next booking</Heading>
    {title.length > 0 && (
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {title.map((elem, i) => (
          <Box 
            key={i} 
            borderWidth="1px" 
            borderRadius="lg" 
            overflow="hidden" 
            p={5} 
            boxShadow="0 4px 6px rgba(0, 0, 128, 0.1), 0 10px 20px rgba(0, 0, 128, 0.15)" 
            transition="transform 0.3s, box-shadow 0.3s" 
            _hover={{ transform: 'scale(1.05)', boxShadow: '0 8px 10px rgba(0, 0, 128, 0.15), 0 14px 28px rgba(0, 0, 128, 0.25)' }}
          >
            <Text fontSize="xl" mb={2} fontWeight="semibold" textAlign="center">{elem.title}</Text>
            <Box width="100%" height="200px" overflow="hidden" borderRadius="md">
              <Image 
                src={elem.img} 
                alt={elem.title} 
                width="100%" 
                height="100%" 
                objectFit="cover" 
                borderRadius="md" 
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    )}
  </Box>
  )
}

export default Flow