import React, { useState } from 'react';
import './Rating.css'; // Import your CSS file

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`star ${value <= rating ? 'active' : ''}`}
          onClick={() => handleRating(value)}
        >
          &#9733;
        </span>
      ))}
      <div id="ratingValue">You rated {rating} stars!</div>
    </div>
  );
};

export default Rating;
