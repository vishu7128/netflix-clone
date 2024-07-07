import { useEffect, useState } from "react";
import "./Row.css";
import axiosInstance from "../axiosInst";

const BASE_URL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const request = await axiosInstance.get(fetchUrl);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <div key={movie.id} className="row-poster">
            {movie && movie.backdrop_path && (
              <>
                <img
                  className="row-poster-img"
                  src={BASE_URL + movie.backdrop_path}
                  alt={movie.title}
                />
                <div className="poster-overlay">
                  <h3 className="poster-title">
                    {movie.original_title || movie.original_name|| "Movie Name"}
                  </h3>
                  <p className="poster-description">
                    {movie.vote_average.toFixed(1)} &#x1F44D; {/* Thumbs-up Unicode character */}
                  </p>
                  {/* Add more details like duration here */}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
