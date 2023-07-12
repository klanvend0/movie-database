import { useDispatch, useSelector } from "react-redux";
import {
  setPage,
  setSearchKey,
  setSearchType,
  setYear,
} from "../../redux/movies-slice";

function FilterSection() {
  const searchKey = useSelector((state) => state.movies.searchKey);
  const page = useSelector((state) => state.movies.page);
  const year = useSelector((state) => state.movies.year);
  const searchType = useSelector((state) => state.movies.searchType);
  const totalResults = useSelector((state) => state.movies.totalResults);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        width: "clamp(300px, 30%, 500px)",
      }}
      className="h-full bg-gray-200 p-4 flex flex-col gap-4"
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
        value={searchKey ?? ""}
        onChange={(e) => dispatch(setSearchKey(e.target.value))}
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
        {[...Array(100)].map((_, i) => {
          return (
            <option value={2021 - i} key={i}>
              {2021 - i}
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
        className="w-full h-12 bg-gray-500 text-white font-bold rounded-md transition duration-300 hover:bg-gray-600 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          dispatch(setPage(1));
        }}
      >
        Reset
      </button>
      <div className="w-full flex gap-4 items-center justify-center">
        <button
          disabled={page === 1}
          className="w-full h-16 bg-gray-500 text-white font-bold rounded-md transition duration-300 hover:bg-gray-600 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => {
            dispatch(setPage(page - 1));
          }}
        >
          Prev Page
        </button>
        <h1 className="w-1/5 font-bold">{page}</h1>
        <button
          disabled={page === Math.ceil(totalResults / 10)}
          className="w-full h-16 bg-gray-500 text-white font-bold rounded-md transition duration-300 hover:bg-gray-600 hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
