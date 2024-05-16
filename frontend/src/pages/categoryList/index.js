import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
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
    <div className="cat">
      <h1>Category service providers</h1>
      <div className="ser">
        {categoryList.length &&
          categoryList.map((ele, i) => {
            console.log(ele.id);
            //             rates.map((element1,index)=>{
            //               console.log(element1.serviceprovider_id===ele.id);
            // if(element1.serviceprovider_id===ele.id){
            //   return <div>rate:{element1.rate}</div>
            // }
            //             })
            return (
              <div key={i} className="ser1">
                <h3>{ele.title}</h3>
                <h4>{ele.address}</h4>
                <h4>{ele.description}</h4>
                <br />
                <div>
                  Price:<h4>{ele.price}</h4>
                </div>
                <br /> <br />
                <img src={ele.img} />
                <button
                  onClick={() => {
                    navigate(`/providerID/${ele.id}`);
                  }}
                >
                  rate me
                </button>
              </div>
            );
          })}
      </div>
      <br />
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
  const results = axios.get(`http://localhost:5001/serviceProvider/category/`);
  return { results };
};
