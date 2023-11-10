// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Outlet, useParams, Link } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
// import { formatDate } from "../components/formatdate.js";

// const SightingsList = () => {
//   const [sightings, setSightings] = useState([]);
//   const [sortBy, setSortBy] = useState("");
//   const [order, setOrder] = useState("asc");
//   const { sightingId } = useParams();

//   useEffect(() => {
//     // Debugging: Log the values of sortBy and order
//     console.log("sortBy:", sortBy);
//     console.log("order:", order);

//     // Construct the URL with query parameters
//     const url = new URL(`${BASE_URL}/sightings`);
//     if (sortBy) url.searchParams.append("sortBy", sortBy);
//     if (order) url.searchParams.append("order", order);
//     console.log("URL:", url.toString());

//     // Fetch the data from the backend
//     axios
//       .get(url.toString())
//       .then((response) => {
//         setSightings(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching the sightings:", error);
//       });
//   }, [sortBy, order]);

//   if (sightingId) {
//     return <Outlet />;
//   }

//   return (
//     <>
//       <div>
//         <div className="card-header">
//           <h3 className="card-title">Bigfoot Sightings Full List</h3>
//           <Link to="/new" className="new-sighting-button">
//             <button>Add New Sighting</button>
//           </Link>

//           {/* Sorting Controls */}
//           <div className="sorting-controls">
//             <label>Sort By:</label>
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="">Select</option>
//               <option value="date">Date</option>
//               <option value="location">Location</option>
//               {/* Add other sorting criteria as needed */}
//             </select>

//             <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
//               Toggle Order: {order === "asc" ? "Ascending" : "Descending"}
//             </button>
//           </div>

//           {/* Sightings Table */}
//           <div className="table-container">
//             <div className="table-wrapper">
//               <div className="table-inner-wrapper">
//                 <div className="table-shadow">
//                   <table className="table-style">
//                     <thead className="table-header">
//                       <tr>
//                         <th className="table-header-cell">#</th>
//                         <th className="table-header-cell">Date</th>
//                         <th className="table-header-cell">Location</th>
//                         <th className="table-header-cell">Notes</th>
//                         <th className="table-header-cell">Created At</th>
//                         <th className="table-header-cell">Updated At</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {sightings.map((sighting) => (
//                         <tr className="table-content-row" key={sighting.id}>
//                           <td className="table-content-cell">
//                             <Link to={`/sightings/${sighting.id}`}>
//                               {sighting.id}
//                             </Link>
//                           </td>
//                           <td className="table-content-cell">
//                             <Link to={`/sightings/${sighting.id}`}>
//                               {formatDate(sighting.date)}
//                             </Link>
//                           </td>
//                           <td className="table-content-cell">
//                             {sighting.location}
//                           </td>
//                           <td className="table-content-cell">
//                             {sighting.notes}
//                           </td>
//                           <td className="table-content-cell">
//                             {formatDate(sighting.createdAt)}
//                           </td>
//                           <td className="table-content-cell">
//                             {formatDate(sighting.updatedAt)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Outlet /> {/* Outlet to nested route */}
//       </div>
//     </>
//   );
// };
// export default SightingsList;
// src/components/SightingsList.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, useParams, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { formatDate } from "../components/formatdate.js";

const SightingsList = () => {
  const [sightings, setSightings] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [yearFilter, setYearFilter] = useState(""); // New filter state
  const { sightingId } = useParams();

  useEffect(() => {
    // Debugging: Log the values of sortBy, order, and yearFilter
    console.log("sortBy:", sortBy);
    console.log("order:", order);
    console.log("yearFilter:", yearFilter);

    // Construct the URL with query parameters
    const url = new URL(`${BASE_URL}/sightings`);
    if (sortBy) url.searchParams.append("sortBy", sortBy);
    if (order) url.searchParams.append("order", order);
    if (yearFilter) url.searchParams.append("year", yearFilter);

    // Fetch the data from the backend
    axios
      .get(url.toString())
      .then((response) => {
        setSightings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the sightings:", error);
      });
  }, [sortBy, order, yearFilter]);

  if (sightingId) {
    return <Outlet />;
  }

  return (
    <>
      <div>
        <div className="card-header">
          <h3 className="card-title">Bigfoot Sightings Full List</h3>
          <Link to="/new" className="new-sighting-button">
            <button>Add New Sighting</button>
          </Link>

          {/* Sorting Controls */}
          <div className="sorting-controls">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Select</option>
              <option value="date">Date</option>
              <option value="location">Location</option>
              {/* Add other sorting criteria as needed */}
            </select>

            <button onClick={() => setOrder(order === "asc" ? "desc" : "asc")}>
              Toggle Order: {order === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>

          {/* Filter Controls */}
          <div className="filter-controls">
            <label>Filter By Year:</label>
            <input
              type="text"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            />
            {/* Add other filter controls as needed */}
          </div>

          {/* Sightings Table */}
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
                      {sightings.map((sighting) => (
                        <tr className="table-content-row" key={sighting.id}>
                          <td className="table-content-cell">
                            <Link to={`/sightings/${sighting.id}`}>
                              {sighting.id}
                            </Link>
                          </td>
                          <td className="table-content-cell">
                            <Link to={`/sightings/${sighting.id}`}>
                              {formatDate(sighting.date)}
                            </Link>
                          </td>
                          <td className="table-content-cell">
                            {sighting.location}
                          </td>
                          <td className="table-content-cell">
                            {sighting.notes}
                          </td>
                          <td className="table-content-cell">
                            {formatDate(sighting.createdAt)}
                          </td>
                          <td className="table-content-cell">
                            {formatDate(sighting.updatedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet /> {/* Outlet to nested route */}
      </div>
    </>
  );
};

export default SightingsList;
