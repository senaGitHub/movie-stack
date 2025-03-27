const API_KEY = "6e706ff4";
const BASE_URL = "https://www.omdbapi.com";

export const fetchMovies = async (query: string, page: number = 1) => {
  const url = `${BASE_URL}?apikey=${API_KEY}&${query}&page=${page}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
