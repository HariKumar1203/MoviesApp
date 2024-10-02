import Movie from "./Movie";

function ListMovies({ movies, handleSelectMovie }) {
  return (
    <ul className="list-card list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.Title}
          handleSelectMovie={handleSelectMovie}
        />
      ))}
    </ul>
  );
}

export default ListMovies;
