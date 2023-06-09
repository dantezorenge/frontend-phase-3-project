import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Movie from "./Movie";
import Review from "./Review";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Movie/>} />
          <Route exact path="/movie" element={<Movie/>} />

          <Route  exact path="/review" element={<Review />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
