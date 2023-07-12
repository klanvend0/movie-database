import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function MovieDetailsPage() {
  const params = useParams();
  const id = params.id;
  const movie = useSelector((state) =>
    state.movies.movies.find((movie) => movie.imdbID === id)
  );

  return (
    <div className="">
      {/* 
		Movie name
		Movie poster
		Movie year
		Movie type
		Movie imdb rating
		Movie imdb votes
		Movie imdb id
		Movie plot
		Movie actors
	*/}
    </div>
  );
}

export default MovieDetailsPage;
