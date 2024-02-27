const API_KEY = "4a249f8d";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
    );

    const json = await response.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      id: movie.imdbID,
    }));
  } catch (error) {
    throw new Error("Error al buscar las películas");
  }
};
