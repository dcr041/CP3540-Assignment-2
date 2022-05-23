import React from "react";

export function MovieList( { movies = [], onRemoveMovie = f => f}) {
    if(!movies.length) return <div>No Movie Reviews Available</div>;

    return (
        <div>
            {movies.map( movie => {
                return <Movie key={movie.name} {...movie} onRemove={onRemoveMovie} />
        })}
        </div>
    );
}

export function Movie({name, date, stars, poster, rating, onRemove = f => f}) {
    return (
        <>
            <div>
                <br></br>
                <img src={poster} alt={name}></img>
                <h2><b>{name}</b></h2>
                <h3>{date}</h3>
                <h3>Stars: {(stars).join(', ')}</h3>
                <h3>Rating: {rating}</h3>
                <button onClick={() => onRemove(name)}>Remove</button>
            </div>
        </>
    )
}
