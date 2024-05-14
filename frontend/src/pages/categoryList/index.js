import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
const CategoryList = () => {
  const navigate = useNavigate();
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
        }else{
            setCategoryList(result.data.result);
            setMessage(result.data.message);
        }
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="cat">
      <h1>Category service providers</h1>
   <div className="ser">
   {categoryList.length &&
        categoryList.map((elem, i) => {
          return (
            <div key={i} className="ser1">
              <h3 >{elem.title}</h3>
              <h4>{elem.address}</h4>
              <h7>{elem.description}</h7>
              <br />
              <div>Price:<h9>{elem.price}</h9></div>
              <br/> <br/>
              <img src={elem.img} />
            </div>
          );
        })}
   </div>
   <br/>
      <div className="b1">
        <Button
          className="b11"
          variant="dark"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>{" "}
        <Button
          className="b11"
          variant="dark"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default CategoryList;

export const allCategoryList = async () => {
  const results = axios.get(
    `http://localhost:5001/serviceProvider/category/`
  );
  return { results };
};
