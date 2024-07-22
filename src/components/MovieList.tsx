"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import tmdbApi from "../lib/tmdb";
import { Movie } from "../types/movie";

interface CategoryMovieListProps {
  category: string;
}

const CategoryMovieList: React.FC<CategoryMovieListProps> = ({ category }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.get(`/movie/${category}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching ${category} movies:`, error);
      }
    };
    fetchMovies();
  }, [category]);

  return (
    <div>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Movies</h1>
      <div className="flex flex-wrap">
        {movies.map((movie) => (
          <div key={movie.id} className="w-[200px] m-[10px] text-center">
            <Image
              className="w-full rounded-md"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
            />
            <h2>{movie.title}</h2>
            {/* <p>{movie.overview}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMovieList;
