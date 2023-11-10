import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const SightingNew = () => {
  // Define state for form data
  const [formData, setFormData] = useState({
    date: "",
    location: "",
    notes: "",
  });

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/sightings`, formData)
      .then((response) => {
        console.log("Sighting created:", response.data);
        navigate(`/sightings/${response.data.id}`);
      })
      .catch((error) => {
        console.error("Error creating the sighting:", error);
      });
  };

  return (
    <div className="space-y-12, mx-4 my-4">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create New Sighting
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill in the details of the sighting.
          </p>
        </div>

        {/* Sighting Creation Form Q. Why is it the submit button is onSubmit and not onClick? */}
        <form
          onSubmit={handleSubmit}
          className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
        >
          <div className="sm:col-span-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Date
            </label>
            <div className="mt-2">
              <input
                type="datetime-local"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter location"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="notes"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Notes
            </label>
            <div className="mt-2">
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <button
              type="submit"
              className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SightingNew;
