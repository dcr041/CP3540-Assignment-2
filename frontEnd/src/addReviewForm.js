import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddReviewForm({onNewMovie = f => f}) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [stars, setStars] = useState("");
    const [poster, setPoster] = useState("");
    const [rating, setRating] = useState("");

    const navigate = useNavigate();

    const changePoster = (poster) => {
        setPoster(poster);
    };

    const submit = evt => {
        evt.preventDefault();
        onNewMovie(name, date, stars.split(', '), poster, rating);
        setName("");
        setDate("");
        setStars([]);
        setRating(0);
        navigate('/');
    }

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <label>Movie Name: </label>
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        value={name}
                        onChange = {evt => setName(evt.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Release Date: </label>
                    <input
                        type="text"
                        placeholder="Enter movie release date"
                        value={date}
                        onChange = {evt => setDate(evt.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Stars: </label>
                    <input
                        type="text"
                        placeholder="Enter movie actors"
                        value={stars}
                        onChange = {evt => setStars(evt.target.value)}
                        required
                    />
                </div>
                <div>
                    <select
                        value={poster}
                        onChange = {evt => changePoster(evt.target.value)}
                        required
                    >
                        <option value="images/joker.jpg">Poster 1</option>
                        <option value="images/batman_begins.jpg">Poster 2</option>
                        <option value="images/the_dark_knight.jpg">Poster 3</option>
                        <option value="images/the_dark_knight_rises.jpg">Poster 4</option>
                        <option value="images/warrior.jpg">Poster 5</option>
                    </select>
                </div>
                <div>
                    <label>Rating:</label>
                </div>
                <div>
                    <select
                        value={rating}
                        onChange = {evt => setRating(evt.target.value)}
                        required
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <button variant="primary" type="submit" value="submit">Add Review</button>
                </div>
            </form>
        </>
    );
}