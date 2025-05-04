import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl = "/features.json";

// 🎨 Color scale for temperatures
const colorScale = scaleLinear()
  .domain([-10, 15, 35])  // cold to warm
  .range(["#0000ff", "#ffffff", "#ff0000"])
  .clamp(true);

const WorldTemperatureMap = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2017");

  useEffect(() => {
    csv(`/world-temperatures.csv`).then((data) => {
      setData(data);
    });
  }, []);

  console.log(data, "DATA")

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", paddingBottom: "30px" }}>
      <h2>World Average Temperature Map ({selectedYear})</h2>

      {/* Year Slider */}
      <input
        type="range"
        min="1950"
        max="2023"
        step="1"
        value={selectedYear}
        onChange={handleYearChange}
        style={{ width: "80%", marginBottom: "20px" }}
      />

      {/* Map */}
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d && d[selectedYear] !== undefined
                      ? colorScale(+d[selectedYear])
                      : "#F5F4F6"}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none" },
                      pressed: { outline: "none" }
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>

      {/* Legend */}
      <div style={{ marginTop: "20px" }}>
        <div style={{
          height: "20px",
          width: "300px",
          background: "linear-gradient(to right, #0000ff, #ffffff, #ff0000)",
          margin: "0 auto",
          borderRadius: "10px"
        }}></div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "300px",
          margin: "5px auto 0 auto",
          fontSize: "14px",
          color: "#555"
        }}>
          <span>Cold (-10°C)</span>
          <span>Hot (35°C)</span>
        </div>
      </div>

    </div>
  );
};

export default WorldTemperatureMap;