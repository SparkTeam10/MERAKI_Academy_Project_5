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
import { FaHome, FaUser, FaComments, FaArrowLeft } from "react-icons/fa";
const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.rates.rates);
  const userId =useSelector((state) => state.auth.userId);

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
                    onClick={() => navigate(`/booking/${elem.id}/${userId}/${elem.price}`)} 
                    
                  >
                    Book Now
                  </Button>
                </HStack>
              </Container>
            </div>
          );
        })}
      </VStack>

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
};

export default CategoryList;

export const allCategoryList = async () => {
  const results = axios.get(`http://localhost:5001/serviceProvider/category/`);
  return { results };
};
