import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import SightingDetail from "./Pages/SightingDetail";
import SightingNew from "./Pages/SightingNew";
import LandingPage from "./Pages/LandingPage";
import SightingList from "./Pages/SightingList";

import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar className="header" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="sightings" element={<SightingList />}>
          {" "}
          <Route path="sightingDetail" element={<SightingDetail />} />
        </Route>
        <Route path="new" element={<SightingNew />} />
      </Routes>
    </div>
  );
}

export default App;
