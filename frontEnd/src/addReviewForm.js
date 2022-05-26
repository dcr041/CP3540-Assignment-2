import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddReviewForm({onNewReview = f => f}) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [stars, setStars] = useState("");
    const [poster, setPoster] = useState("");
    const [rating, setRating] = useState("");

    const navigate = useNavigate();

    const formData = new FormData();

    const submit = evt => {
        evt.preventDefault();
        let array = stars.split(',');
        formData.append("name", name);
        formData.append("date", date);
        formData.append("stars", array);
        formData.append("poster", poster);
        formData.append("rating", rating);
        onNewReview(formData);

        setName("");
        setDate("");
        setStars([]);
        setPoster({});
        setRating(0);
        navigate('/');
    }

    return (
        <>
            <form name="addReview" encType="multipart/form-data" onSubmit={submit}>
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
                    <label>Movie Poster:</label>
                    <input    
                        onChange = {evt => setPoster(evt.target.files[0])}
                        type="file"
                        accept=".png,.jfif,.jpg,.jpeg"
                        required
                    />
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
                    <button variant="primary" type="submit">Add Review</button>
                </div>
            </form>
        </>
    );
}