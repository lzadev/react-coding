const ListOfMovies = ({ movies }) => {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.Title} />
        </li>
      ))}
    </ul>
  );
};

const NoMoviesResults = () => {
  return <p>No se encontraron resultados</p>;
};

export const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
};
