import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Colors for each pie slice
const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

const TemperaturePieChartForSelectedCountries = ({ selectedCountries, selectedYear }) => {
  const [data, setData] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState(false); // toggle for °C / °F

  // Fetch data from JSON
  useEffect(() => {
    if (!selectedCountries || selectedCountries.length === 0 || !selectedYear) return;

    fetch("/full_data.json")
      .then((res) => res.json())
      .then((json) => {
        if (!json || Object.keys(json).length === 0) {
          console.error("Invalid response from API:", json);
          return;
        }

        // Map selected countries to their July temperature values
        const filtered = selectedCountries.map((country) => {
          const temps = json[country];
          const value = temps ? temps[`${selectedYear}-07`] : null;
          return value !== null ? { name: country, value: value } : null;
        }).filter(entry => entry !== null);

        setData(filtered);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [selectedCountries, selectedYear]);

  // Temperature formatting for current unit
  const formatTemperature = (value) => {
    return isFahrenheit
      ? `${(value * 9/5 + 32).toFixed(2)}°F`
      : `${value.toFixed(2)}°C`;
  };

  if (data.length === 0) {
    return <p style={{ color: "white", padding: "2rem" }}>No data available for selected countries and year.</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "1rem"
      }}
    >
      {/* Description aligned top-left */}
      <div style={{
        fontSize: "0.9rem",
        color: "#ccc",
        position: "absolute",
        top: "1.5rem",
        left: "1.5rem",
        maxWidth: "500px",
        lineHeight: "1.5"
      }}>
        
This chart presents the average temperatures for a specific year, based on the countries selected by the user on the heatmap page. These temperatures are visually displayed on the pie chart for comparative analysis. 
The user may use the toggle below to switch between Celsius and Fahrenheit units.
      </div>

      {/* Title centered, below description */}
      <h2 style={{
        textAlign: "center",
        fontSize: "2rem",
        marginTop: "6rem", // leave space for the description
        marginBottom: "1rem"
      }}>
        Temperature Comparison for Selected Countries in {selectedYear}
      </h2>

      {/* Temperature toggle switch */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem"
      }}>
        <span style={{ marginRight: "0.5rem", color: isFahrenheit ? "#ccc" : "#FFA500" }}>°C</span>
        <label style={{
          position: "relative",
          display: "inline-block",
          width: "60px",
          height: "30px",
          backgroundColor: "#666",
          borderRadius: "30px",
          cursor: "pointer"
        }}>
          <input
            type="checkbox"
            checked={isFahrenheit}
            onChange={() => setIsFahrenheit(!isFahrenheit)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: "absolute",
            top: "3px",
            left: isFahrenheit ? "32px" : "3px",
            width: "24px",
            height: "24px",
            backgroundColor: "#FFA500",
            borderRadius: "50%",
            transition: "left 0.3s ease"
          }}></span>
        </label>
        <span style={{ marginLeft: "0.5rem", color: isFahrenheit ? "#FFA500" : "#ccc" }}>°F</span>
      </div>

      {/* Chart & Legend */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5rem" }}>
        {/* Legend - countries list */}
        <div style={{ minWidth: "300px" }}>
          {data.map((entry, index) => (
            <div key={entry.name} style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
              <div style={{
                width: "14px",
                height: "14px",
                backgroundColor: COLORS[index % COLORS.length],
                borderRadius: "50%",
                marginRight: "12px"
              }} />
              <span style={{ fontSize: "1.2rem" }}>{entry.name}</span>
            </div>
          ))}
        </div>

        {/* Pie chart */}
        <PieChart width={600} height={500}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={200}
            label={({ value }) => formatTemperature(value)}
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
            formatter={(value) => formatTemperature(value)}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default TemperaturePieChartForSelectedCountries;

