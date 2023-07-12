import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setSearchKey,
  setSearchType,
  setYear,
} from "../../redux/movies-slice";
import { useEffect, useState } from "react";

function FilterSection() {
  const [key, setKey] = useState("Pokemon");
  const page = useSelector((state) => state.movies.page);
  const year = useSelector((state) => state.movies.year);
  const searchType = useSelector((state) => state.movies.searchType);
  const totalResults = useSelector((state) => state.movies.totalResults);
  const dispatch = useDispatch();
  useEffect(() => {
    // after 500ms of user inactivity, update the search key
    const timeout = setTimeout(() => {
      dispatch(setSearchKey(key));
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [key, dispatch]);
  // could add 500 ms delay for year,type,page as well but not gonna
  return (
    <div
      style={{
        width: "clamp(300px, 40%, 500px)",
      }}
      className="h-full bg-[#F7F7F5] p-4 flex flex-col gap-4"
    >
      {/* 
			Textfield üzerinden filtreleme yapılacak.
			Yıl filtresi
			Film,dizi,dizi bölümü filtresi.
	
		*/}
      <label htmlFor="search">Search</label>
      <input
        id="search"
        type="text"
        className="w-full h-10 py px-2"
        value={key ?? ""}
        onChange={(e) => {
          setKey(e.target.value);
        }}
      />
      <label htmlFor="year">Year</label>
      <select
        name="year"
        id="year"
        value={year ?? false}
        className="w-full h-10 py px-2"
        onChange={(e) => {
          e.target.value === "false"
            ? dispatch(setYear(null))
            : dispatch(setYear(e.target.value));
        }}
      >
        <option value={false}>All</option>
        {[...Array(80)].map((_, i) => {
          return (
            <option value={2023 - i} key={i}>
              {2023 - i}
            </option>
          );
        })}
      </select>
      <label htmlFor="type">Type</label>
      <select
        value={searchType ?? false}
        name="type"
        id="type"
        className="w-full h-10 py px-2"
        onChange={(e) => {
          e.target.value === "false"
            ? dispatch(setSearchType(null))
            : dispatch(setSearchType(e.target.value));
        }}
      >
        <option value={false}>All</option>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <h1 className="w-full font-bold">Total Results: {totalResults}</h1>
      <button
        disabled={page === 1}
        onClick={() => {
          dispatch(setPage(1));
        }}
      >
        Reset Page to 1
      </button>
      <div className="w-full flex gap-4 items-center justify-center">
        <button
          disabled={page === 1}
          onClick={() => {
            dispatch(setPage(page - 1));
          }}
        >
          Prev Page
        </button>
        <h1 className="w-1/5 font-bold">{page}</h1>
        <button
          disabled={page === Math.ceil(totalResults / 10)}
          onClick={() => {
            dispatch(setPage(page + 1));
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default FilterSection;
