import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Review() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/reviews")
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error));
  }, []);

  const handleLike = (reviewId) => {
    const reviewToUpdate = reviews.find(review => review.id === reviewId);
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          likes: review.likes + 1,
        };
      }
      return review;
    });

    setReviews(updatedReviews);

    fetch(`http://localhost:9292/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: reviewToUpdate.likes + 1,
      }),
    })
      .then(response => response.json())
      .then(data => {
        const updatedReviews = reviews.map(review => {
          if (review.id === reviewId) {
            return {
              ...review,
              likes: review.likes,
            };
          }
          return review;
        });
        setReviews(updatedReviews);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (reviewId) => {
    const confirmDelete = window.confirm("Are you certain you want to delete this review?");

    if (confirmDelete) {
      fetch(`http://localhost:9292/reviews/${reviewId}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(data => {
          const updatedReviews = reviews.filter(review => review.id !== reviewId);
          setReviews(updatedReviews);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <>
    <Navbar />
     <h1 className="logo"><span></span></h1>
  
      <h1 className="Reviews-heading"></h1>
      <h3 className="review-h3">Welcome to Filmz review page</h3>
      <p className="paragraph-p">Reviews on movies:</p>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div className="review-item" key={review.id}>
            <p className="reviewer">
              <span>Reviewer:</span><em>{review.reviewer}</em>
            </p>
            <p className="review">
              <span>Review:</span> <em>{review.review}</em>
              
            </p>
            <p className="number_of_reviews">
              <span>number_of_reviews:</span> <em>{review.number_of_reviews}</em>
            </p>
            <div className="review-likes">
              <button className="like-btn" onClick={() => handleLike(review.id)}>
                <button />
              </button>
              <span>{review.likes} Likes</span>
            </div>
            <button className="delete-button" onClick={() => handleDelete(review.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Review;
