import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import "./TemperaturePieChart.css";

const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

const TemperaturePieChart = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2023");

  // Fetch and process data
  useEffect(() => {
    fetch("/full_data.json")
      .then((res) => res.json())
      .then((json) => {
        if (!json || Object.keys(json).length === 0) {
          console.error("Invalid response from API:", json);
          return;
        }

        const filtered = Object.entries(json)
          .map(([code, temps]) => ({
            name: code,
            value: temps[`${year}-07`],
          }))
          .filter((entry) => entry.value !== undefined)
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);

        setData(filtered);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [year]);

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "1rem",
        fontSize: "1.1rem"
      }}
    >
      {/* Title */}
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Top 10 Warmest Countries in {year}
      </h2>

      {/* Layout */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6rem" }}>
        {/* Year Slider (Left) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70px", // Adjusted width to accommodate the year display
            position: "relative", // For positioning the year value
          }}
        >
          <span style={{ marginBottom: "0.5rem" }}>2023</span>
          <input
            type="range"
            min="1950"
            max="2023"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            style={{
              writingMode: "bt-lr",
              WebkitAppearance: "slider-vertical",
              height: "300px",
              width: "10px",
              background: "#fff", // Changed color to green
              borderRadius: "20px",
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "60px", // Position the year value next to the slider
              top: "calc(50% - 10px)", // Center the year value vertically
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {year}
          </span>
          <span style={{ marginTop: "0.5rem" }}>1950</span>
        </div>

        {/* Legend (Middle) */}
        <div
          style={{
            marginRight: "0.1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
            minWidth: "300px", // Add a minimum width to prevent shifting
          }}
        >
          {data.map((entry, index) => (
            <div
              key={entry.name}
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.1rem"
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: COLORS[index % COLORS.length],
                  borderRadius: "50%",
                  marginRight: "12px"
                }}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>

        {/* Pie Chart (Right) */}
        <PieChart width={700} height={600}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={250}
            label={({ value }) => `${value.toFixed(2)}°C`}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              color: "#000",
              fontSize: "1rem"
            }}
            formatter={(value) => `${value.toFixed(2)}°C`}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default TemperaturePieChart;