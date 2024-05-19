import React, { Suspense, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "./style.css";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useLoaderData, Await, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
export default function Category() {
  const { results } = useLoaderData();
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token)
 
  return (
    <div className="cat">
      <h1>Our Categories</h1>
      <div>
        <Suspense fallback={<p>Loading data...</p>}>
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
                      >
                        <h2>{elem.title}</h2>
                        <div className="container">
                          {" "}
                          <Image src={elem.img} className="image" />
                          <p className="description">{elem.description}</p>
                        </div>
                      </div>
                    );
                  })}
                  {console.log(results.data.result)}
                </div>
              );
            }}
          </Await>
        </Suspense>
        <br />
        <br />
      </div>
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
}

export const allCategory = async () => {
  const results = axios.get(`http://localhost:5001/category/`);
  return { results };
};
