import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
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
  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current - 1);
  };
  return (
    <div className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {images.map((elem, i) => {
        return(
        <div className={i === current ? "slide active" : "slide"} key={i}>
          {i === current && (<img src={elem} alt=".." className="imageSlider" />)}
        </div>)
      })}
    </div>
  );
};

export default Home;
