import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
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
  const error = useSelector((state) => state.movies.error);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setIsLoading(true));
      const res = await fetch(
        "http://www.omdbapi.com/?s=" +
          (searchKey ?? " ") +
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
      dispatch(setError(data.Error ?? null));
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
              Found {totalResults || 0} <br />
              Type {searchType || "any"} <br />
              Year {year || "any"}
            </h1>
            <div className="w-full pt-8 h-fit flex flex-wrap gap-24 bg-white overflow-y-auto">
              {movies.map((movie) => {
                return (
                  <Link
                    to={"/" + movie.imdbID}
                    className="flex flex-col items-start w-[200px] h-[360px] border border-black rounded-md p-4 gap-2 border-solid"
                    key={movie.imdbID}
                  >
                    <img
                      // if poster url is broken replace with placeholder
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/200x280?text=No+Image";
                      }}
                      src={
                        movie.Poster === "N/A"
                          ? "https://via.placeholder.com/200x280?text=No+Image"
                          : movie.Poster
                      }
                      className="w-full object-cover"
                      alt={movie.Title}
                    />
                    <h1
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100%",
                      }}
                    >
                      {movie.Title}
                    </h1>
                    <h2 className="">{movie.Year}</h2>
                  </Link>
                );
              })}
            </div>
          </div>
        )) || (
          <div className="w-full h-full flex justify-center items-center">
            <h1>
              {error
                ? `An error happened: ${error}`
                : `No ${searchType ?? "data"} found `}
            </h1>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieList;
