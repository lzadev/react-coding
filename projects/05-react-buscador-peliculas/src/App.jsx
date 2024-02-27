import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

import debounce from "just-debounce-it";

import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function useSearch() {
  const [search, updateSeach] = useState("");
  const [error, setError] = useState(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = search === "";
      return;
    }

    if (search === "") {
      setError("Por favor, ingrese un término de búsqueda");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("Por favor, ingrese un término de búsqueda válido");
      return;
    }
    if (search.length < 3) {
      setError(
        "Por favor, ingrese un término de búsqueda con al menos 3 caracteres"
      );
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSeach, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSeach, error } = useSearch();
  const { movies, getMovies, isLoading } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      console.log("debounce");
      getMovies({ search });
    }, 1000),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    // const { query } = Object.fromEntries(new window.FormData(event.target));
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;
    if (newQuery.startsWith(" ")) return;
    updateSeach(newQuery);
    debounceGetMovies(newQuery);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            name="query"
            type="text"
            placeholder="Avengers, Star Wars, The Matrix"
          />
          <input value={sort} onChange={handleSort} type="checkbox" />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        {isLoading ? <p>Cargando....</p> : <Movies movies={movies} />}
      </main>
    </div>
  );
}

export default App;
