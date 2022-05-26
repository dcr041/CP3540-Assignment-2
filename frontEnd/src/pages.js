import React from "react";
import { MovieList } from "./movies";
import { AddReviewForm } from "./addReviewForm";

export function Home({movies, setMovies}) {
    return (
        <>
            <h1>Movie Reviews</h1>
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
            <br></br>
        </>
    );
}

export function AddReview({movies, setMovies}) {
    return (
        <>
            <h1>Add Review</h1>
            <br></br>
            <AddReviewForm
                onNewReview={(formData) => {
                    const addMovie = async () => {
                        const result = await fetch('/api/addReview', {
                            method: "post",
                            body: formData
                        });
                        const body = await result.json();
                        if (body.message === "Success") {
                            setMovies(body.movies)
                        }
                    }
                    addMovie();
                }}
            />
        </>
    );
}