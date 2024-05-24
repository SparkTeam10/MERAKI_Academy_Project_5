import React, { Suspense, useEffect } from "react";
import axios from "axios";
// import Button from "react-bootstrap/Button";
import "./style.css";
// import Image from "react-bootstrap/Image";
// import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useLoaderData, Await, useNavigate } from "react-router-dom";
import { setCategory } from "../../Service/redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Image, Text, VStack,Spinner ,HStack } from "@chakra-ui/react";
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa"; 

export default function Category() {
  const { results } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const allCategory = useSelector((state) => state.auth.category);
  console.log(allCategory);
  useEffect(() => {
    axios
      .get(`http://localhost:5001/category/`)
      .then((result) => {
        dispatch(setCategory(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <VStack spacing={8} align="center" p={4}>
      <Text fontSize="2xl" fontWeight="bold">Our Categories</Text>
      <Suspense fallback={<Spinner size="xl" color="teal.500" />}>
        {" "}
        <Await resolve={results} errorElement={<p>Error </p>}>
          {(results) => {
            return (
              <div className="cat2">
                {results.data.result.map((elem, i) => {
                  return (
                    <div
                      key={i}
                      className="cat1"
                      onClick={() => {
                        navigate(`/${elem.id}`);
                      }}
                      style={{
                        border: "2px solid #CBD5E0",
                        borderRadius: "5%",
                        boxShadow: "5px 5px 5px teal",
                        transition: "transform 0.3s",
                        _hover: { transform: "scale(1.05)" }
                      }}
                    >
                     <Text fontSize="xl" fontWeight="bold">{elem.title}</Text>
                     <Container centerContent className="container">
                <Image src={elem.img} className="image" style={{borderRadius: "5%",boxShadow: "2px 2px 2px teal"}}/>
                <Text className="description">{elem.description}</Text>
              </Container>
                    </div>
                  );
                })}
                {console.log(results.data.result)}
              </div>
            );
          }}
        </Await>
      </Suspense>
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
 
  );
}

export const allCategory = async () => {
  const results = axios.get(`http://localhost:5001/category/`);
  return { results };
};



