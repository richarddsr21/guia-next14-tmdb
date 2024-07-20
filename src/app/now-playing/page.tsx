import React from "react";
import CategoryMovieList from "../../components/MovieList";

const NowPlayingPage: React.FC = () => {
  return (
    <div>
      <CategoryMovieList category="now_playing" />
    </div>
  );
};

export default NowPlayingPage;
