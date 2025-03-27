import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { loadMovies } from "../redux/movieSlice";
import MovieCard from "../components/MovieCard";
import styles from "./Home.module.scss";
import { setPage } from "../redux/movieSlice";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, loading, error, currentPage } = useSelector((state: RootState) => state.movie);

  //State for search input and type filter
  const [searchTerm, setSearchTerm] = useState("pokemon");
  const [selectedType, setSelectedType] = useState(""); // 'movie', 'series','episode'
  const [year, setYear] = useState(""); //e.g "2015"

  //Build query string for API

  const buildQuery = () => {
    const queryParts = [`s=${searchTerm.trim()}`];
    if (selectedType) queryParts.push(`type=${selectedType}`);
    if (year.trim()) queryParts.push(`y=${year.trim()}`);
    return queryParts.join("&");
  };

  //Initial Load on mount
  useEffect(() => {
    const fullQuery = buildQuery();
    dispatch(loadMovies({ query: fullQuery, page: currentPage }));
  }, [dispatch, currentPage]);

  //Triggered when user clicks Search -- Manual search
  const handleSearch = () => {
    dispatch(setPage(1));
    const fullQuery = buildQuery();
    dispatch(loadMovies({ query: fullQuery, page: 1 }));
  };

  //Pagination controls

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    const fullQuery = buildQuery();
    dispatch(setPage(currentPage - 1));
    dispatch(loadMovies({ query: fullQuery, page: currentPage - 1 }));
  };

  const handleNextPage = () => {
    const fullQuery = buildQuery();
    dispatch(setPage(currentPage + 1));
    dispatch(loadMovies({ query: fullQuery, page: currentPage + 1 }));
  };

  return (
    <div className={styles.container}>
      <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        🎬 <span className={styles.highlight}>Discover Movies</span>
      </motion.h1>

      {/* Search form */}

      <div className={styles.searchBar}>
        <input type="text" placeholder="Search for a movie..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All Types</option>
          <option value="movie">Movie</option>
          <option value="series">TV Series</option>
          <option value="episode">TV Series Episodes</option>
        </select>

        <input
          type="number"
          placeholder="Year"
          value={year}
          inputMode="numeric"
          pattern="\d{0,4}"
          min="1900"
          max={new Date().getFullYear()}
          onChange={(e) => {
            const val = e.target.value;
            const currentYear = new Date().getFullYear();
            if (/^\d{0,4}$/.test(val) && (+val <= currentYear || val === "")) setYear(val);
          }}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Feedback */}

      {loading && <p className={styles.message}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && movies.length === 0 && <p className={styles.message}>No movies found.</p>}

      {/* Movie list */}
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} id={movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className={styles.pagination}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ◀ Previous
        </button>
        <span>Page {currentPage} </span>
        <button onClick={handleNextPage}>Next ▶</button>
      </div>
    </div>
  );
};

export default Home;
