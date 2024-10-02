import { useState } from "react";
import "./App.css";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Navbar from "./Navbar";
import NumResult from "./NumResult";
import Search from "./Search";
import Main from "./Main";
import Box from "./Box";
import ListMovies from "./ListMovies";
import SelectedMovie from "./SelectedMovie";
import WatchedSummary from "./WatchedSummary";
import WatchedList from "./WatchedList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

const key = "f84fc31d";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <div className="card">
      <Navbar>
        <Search
          query={query}
          setQuery={setQuery}
          handleCloseMovie={handleCloseMovie}
        />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <ListMovies
              movies={movies}
              handleSelectMovie={handleSelectMovie}
              handleCloseMovie={handleCloseMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
              watched={watched}
              key={key}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}
