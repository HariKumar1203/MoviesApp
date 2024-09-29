function WatchedMovie({movie,handleDeleteWatched}){
    return(
        <li>
                <img src={movie.poster} alt={`${movie.title} poster`} />
                <div>
                    <h3>{movie.title}</h3>
                    <div className="values">
                    <div className="values">
                    <p className="values-list">
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                    </p>
                    <p className="values-list">
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                    </p>
                    <p className="values-list">
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                    </p>
                    </div>                  
                    <button className="btn-delete" onClick={()=>handleDeleteWatched(movie.imdbID)}>
                      X
                    </button>              
                    </div>
                </div>
            </li>
    )
}

export default WatchedMovie