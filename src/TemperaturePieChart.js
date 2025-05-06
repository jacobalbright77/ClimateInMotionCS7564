import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#8884d8", "#8dd1e1", "#ffc658", "#a4de6c", "#d0ed57", "#82ca9d", "#ff8042",
  "#ffbb28", "#ff7300", "#00C49F", "#FF69B4", "#A9A9A9", "#DC143C", "#20B2AA"
];

const TemperaturePieChart = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState("2023");
  const [isFahrenheit, setIsFahrenheit] = useState(false); // New state for toggle

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

  const formatTemperature = (value) =>
    isFahrenheit
      ? `${(value * 9 / 5 + 32).toFixed(2)}°F`
      : `${value.toFixed(2)}°C`;

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "100vh",
        padding: "1rem",
        fontSize: "1.1rem",
        position: "relative"
      }}
    >
      {/* Description top-left */}
      <div
        style={{
          fontSize: "0.9rem",
          color: "#ccc",
          position: "absolute",
          top: "1rem",
          left: "1rem",
          maxWidth: "480px",
          lineHeight: "1.5"
        }}
      >
        This chart presents the average temperatures for the top 10 warmest countries in a specific year.
        The slider on the left lets the user select the year, and the toggle above switches between Celsius and Fahrenheit units.
      </div>

      {/* Title + Toggle */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "2rem",
          marginTop: "6rem",
          marginBottom: "1rem"
        }}
      >
        Top 10 Warmest Countries in {year}
      </h2>

      {/* Unit Toggle */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "2rem"
      }}>
        <span style={{ marginRight: "0.5rem", color: !isFahrenheit ? "#FFA500" : "#ccc" }}>°C</span>
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

      {/* Layout */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6rem" }}>
        {/* Year Slider */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70px",
            position: "relative",
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
              background: "#fff",
              borderRadius: "20px",
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "60px",
              top: "calc(50% - 10px)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {year}
          </span>
          <span style={{ marginTop: "0.5rem" }}>1950</span>
        </div>

        {/* Legend */}
        <div
          style={{
            marginRight: "0.1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "0.5rem",
            minWidth: "300px",
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

export default TemperaturePieChart;
