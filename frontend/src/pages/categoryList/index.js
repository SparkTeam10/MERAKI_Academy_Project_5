import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import {
  setRate,
  addRate,
  updateRateByUserId,
  // deleteRateByUserId,
} from "../../Service/redux/reducers/rate";
import "./style.css";
import {
  Button,
  Image,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";
const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.rates.rates);

  console.log(rates);
  let { id } = useParams();
  console.log(id);
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5001/serviceProvider/category/${id}`)
      .then((result) => {
        console.log(result.data.message);
        if (
          result.data.message ===
          `There is no service_provider by category with this id`
        ) {
          Swal.fire({
            title: "There is no service_provider by this category yet.",
            width: 600,
          });
        } else {
          setCategoryList(result.data.result);
          setMessage(result.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    rateFun();
  }, []);
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
    <VStack spacing={8} align="center" p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Category Service Providers
      </Text>
      <VStack spacing={4} align="stretch">
        {categoryList.map((elem, i) => {
          return (
            <div
              key={i}
              className="cat1"
              style={{
                border: "2px solid #CBD5E0",
                borderRadius: "5%",
                boxShadow: "5px 5px 5px teal",
                transition: "transform 0.3s",
                _hover: { transform: "scale(1.05)" },
              }}
            >
              <Text fontSize="xl" fontWeight="bold">
                {elem.title}
              </Text>
              <Text>Address: {elem.address}</Text>
              <Text>Price: {elem.price} JD</Text>
              <Text textAlign="center">{elem.description}</Text>
              <Container centerContent className="container">
                <Image
                  src={elem.img}
                  className="image"
                  style={{ borderRadius: "5%", boxShadow: "2px 2px 2px teal" }}
                />

                <HStack spacing={4} className="b1" mt={5} mb={5}>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => navigate(`/providerID/${elem.id}`)}
                  >
                    Rate Me
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => navigate(`/booking/book/${elem.id}`)}
                  >
                    Book Now
                  </Button>
                </HStack>
              </Container>
            </div>
          );
        })}
      </VStack>

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
    //   <Flex direction="column" align="center" justify="center" py={8}>
    //   <Heading as="h1" size="xl" mb={4}>
    //     Category Service Providers
    //   </Heading>
    //   <VStack spacing={4} align="stretch">
    //     {categoryList.map((ele, i) => (
    //       <Flex
    //         key={i}
    //         direction={{ base: "column", md: "row" }}
    //         align="center"
    //         justify="space-between"
    //         p={4}
    //         bg="gray.100"
    //         borderRadius="md"
    //         w={{ base: "100%", md: "80%" }}
    //         mb={4}
    //       >
    //         <VStack align="start" spacing={2} flex="1">
    //           <Heading as="h3" size="lg">
    //             {ele.title}
    //           </Heading>
    //           <Text>{ele.address}</Text>
    //           <Text>{ele.description}</Text>
    //           <Text>Price: {ele.price}</Text>
    //           <Button
    //             colorScheme="blue"
    //             variant="outline"
    //             onClick={() => navigate(`/providerID/${ele.id}`)}
    //           >
    //             Rate Me
    //           </Button>
    //           <Button
    //             colorScheme="blue"
    //             variant="outline"
    //             onClick={() => navigate(`/booking/book/${ele.id}`)}
    //           >
    //             Book Now
    //           </Button>
    //         </VStack>
    //         <Image
    //           src={ele.img}
    //           alt={ele.title}
    //           maxW={{ base: "100%", md: "40%" }}
    //           borderRadius="md"
    //         />
    //       </Flex>
    //     ))}
    //   </VStack>
    //   <Flex mt={8}>
    //     <Button
    //       colorScheme="blue"
    //       mr={4}
    //       onClick={() => navigate("/")}
    //     >
    //       Home
    //     </Button>{" "}
    //     <Button
    //       colorScheme="blue"
    //       onClick={() => navigate(-1)}
    //     >
    //       Back
    //     </Button>
    //   </Flex>
    // </Flex>
    // <div className="cat">
    //   <h1>Category service providers</h1>
    //   <div className="ser">
    //     {categoryList.length &&
    //       categoryList.map((ele, i) => {
    //         console.log(ele.id);
    //                   return (
    //           <div key={i} className="ser1">
    //             <h3>{ele.title}</h3>
    //             <h4>{ele.address}</h4>
    //             <h4>{ele.description}</h4>
    //             <br />
    //             <div>
    //               Price:<h4>{ele.price}</h4>
    //             </div>
    //             <br /> <br />
    //             <img src={ele.img} />
    //             <button
    //               onClick={() => {
    //                 navigate(`/providerID/${ele.id}`);
    //               }}
    //             >
    //               rate me
    //             </button>
    //             <button
    //               onClick={() => {
    //                 navigate(`/booking/book/${ele.id}`);
    //               }}
    //             >
    //               book now
    //             </button>
    //           </div>
    //         );
    //       })}
    //   </div>
    //   <br />
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
  );
};

export default CategoryList;

export const allCategoryList = async () => {
  const results = axios.get(`http://localhost:5001/serviceProvider/category/`);
  return { results };
};
