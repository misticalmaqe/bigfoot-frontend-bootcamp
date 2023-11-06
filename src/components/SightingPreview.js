import React from "react";
import Card from "react-bootstrap/Card";

// SightingPreview component displays a preview of a sighting
const SightingPreview = (props) => {
  // Extract category names from the data received as props
  const categoryNames = props.data.Categories.map((category) => category.name);

  // Render a Card component with the sighting details
  return (
    <Card bg="dark">
      <Card.Body>
        <Card.Title>
          {`${new Date(props.data.date).toDateString()} | ${
            props.data.location
          }`}
        </Card.Title>
        {categoryNames.length > 0 && (
          <Card.Text>Categories: {categoryNames.join(", ")}</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default SightingPreview;
