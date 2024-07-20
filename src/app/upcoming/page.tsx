import React from "react";
import CategoryMovieList from "../../components/MovieList";

const UpcomingPage: React.FC = () => {
  return (
    <div>
      <CategoryMovieList category="upcoming" />
    </div>
  );
};

export default UpcomingPage;
