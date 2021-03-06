import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

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
            <Form encType="multipart/form-data" className="pt-3 container border border-dark" onSubmit={submit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Movie Name:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie name"
                            value={name}
                            onChange = {evt => setName(evt.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Release Date:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie release date"
                            value={date}
                            onChange = {evt => setDate(evt.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Stars:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter movie actors"
                            value={stars}
                            onChange = {evt => setStars(evt.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Movie Poster:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            onChange = {evt => setPoster(evt.target.files[0])}
                            type="file"
                            accept=".png,.jfif,.jpg,.jpeg"
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label>
                        Rating:
                    </Form.Label>
                    <Col sm={15}>
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
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 1 }}>
                    <Button type="submit">Add Review</Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
}