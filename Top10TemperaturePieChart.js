import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Papa from "papaparse";

// Define colors for pie chart slices
const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

// Main component to display Top 10 Warmest Countries Pie Chart
const Top10TemperaturePieChart = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2023");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  // Load and parse CSV data when the year changes
  useEffect(() => {
    console.log("🚀 Loading data for year:", year);

    fetch("/world-temperatures-transpose.csv")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load CSV: ${res.statusText}`);
        }
        return res.text();
      })
      .then((csvText) => {
        console.log("✅ CSV loaded successfully. Sample preview:\n", csvText.split("\n").slice(0, 5).join("\n"));

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const rows = result.data;
            const row = rows.find((r) => r["Name"] === year); // Match by year in "Name" column

            if (!row) {
              console.warn(`⚠️ No data found for year ${year}.`);
              setData([]);
              return;
            }

            console.log("✅ Found data for year:", year);

            // Convert each country-temperature pair to an object and sort them
            const formattedData = Object.entries(row)
              .filter(([key]) => key !== "Name") // Exclude the year column
              .map(([country, temp]) => ({
                name: country,
                value: parseFloat(temp)
              }))
              .filter(entry => !isNaN(entry.value)) // Keep valid numbers only
              .sort((a, b) => b.value - a.value)    // Sort descending by temperature
              .slice(0, 10);                        // Keep top 10 only

            console.log("✅ Top 10 countries data:", formattedData);
            setData(formattedData);
          },
          error: (err) => console.error("❌ CSV parsing error:", err)
        });
      })
      .catch((err) => console.error("❌ Fetch error:", err));
  }, [year]);

  // Format the temperature based on the selected unit
  const formatTemperature = (value) =>
    isFahrenheit
      ? `${(value * 9 / 5 + 32).toFixed(2)}°F`
      : `${value.toFixed(2)}°C`;

  // Display message if no data available
  if (data.length === 0) {
    return <p style={{ color: "white", padding: "2rem" }}>No data found for year {year}.</p>;
  }

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh", padding: "1rem", position: "relative" }}>


      
      {/* Chart Description */}
      <div style={{ fontSize: "0.9rem", color: "#fff", position: "absolute", top: "1rem", left: "1rem", maxWidth: "480px" }}>
        This chart shows average temperatures for the top 10 warmest countries in the selected year.
        You can toggle between Celsius and Fahrenheit or change the year using the vertical slider.
      </div>

      {/* Chart Title */}
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginTop: "6rem", marginBottom: "1rem" }}>
        Top 10 Warmest Countries in {year}
      </h2>

      {/* Celsius/Fahrenheit Toggle */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
        <span style={{ marginRight: "0.5rem", color: !isFahrenheit ? "#FFA500" : "#ccc" }}>°C</span>
        <label style={{
          position: "relative",
          display: "inline-block",
          width: "60px",
          height: "30px",
          backgroundColor: "#90ee90",
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
            backgroundColor: "#ff4444",
            borderRadius: "50%",
            transition: "left 0.3s ease"
          }}></span>
        </label>
        <span style={{ marginLeft: "0.5rem", color: isFahrenheit ? "#FFA500" : "#ccc" }}>°F</span>
      </div>

      {/* Chart Layout: Slider + Legend + Pie Chart */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8rem" }}>

        {/* Year Selection Slider */}
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
              width: "50px",
              background: "#82ca9d",
              borderRadius: "40px",
              outline: "none",
              accentColor: "#ff0000"
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

        {/* Legend */}
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

        {/* Pie Chart */}
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

export default Top10TemperaturePieChart;
