import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './style.css'
const StarRating = ({ rating }) => {
    console.log(rating);
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} color="#ebaa28" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt color="#ebaa28" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} color="#ebaa28" />
      ))}
    </div>
  );
};

export default StarRating;