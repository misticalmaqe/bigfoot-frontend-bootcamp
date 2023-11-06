import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { BACKEND_URL } from "../constants.js";

const Sighting = () => {
  const [sightingId, setSightingId] = useState();
  const [sighting, setSighting] = useState();
  const [comments, setComments] = useState();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (sightingId) {
      axios.get(`${BACKEND_URL}/sightings/${sightingId}`).then((response) => {
        setSighting(response.data);
      });
      axios
        .get(`${BACKEND_URL}/sightings/${sightingId}/comments`)
        .then((response) => {
          setComments(response.data);
        });
    }
  }, [sightingId]);

  const params = useParams();
  if (sightingId !== params.sightingId) {
    setSightingId(params.sightingId);
  }

  const sightingDetails = [];
  if (sighting) {
    for (const key in sighting) {
      if (key === "Categories") {
        if (sighting[key].length > 0) {
          const categoryNames = sighting[key].map((category) => category.name);
          sightingDetails.push(
            <Card.Text key={key}>{`${key}: ${categoryNames.join(
              ", "
            )}`}</Card.Text>
          );
        }
        continue;
      }
      sightingDetails.push(
        <Card.Text key={key}>{`${key}: ${sighting[key]}`}</Card.Text>
      );
    }
  }

  const handleChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${BACKEND_URL}/sightings/${sightingId}/comments`, {
        content: commentContent,
      })
      .then((res) => {
        setCommentContent("");
        return axios.get(`${BACKEND_URL}/sightings/${sightingId}/comments`);
      })
      .then((response) => {
        setComments(response.data);
      });
  };

  const commentElements = comments
    ? comments.map((comment) => (
        <ListGroup.Item key={comment.id}>
          {comment.createdAt} | {comment.content}
        </ListGroup.Item>
      ))
    : [];

  return (
    <div>
      <Link to="/">Home</Link>
      <Card bg="dark">
        <Card.Body>{sightingDetails}</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            value={commentContent}
            onChange={handleChange}
            placeholder="What a big bear!"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <ListGroup>{commentElements}</ListGroup>
      <br />
    </div>
  );
};

export default Sighting;
