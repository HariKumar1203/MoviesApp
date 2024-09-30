import { useEffect, useState } from "react";
import "./App.css"
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

const key="f84fc31d"

export default function App() {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const[isLoading,setIsLoading]=useState(false)
    const[selectedId,setSelectedId]=useState(null)
    const[error,setError]=useState("")

    function handleSelectMovie(id){
      setSelectedId(selectedId=>(id===selectedId?null:id))
    }
    function handleCloseMovie(){
      setSelectedId(null)
    }
    function handleAddWatched(movie){
      setWatched((watched)=>[...watched,movie])
    }

    function handleDeleteWatched(id){
      setWatched((watched)=>watched.filter((movie)=>movie.imdbID!==id))
    }

    useEffect(function(){
      const controller=new AbortController()
      async function fetchMovies() {
        try{setIsLoading(true)
          setError("")
        const res=await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal})
        if(!res.ok) throw new Error("Something went wrong with fetching movies")

        const data=await res.json()
        if(data.Response==="False")throw new Error("Movie not found")

        setMovies(data.Search)
        setError("")
       }  catch(err){
          if (err.name!=="AbortError"){
            setError(err.message)
          }
        } finally{
          setIsLoading(false)
        }
      }
      if(query.length<3){
        setMovies([])
        setError("")
        return
      }
      handleCloseMovie()
      fetchMovies()

      return function(){
        controller.abort()      }
    },[query])


  return (
    <div className="card">
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
        <NumResult movies={movies}/>
      </Navbar>
      <Main>
        <Box>
            {/* {isLoading?<Loader/>:<ListMovies movies={movies}/>} */}
            {isLoading && <Loader/>}
            {!isLoading && !error && <ListMovies movies={movies} handleSelectMovie={handleSelectMovie} handleCloseMovie={handleCloseMovie}/>}
            {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
            {selectedId?<SelectedMovie selectedId={selectedId} handleCloseMovie={handleCloseMovie} handleAddWatched={handleAddWatched} watched={watched} key={key}/>:(
            <>
            <WatchedSummary watched={watched}/>
            <WatchedList watched={watched} handleDeleteWatched={handleDeleteWatched}/>
            </>)}
        </Box>
      </Main>
    </div>
  );
}