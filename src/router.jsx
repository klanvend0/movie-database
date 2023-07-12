import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/not-found";
import MovieListPage from "./pages/movie-list";
import MovieDetailsPage from "./pages/movie-details";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<MovieListPage />} />
      <Route path="/:id" element={<MovieDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
