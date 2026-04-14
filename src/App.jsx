import { Routes, Route } from "react-router-dom";
import MovieApp from "./MovieRecommendationApp";
import MovieDetails from "./MovieDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieApp />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}