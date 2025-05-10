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
    return <p style={{ color: "white", padding: "2rem" }}>No data available for selected countries and year.</p>;
  }

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "10vh", padding: "1rem", position: "relative" }}>
    

      {/* Chart Title */}
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Temperature Comparison for Selected Countries in {selectedYear}
      </h2>

      {/* Toggle Celsius/Fahrenheit */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
        <span style={{ marginRight: "0.5rem", color: isFahrenheit ? "#ccc" : "#FFA500" }}>°C</span>
        <label style={{
          position: "relative", width: "60px", height: "30px", backgroundColor: "#90ee90",
          borderRadius: "30px", cursor: "pointer"
        }}>
          <input
            type="checkbox"
            checked={isFahrenheit}
            onChange={() => setIsFahrenheit(!isFahrenheit)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span style={{
            position: "absolute", top: "3px", left: isFahrenheit ? "32px" : "3px",
            width: "24px", height: "24px", backgroundColor: "#ff4444", borderRadius: "50%",
            transition: "left 0.3s ease"
          }} />
        </label>
        <span style={{ marginLeft: "0.5rem", color: isFahrenheit ? "#FFA500" : "#ccc" }}>°F</span>
      </div>
      {/* Chart and legend */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8rem" }}>
      {/* Year Selection Slider */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "70px", position: "relative" }}>
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
            {selectedYear}
          </span>
          <span style={{ marginTop: "0.5rem" }}>1950</span>
        </div>
      

        <div style={{ minWidth: "300px" }}>
          {data.map((entry, index) => (
            <div key={entry.name} style={{ display: "flex", alignItems: "center", marginBottom: "0.7rem" }}>
              <div style={{
                width: "14px", height: "14px", backgroundColor: COLORS[index % COLORS.length],
                borderRadius: "50%", marginRight: "12px"
              }} />
              <span style={{ fontSize: "1.2rem" }}>{entry.name}</span>
            </div>
          ))}
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
      </div>
    </div>
  );
};

export default TemperaturePieChartForSelectedCountries;