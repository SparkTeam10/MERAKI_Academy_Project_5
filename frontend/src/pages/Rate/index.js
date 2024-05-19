import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  setRate,
  addRate,
  updateRateByUserId,
  deleteRateByUserId,
  setMyRate,
} from "../../Service/redux/reducers/rate";
import Button from "react-bootstrap/Button";
const Rate = () => {
   const token = useSelector((state) => state.auth.token);
  const user_id = useSelector((state) => state.auth.userId);
  const rates = useSelector((state) => state.rates.rates);
  const myRate = useSelector((state) => state.rates.myRate);
  console.log(myRate);
  const { serviceProvider_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  useEffect(() => {
    rateFun();
  }, [dispatch]);
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
    <div>
      <div>Rate</div>
      <div>
        <input
          placeholder="Enter your name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Enter rating"
          onChange={(e) => {
            setRating(e.target.value);
          }}
        />
        <br />
        <input
          placeholder="Enter any comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <br />
        <div>
          <button
            onClick={() => {
              axios
                .post(
                  `http://localhost:5001/rate/`,
                  { userName, user_id, serviceProvider_id, rating, comment },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((result) => {
                  console.log(result.data.product);
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  dispatch(addRate(result.data.product));
                })
                .catch((err) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something wrong try again",
                  });
                });
            }}
          >
            Add
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          axios
            .get(`http://localhost:5001/rate/${user_id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((result) => {
              console.log(result.data.result);
              dispatch(setMyRate(result.data.result));
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        My rates
      </button>
      {/* <h4>{myRate[0].username}</h4> */}
      {myRate ?
        myRate.map((elem, i) => {
          console.log(elem.id);
          return (
            <div key={i}>
              <h5>{elem.rating}</h5>
              <h5>{elem.comment}</h5>
              <button
                className="delete"
                onClick={() => {
                  axios
                    .delete(`http://localhost:5001/rate/${elem.id}`, {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((result) => {
                      dispatch(deleteRateByUserId(result.data.result[0].id));
                      console.log(elem.id);
                      console.log(result.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                x
              </button>
            </div>
          );
        }):  <div>{`you did not rate any thing yet`}</div>}
      <h3>all rates</h3>
      {rates &&
        rates.map((elem, i) => {
         
          return (
            <div key={i}>
              <div> {elem.username}</div>
              <div> {elem.rating}</div>
              <div> {elem.comment}</div>
            </div>
          );
        })}
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

export default Rate;
