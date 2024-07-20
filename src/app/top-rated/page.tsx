import React from "react";
import CategoryMovieList from "../../components/MovieList";

const TopRatedPage: React.FC = () => {
  return (
    <div>
      <CategoryMovieList category="top_rated" />
    </div>
  );
};

export default TopRatedPage;
