import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Papa from "papaparse"; // Used to parse CSV files

// Define color palette for pie slices
const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

const TemperaturePieChart = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2023");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // Fetch CSV and extract top 10 countries by temperature
  useEffect(() => {
    fetch("/world-temperatures.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const rows = result.data;
            const columnKey = `${year}-07`;

            const formatted = rows
              .map((row) => {
                const temp = parseFloat(row[columnKey]);
                return {
                  name: row.name,
                  value: isNaN(temp) ? null : temp
                };
              })
              .filter((entry) => entry.value !== null)
              .sort((a, b) => b.value - a.value)
              .slice(0, 10);

            setData(formatted);
          },
          error: (err) => console.error("CSV parse error:", err),
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [year]);

  // Convert Celsius to Fahrenheit if needed
  const formatTemperature = (value) =>
    isFahrenheit
      ? `${(value * 9 / 5 + 32).toFixed(2)}°F`
      : `${value.toFixed(2)}°C`;

  if (data.length === 0) {
    return <p style={{ color: "white", padding: "2rem" }}>No data found for year {year}.</p>;
  }

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", padding: "1rem", position: "relative" }}>
      {/* Description at top-left */}
      <div style={{ fontSize: "0.9rem", color: "#ccc", position: "absolute", top: "1rem", left: "1rem", maxWidth: "480px" }}>
        This chart shows average July temperatures for the top 10 warmest countries in a selected year from CSV.
        Toggle between Celsius and Fahrenheit, and use the vertical slider to change the year.
      </div>

      {/* Chart Title */}
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginTop: "6rem", marginBottom: "1rem" }}>
        Top 10 Warmest Countries in {year}
      </h2>

      {/* Celsius/Fahrenheit toggle */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
        <span style={{ marginRight: "0.5rem", color: !isFahrenheit ? "#FFA500" : "#ccc" }}>°C</span>
        <label style={{
          position: "relative",
          display: "inline-block",
          width: "60px",
          height: "30px",
          backgroundColor: "#90ee90", // green switch track
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
            backgroundColor: "#ff4444", // red thumb
            borderRadius: "50%",
            transition: "left 0.3s ease"
          }}></span>
        </label>
        <span style={{ marginLeft: "0.5rem", color: isFahrenheit ? "#FFA500" : "#ccc" }}>°F</span>
      </div>

      {/* Main chart layout: slider + legend + pie chart */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8rem" }}>
        {/* Vertical year slider with updated style */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70px", position: "relative" }}>
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
              width: "50px", // thicker track
              background: "#82ca9d", // green track color
              borderRadius: "40px",
              outline: "none",
              accentColor: "#ff0000" // red thumb (for some browsers)
            }}
          />
          <span style={{
            position: "absolute",
            left: "60px",
            top: "calc(50% - 10px)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold"
          }}>
            {year}
          </span>
          <span style={{ marginTop: "0.5rem" }}>1950</span>
        </div>

        {/* Country legend */}
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

        {/* Pie chart for temperature data */}
        <PieChart width={700} height={600}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={250}
            label={({ value }) => formatTemperature(value)}
            labelLine={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", color: "#000", fontSize: "1rem" }}
            formatter={(value) => formatTemperature(value)}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default TemperaturePieChart;
