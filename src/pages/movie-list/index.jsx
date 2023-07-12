import FilterSection from "../../components/filter-section";
import MovieList from "../../components/movie-list";
function MovieListPage() {
  return (
    <div className="w-full h-full flex">
      <FilterSection />

      <MovieList />
    </div>
  );
}

export default MovieListPage;
