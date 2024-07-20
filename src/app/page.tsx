import React from "react";
import CategoryMovieList from "../components/MovieList";

const HomePage: React.FC = () => {
  return (
    <div>
      <CategoryMovieList category="popular" />
    </div>
  );
};

export default HomePage;
