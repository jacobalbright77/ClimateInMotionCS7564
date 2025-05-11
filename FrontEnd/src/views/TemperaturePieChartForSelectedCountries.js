import React, { useEffect, useState, useContext } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Papa from "papaparse";
import {CountryContext} from './CountryContext.js'

// Define custom colors for pie chart slices
const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

// Main component to display the temperature pie chart
const TemperaturePieChartForSelectedCountries = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setYear] = useState("2023");
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const {selectedCountries} = useContext(CountryContext)
  

  // Load and parse CSV data when component mounts or selection changes
  useEffect(() => {
    if (!selectedCountries || selectedCountries.length === 0 || !selectedYear) {
      console.log("FAIL 1")
      return;
    }

    fetch("/world-temperatures-transpose.csv")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load CSV file: ${res.statusText}`);
        }
        return res.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data;
            const row = rows.find((r) => r["Name"] === selectedYear);

            if (!row) {
              setData([]);
              return;
            }

            const filteredData = selectedCountries.map((country) => {
              const val = row[country];
              const parsed = parseFloat(val);
              return !isNaN(parsed) ? { name: country, value: parsed } : null;
            }).filter(entry => entry !== null);

            setData(filteredData);
          },
        });
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [selectedCountries, selectedYear]);

  // Format temperature value based on selected unit
  const formatTemperature = (value) => {
    return isFahrenheit
      ? `${(value * 9 / 5 + 32).toFixed(2)}°F`
      : `${value.toFixed(2)}°C`;
  };

  // Show message if no data found
  if (data.length === 0) {
    return <h3><b>Please select countries for comparison on Heatmap tab...</b></h3>
  }

  return (
    <div style={{ backgroundColor: "#fff", color: "#111", minHeight: "10vh", padding: "1rem", position: "relative" }}>
      {/* Toggle Celsius/Fahrenheit */}
<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <span>{isFahrenheit ? "°F" : "°C"}</span>
        <label
          style={{
            position: "relative",
            display: "inline-block",
            width: "34px",
            height: "18px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={isFahrenheit}
            onChange={() => setIsFahrenheit((prev) => !prev)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isFahrenheit ? "#2196F3" : "#ccc",
              borderRadius: "24px",
              transition: ".4s",
            }}
          />
          <span
            style={{
              position: "absolute",
              height: "14px",
              width: "14px",
              left: isFahrenheit ? "18px" : "2px",
              bottom: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              transition: ".4s",
            }}
          />
        </label>
      </div>
      {/* Chart and legend */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8rem" }}>
      {/* Year Selection Slider */}
        {/* Year Slider (Left) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70px", // Adjusted width to accommodate the year display
            position: "relative", // For positioning the year value
            marginRight:"2rem",
          }}
        >
          <span style={{ marginBottom: "0.5rem" }}>2023</span>
          <input
            type="range"
            min="1950"
            max="2023"
            value={selectedYear}
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
              top: "calc(50% - 20px)", // Center the year value vertically
              color: "#000",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {selectedYear}
          </span>
          <span style={{ marginTop: "0.5rem" }}>1950</span>
        </div>
  

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
              backgroundColor: "#fff", border: "1px solid #ccc",
              color: "#000", fontSize: "1rem"
            }}
            formatter={(value) => formatTemperature(value)}
          />
        </PieChart>

                {/* Legend (Right) */}
        <div
          style={{
            marginLeft:"1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
            minWidth: "250px", // Add a minimum width to prevent shifting
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
      </div>
    </div>
  );
};

export default TemperaturePieChartForSelectedCountries;