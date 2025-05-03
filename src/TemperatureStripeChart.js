import React, { useEffect, useState } from "react";
import { BarChart, Bar, Tooltip, XAxis } from "recharts";

// Helper function to map anomaly to color
const getColor = (anomaly) => {
  if (anomaly < -2) return "#041f60";
  if (anomaly < -1.5) return "#063b88";
  if (anomaly < -1) return "#08519c";
  if (anomaly < -0.75) return "#2171b5";
  if (anomaly < -0.5) return "#4292c6";
  if (anomaly < -0.25) return "#6baed6";
  if (anomaly < 0) return "#9ecae1";
  if (anomaly < 0.25) return "#fdd49e";
  if (anomaly < 0.5) return "#fdbb84";
  if (anomaly < 0.75) return "#fc8d59";
  if (anomaly < 1) return "#ef6548";
  if (anomaly < 1.25) return "#d7301f";
  if (anomaly < 1.5) return "#b30000";
  return "#7f0000";
};

const TemperatureStripeChart = () => {
  const [data, setData] = useState([]);
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const anomaly = payload[0].value;
      const year = payload[0].payload.year;
      const unit = useFahrenheit ? "°F" : "°C";
      const displayValue = useFahrenheit ? convertToFahrenheit(anomaly) : anomaly;
  
      return (
        <div style={{ backgroundColor: "#fff", color: "#000", padding: "0.5rem", borderRadius: "4px" }}>
          <div>{`Year: ${year}`}</div>
          <div>{`Anomaly: ${displayValue.toFixed(2)}${unit}`}</div>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    fetch("/full_data.json")
      .then((res) => res.json())
      .then((json) => {
        const years = Array.from({ length: 2023 - 1950 + 1 }, (_, i) => 1950 + i);

        const yearToTemps = {};
        years.forEach((year) => {
          const key = `${year}-07`;
          yearToTemps[year] = [];
          for (const country in json) {
            const val = json[country][key];
            if (val !== undefined) yearToTemps[year].push(val);
          }
        });

        // Calculate average for each year
        const yearlyAverages = years.map((year) => {
          const temps = yearToTemps[year];
          const avg = temps.reduce((a, b) => a + b, 0) / temps.length;
          return { year, avg };
        });

        // Calculate baseline across all years
        const allTemps = yearlyAverages.map(d => d.avg);
        const baseline = allTemps.reduce((a, b) => a + b, 0) / allTemps.length;

        const averagedData = yearlyAverages.map(({ year, avg }) => ({
          year,
          anomaly: avg - baseline
        }));

        setData(averagedData);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "90vh",
        padding: "1rem",
        fontSize: "1.1rem"
      }}
    >
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
      Global Temperature Anomaly
      </h2>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <span>{useFahrenheit ? "°F" : "°C"}</span>
          <div style={{ position: "relative", width: "34px", height: "18px" }}>
            <input
              type="checkbox"
              checked={useFahrenheit}
              onChange={() => setUseFahrenheit(!useFahrenheit)}
              style={{
                opacity: 0,
                width: 0,
                height: 0
              }}
            />
            <span
              style={{
                position: "absolute",
                cursor: "pointer",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: useFahrenheit ? "#2196F3" : "#ccc",
                borderRadius: "24px",
                transition: ".4s"
              }}
            />
            <span
              style={{
                position: "absolute",
                content: "\"\"",
                height: "14px",
                width: "14px",
                left: useFahrenheit ? "18px" : "2px",
                bottom: "2px",
                backgroundColor: "white",
                borderRadius: "50%",
                transition: ".4s"
              }}
            />
          </div>
        </label>
      </div>

      <div style={{ justifyContent: "center", alignItems: "center", gap: "6rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70px",
            position: "relative",
          }}
        >
        </div>

        <BarChart
          width={window.innerWidth - (window.innerWidth*.03)}
          height={window.innerHeight - (window.innerHeight*.3)}
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
        <XAxis 
          dataKey="year" 
          interval={2} 
          tick={{ fill: "#fff", fontSize: 12 }} 
          axisLine={{ stroke: '#fff' }}
          tickLine={{ stroke: '#fff' }}
          height={20}
        />
        <Tooltip content={<CustomTooltip />} />

        <Bar
          dataKey="anomaly"
          shape={({ x, y, width, height, payload }) => (
            <rect
              x={x}
              y={0}
              width={width}
              height={window.innerHeight - (window.innerHeight*.4)}
              fill={getColor(payload.anomaly)}
            />
          )}
        />
        </BarChart>
      </div>
    </div>
  );
};

export default TemperatureStripeChart;