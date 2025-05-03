import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemperaturePieChart from "./TemperaturePieChart";
import TemperatureStripeChart from "./TemperatureStripeChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemperaturePieChart />} />
        <Route path="/stripe" element={<TemperatureStripeChart />} />
      </Routes>
    </Router>
  );
}

export default App;
