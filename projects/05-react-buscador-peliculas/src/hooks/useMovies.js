import { useMemo, useRef, useState } from "react";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const previosSearch = useRef();

  const getMovies = useMemo(() => {
    console.log("new func");
    return async ({ search }) => {
      if (search === previosSearch.current) return;

      try {
        setIsLoading(true);
        setError(null);
        previosSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
  }, []);

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, error, isLoading };
}
