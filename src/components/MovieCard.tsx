import { Link } from "react-router-dom";
import styles from "./MovieCard.module.scss";
import { motion } from "framer-motion";

type MovieCardProps = {
  id: string;
  title: string;
  year: string;
  poster: string;
};

const MovieCard = ({ id, title, year, poster }: MovieCardProps) => {
  return (
    <motion.div className={styles.card} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
      <Link to={`/movie/${id}`}>
        <img src={poster} alt={title} />
        <h3>{title}</h3>
        <p>{year}</p>
      </Link>

      <p className={styles.imdbId}>
        <strong>IMDb ID:</strong> {id}
      </p>
    </motion.div>
  );
};

export default MovieCard;
