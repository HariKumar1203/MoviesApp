import WatchedMovie from "./WatchedMovie"

function WatchedList({watched,handleDeleteWatched}){
    return(
        <ul className="list-card">
        {watched.map((movie) => (
            <WatchedMovie movie={movie} key={movie.Title} handleDeleteWatched={handleDeleteWatched}/>
        ))}
      </ul>
    )
}

export default WatchedList