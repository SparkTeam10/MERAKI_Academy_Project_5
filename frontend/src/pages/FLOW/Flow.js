import React, { useEffect, useState } from 'react';
import { Box, Image, SimpleGrid, Text, Heading, Button } from '@chakra-ui/react';
import axios from 'axios';

const Flow = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3; // Change this value as needed

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when the currentPage changes

  const fetchData = () => {
    axios.get(`http://localhost:5001/serviceProvider/`)
      .then((response) => {
        const totalPages = Math.ceil(response.data.result.length / itemsPerPage);
        setTotalPages(totalPages);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedItems = response.data.result.slice(startIndex, endIndex);
        setItems(slicedItems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Box p={5} maxWidth="1200px" mx="auto">
      <Heading as="h1" size="xl" mb={5} textAlign="center">Get inspiration for your next booking</Heading>
      {items.length > 0 && (
        <>
          <SimpleGrid columns={itemsPerPage} spacing={10}>
            {items.map((elem, i) => (
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
          <Box textAlign="center" mt={5}>
            <Button variant="outline"
          colorScheme="teal"
          bg="navy"
          color="white"
          borderColor="navy" disabled={currentPage === 1} onClick={handlePrevPage}>Previous </Button>
            <Button variant="outline"
          colorScheme="teal"
          bg="navy"
          color="white"
          borderColor="navy" ml={2} disabled={currentPage === totalPages} onClick={handleNextPage}>Next </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Flow;
