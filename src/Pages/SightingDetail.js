import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { formatDate } from "../components/formatdate.js";

const SightingDetail = () => {
  const [singleSighting, setSingleSighting] = useState(null);
  const { sightingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/sightings/${sightingId}`)
      .then((response) => {
        setSingleSighting(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the sighting:", error);
      });
  }, [sightingId]);

  if (!singleSighting) return <p>Loading...</p>;

  return (
    <div>
      <div className="card-header">
        <h3 className="card-title">Bigfoot Sighting Detail</h3>
        <h2>Sighting Details for Report Number {singleSighting.id}</h2>

        {/* Sighting Detail Table */}
        <div className="table-container">
          <div className="table-wrapper">
            <div className="table-inner-wrapper">
              <div className="table-shadow">
                <table className="table-style">
                  <thead className="table-header">
                    <tr>
                      <th className="table-header-cell">#</th>
                      <th className="table-header-cell">Date</th>
                      <th className="table-header-cell">Location</th>
                      <th className="table-header-cell">Notes</th>
                      <th className="table-header-cell">Created At</th>
                      <th className="table-header-cell">Updated At</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-content-row">
                      <td className="table-content-cell">
                        {singleSighting.id}
                      </td>
                      <td className="table-content-cell">
                        {formatDate(singleSighting.date)}
                      </td>
                      <td className="table-content-cell">
                        {singleSighting.location}
                      </td>
                      <td className="table-content-cell">
                        {singleSighting.notes}
                      </td>
                      <td className="table-content-cell">
                        {formatDate(singleSighting.createdAt)}
                      </td>
                      <td className="table-content-cell">
                        {formatDate(singleSighting.updatedAt)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button className="button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};
export default SightingDetail;
