import React, { useState, useEffect } from "react";
import { Box, IconButton, Image, Flex, Icon } from "@chakra-ui/react";
const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1581814706561-f5bbfa7d984a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlbnQlMjBjYXJzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG91bmdlJTIwJTI2JTIwc3BhfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1563693267403-111c5d856e49?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFRvdXJpc218ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1561174356-638d86f24f04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVudGVydGFpbm1lbnR8ZW58MHx8MHx8fDA%3D",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box className="slider" position="relative">
      <Flex justify="center" align="center" height="500px">
        {images.map((elem, i) => (
          <Box
            key={i}
            justify="center"
            align="center"
            className={i === current ? "slide active" : "slide"}
            width="100%"
            height="100%"
            overflow="hidden"
            display={i === current ? "block" : "none"}
          >
            <Image
              src={elem}
              alt="Slide"
              className="imageSlider"
              boxSize="100%"
              objectFit="cover"
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
