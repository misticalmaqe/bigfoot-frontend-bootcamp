import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SightingPreview from "./SightingPreview";
import { BACKEND_URL } from "../constants.js";

// SightingPreviewList component displays a list of sighting previews
const SightingPreviewList = () => {
  // State to store the list of sightings
  const [sightings, setSightings] = useState([]);

  // Fetch sightings data from the backend when the component mounts
  useEffect(() => {
    axios.get(`${BACKEND_URL}/sightings`).then((response) => {
      setSightings(response.data);
    });
  }, []);

  // Create an array of sighting previews by mapping over the fetched sightings
  const sightingPreviews = sightings.map((sighting) => (
    <Link to={`/sightings/${sighting.id}`} key={sighting.id}>
      <SightingPreview data={sighting} />
    </Link>
  ));

  // Render the list of sighting previews
  return <div>{sightingPreviews}</div>;
};

export default SightingPreviewList;
