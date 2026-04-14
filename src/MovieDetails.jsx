import { useParams, useNavigate } from "react-router-dom";
import { MOVIES } from "./MovieRecommendationApp";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = MOVIES.find(m => m.id === Number(id));

  if (!movie) return <h2>Movie not found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <img src={movie.poster} width="300" />
    </div>
  );
}