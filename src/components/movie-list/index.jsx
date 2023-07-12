import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setMovies,
  setTotalResults,
} from "../../redux/movies-slice";
import { Link } from "react-router-dom";

function MovieList() {
  const movies = useSelector((state) => state.movies.movies);
  const searchKey = useSelector((state) => state.movies.searchKey);
  const searchType = useSelector((state) => state.movies.searchType);
  const year = useSelector((state) => state.movies.year);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const page = useSelector((state) => state.movies.page);
  const totalResults = useSelector((state) => state.movies.totalResults);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setIsLoading(true));
      const res = await fetch(
        "http://www.omdbapi.com/?s=" +
          searchKey +
          (year ? "&y=" + year : "") +
          (searchType ? "&type=" + searchType : "") +
          "&page=" +
          page +
          "&apikey=" +
          import.meta.env["VITE_API_KEY"]
      );
      const data = await res.json();
      console.log(data);
      dispatch(setMovies(data.Search ?? []));
      dispatch(setTotalResults(data.totalResults ?? 0));
      dispatch(setIsLoading(false));
    };
    fetchMovies();
  }, [searchKey, dispatch, year, searchType, page]);
  return (
    <div className="w-full max-w-[1600px] h-full flex justify-center items-center">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          {/* //TODO Add a loading spinner */}
          <h1>Loading...</h1>
        </div>
      ) : (
        movies &&
        ((movies.length > 0 && (
          <div className="flex flex-col w-full h-full pl-9 py-4">
            <h1>Searched for {searchKey}</h1>
            <h1>
              Found {totalResults} <br />
              Type {searchType || "any"} <br />
              Year {year || "any"}
            </h1>
            <div className="w-full p-9 pt-16 h-fit flex flex-wrap gap-24 bg-white overflow-y-auto">
              {movies.map((movie) => {
                return (
                  <Link
                    to={"/" + movie.imdbID}
                    className="flex flex-col items-start w-[200px] h-[360px] border border-black rounded-md p-4 gap-2 border-solid"
                    key={movie.imdbID}
                  >
                    <img
                      // if poster url is broken then use this url
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x280?text=No+Image";
                      }}
                      src={
                        movie.Poster === "N/A"
                          ? "https://via.placeholder.com/200x280?text=No+Image"
                          : movie.Poster
                      }
                      className="w-full h-[240px] object-cover"
                      alt={movie.Title}
                    />
                    <h1>{movie.Title}</h1>
                    <h2>{movie.Year}</h2>
                  </Link>
                );
              })}
            </div>
          </div>
        )) || (
          <div className="w-full h-full flex justify-center items-center">
            <h1>No {searchType ?? "data"} found</h1>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieList;
