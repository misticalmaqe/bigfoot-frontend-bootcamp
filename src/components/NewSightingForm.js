import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { BACKEND_URL } from "../constants";
import "./NewSightingForm.css"; // Import the custom CSS file

const NewSightingForm = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    selectedCategories: [],
    notes: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/categories`).then((response) => {
      setAllCategories(response.data);
    });
  }, []);

  const categoryOptions = allCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (selectedCategories) => {
    setFormData({ ...formData, selectedCategories });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedCategoryIds = formData.selectedCategories.map(
      ({ value }) => value
    );

    try {
      const res = await axios.post(`${BACKEND_URL}/sightings`, {
        date: formData.date,
        location: formData.location,
        selectedCategoryIds,
        notes: formData.notes,
      });

      setFormData({
        date: "",
        location: "",
        selectedCategories: [],
        notes: "",
      });

      navigate(`/sightings/${res.data.id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form className="custom-form" onSubmit={handleSubmit}>
      <div className="form-content">
        <div className="form-section">
          <Form.Group>
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="custom-input"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="custom-input"
            />
          </Form.Group>
        </div>
        <div className="form-section">
          <Form.Group>
            <Form.Label>Categories</Form.Label>
            <Select
              isMulti
              styles={selectFieldStyles}
              options={categoryOptions}
              value={formData.selectedCategories}
              onChange={handleSelectChange}
              className="custom-select"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="custom-textarea"
            />
          </Form.Group>
        </div>
      </div>

      <Button variant="primary" type="submit" className="custom-button">
        Submit
      </Button>
    </Form>
  );
};

export default NewSightingForm;
