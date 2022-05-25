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
                        const removeMovie = async () => {
                            const result = await fetch('/api/removeMovie', {
                                method: "post",
                                body: JSON.stringify({name: movieName}),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            });
                            const body = await result.json();
                            if (body.message !== "Unable to delete movie") {
                                const newMovies = movies.filter(movie => movie.name !== movieName);
                                setMovies(newMovies);
                            }
                        }
                        removeMovie();
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
                onNewMovie={(formData) => {
                    const addMovie = async () => {
                        const result = await fetch('/api/addMovie', {
                            method: "post",
                            body: formData
                        });
                        const body = await result.json();
                        if (body.message == "Success") {
                            setMovies(body.movies)
                        }

                    }
                    addMovie();
                }}
            />
        </>
    );
}