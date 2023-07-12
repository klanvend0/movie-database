import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MovieDetailsPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // fetch movie details
    const fetchMovieDetails = async () => {
      setLoading(true);
      const res = await fetch(
        "http://www.omdbapi.com/?i=" +
          id +
          "&apikey=" +
          import.meta.env["VITE_API_KEY"]
      );
      const data = await res.json();
      console.log(data);
      setMovieDetails(data);
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="max-w-md bg-white p-8 rounded shadow-md flex flex-col gap-4">
          <Link
            to="/"
            className=" w-1/4 px-4 py-2 h-12 bg-[#1C1C1C] hover:bg-black/80 text-white font-bold rounded-md transition duration-300 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            Back
          </Link>
          <div className="flex items-center mb-4">
            <img
              src={movieDetails.Poster}
              alt="Movie Poster"
              className="w-24 h-auto mr-4"
            />
            <h2 className="text-2xl font-bold">{movieDetails.Title}</h2>
          </div>
          <p>
            <strong>Year:</strong> {movieDetails.Year}
          </p>
          <p>
            <strong>Type:</strong> {movieDetails.Type}
          </p>
          <p>
            <strong>IMDb Rating:</strong> {movieDetails.imdbRating}
          </p>
          <p>
            <strong>IMDb Votes:</strong> {movieDetails.imdbVotes}
          </p>
          <p>
            <strong>IMDb ID:</strong> {movieDetails.imdbID}
          </p>
          <p>
            <strong>Plot:</strong> {movieDetails.Plot}
          </p>
          <p>
            <strong>Actors:</strong> {movieDetails.Actors}
          </p>
        </div>
      )}
    </div>
  );
}

export default MovieDetailsPage;
