import React from "react";
import TemperaturePieChart from "./TemperaturePieChart";
import WorldTemperatureMap from "./WorldTemperatureMap/WorldTemperatureMap";

function App() {
  return (
    <div className="App">
      <h1>Climate Visualizations</h1>

      <section>
        <h2>Pie Chart</h2>
        <TemperaturePieChart />
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>World Temperature Map</h2>
        <WorldTemperatureMap />
      </section>
    </div>
  );
}

export default App;
