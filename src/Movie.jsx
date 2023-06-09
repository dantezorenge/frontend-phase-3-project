import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
// import Review from "./Review";
// import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Movie() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    duration: "",
    description: "",
    imageUrl: "",
    genre: "",
  });

  useEffect(() => {
    fetch("http://localhost:9292/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevNewMovie) => ({
      ...prevNewMovie,
      [name]: value,
    }));
  };

  const manageAddMovie = () => {
    fetch("http://localhost:9292/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies((prevMovies) => [...prevMovies, data]);
        setNewMovie({
          title: "",
          duration: "",
          description: "",
          imageUrl: "",
          genre: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="container">
      
      <h1 className="logo">
        <span>Moviez</span> 
      </h1>
      <Navbar className="home-nav-bar" />

      <p className="home-page-overview">
        Welcome Filmz, kindly browse through the movies available.
      </p>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img src={movie.imageurl} alt="movie" />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p className="information-p">
                <span>
                  {/* <FontAwesomeIcon icon={faMapMarkerAlt} /> genre:{" "} */}
                </span>
                {movie.genre}
              </p>
              <p className="information-p">
                <span>duration:</span> <em>Hours: {movie.duration}</em>
              </p>
              <p className="information-p">
                <span>Description: </span> {movie.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="add-movie-form">
        <h2>Feel free to add a movie</h2>

        <form>
          <label htmlFor="title">Title:</label>
          <input
            className="input-title-field"
            type="text"
            id="title"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="duration">Duration:</label>
          <input
            className="input-duration-field"
            type="text"
            id="duration"
            name="duration"
            value={newMovie.duration}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            className="input-description-field"
            type="text"
            id="description"
            name="description"
            value={newMovie.description}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="imageUrl">Image URL:</label>
          <input
            className="input-movie-field"
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={newMovie.imageUrl}
            onChange={handleInputChange}
            required
            placeholder="https://movie_imageUrl.example"
          />

          <label htmlFor="genre">Genre:</label>
          <input
            className="input-genre-field"
            type="text"
            id="genre"
            name="genre"
            value={newMovie.genre}
            onChange={handleInputChange}
            required
          />

          <button
            type="button"
            className="add-movie-button"
            onClick={manageAddMovie}
          >
            Add movie
          </button>
        </form>
      </div>

      <p className="explore-Filmz-message">
        Explore the movie site to find thrilling and captivating movies.
      </p>
    </div>
  );
}

export default Movie;
