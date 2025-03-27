import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetail.module.scss";
import { motion } from "framer-motion"; // 🔹 Motion import

const API_KEY = "6e706ff4";

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) fetchMovieDetail();
  }, [imdbID]);

  if (loading) return <p className={styles.message}>Loading movie details...</p>;
  if (!movie || movie.Response === "FALSE") return <p className={styles.message}>Movie not found.</p>;

  return (
    <motion.div className={styles.pageWrapper} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      <motion.div className={styles.container} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }}>
        <div className={styles.poster}>
          <img src={movie.Poster} alt={movie.Title} style={{ maxWidth: "200px" }} />
        </div>

        <div className={styles.details}>
          <motion.h2 className={styles.title} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
            {movie.Title} ({movie.Year})
          </motion.h2>

          <p>
            <strong>Genre: </strong>
            {movie.Genre}
          </p>
          <p>
            <strong>RunTime: </strong>
            {movie.Runtime}
          </p>
          <p>
            <strong>Director: </strong>
            {movie.Director}
          </p>
          <p>
            <strong>Actors: </strong>
            {movie.Actors}
          </p>
          <p>
            <strong>IMDb Rating:</strong> <span className={styles.rating}>{movie.imdbRating}</span>
          </p>
          <p>
            <strong>Plot: </strong>
            {movie.Plot}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieDetail;
