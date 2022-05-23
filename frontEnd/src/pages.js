import React from "react";
import { Link } from "react-router-dom";
import { MovieList } from "./movies";
import { AddReviewForm } from "./addReviewForm";

export function Home({movies, setMovies}) {
    return (
        <>
            <h1>Movie Reviews</h1>
            <nav>
                <Link to="/addReview">Add Review</Link>
            </nav>
            <MovieList
                movies={movies}
                onRemoveMovie = {
                    movieName => {
                        const newMovies = movies.filter(movie => movie.name !== movieName);
                        setMovies(newMovies);
                    }
                }
            />
        </>
    );
}

export function AddReview({movies, setMovies}) {
    return (
        <>
            <h1>Add Review</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <br></br>
            <AddReviewForm 
                onNewMovie={(name, date, stars, poster, rating) => {
                    const newReviews = [...movies, {name, date, stars, poster, rating}];
                    setMovies(newReviews);
                }}
            />
        </>
    );
}