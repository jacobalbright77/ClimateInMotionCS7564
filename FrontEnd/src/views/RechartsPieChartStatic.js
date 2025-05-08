import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

const TemperaturePieChart = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2023");
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32; 

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
          .map(([code, temps]) => {
            const celsius = temps[`${year}-07`];
            const value = useFahrenheit && typeof celsius === "number"
              ? convertToFahrenheit(celsius)
              : celsius;
            return { name: code, value };
          })
          .filter((entry) => entry.value !== undefined)
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);

        setData(filtered);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [year, useFahrenheit]);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#000",
        minHeight: "100vh",
        padding: "1rem",
        fontSize: "1.1rem"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <span>{useFahrenheit ? "°F" : "°C"}</span>
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
            checked={useFahrenheit}
            onChange={() => setUseFahrenheit((prev) => !prev)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: useFahrenheit ? "#2196F3" : "#ccc",
              borderRadius: "24px",
              transition: ".4s",
            }}
          />
          <span
            style={{
              position: "absolute",
              height: "14px",
              width: "14px",
              left: useFahrenheit ? "18px" : "2px",
              bottom: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              transition: ".4s",
            }}
          />
        </label>
      </div>

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
            marginRight:"2rem",
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
              top: "calc(50% - 20px)", // Center the year value vertically
              color: "#000",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            {year}
          </span>
          <span style={{ marginTop: "0.5rem" }}>1950</span>
        </div>

        {/* Pie Chart (Middle) */}
        <PieChart width={700} height={600}>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={250}
            label={({ value }) => `${value.toFixed(2)}°${useFahrenheit ? "F" : "C"}`}
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
            formatter={(value) => `${value.toFixed(2)}°${useFahrenheit ? "F" : "C"}`}
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

export default TemperaturePieChart;