import React, { useState, useEffect, useContext} from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import {CountryContext} from './CountryContext.js'


function RechartsStackedAreaChart() {
    const [data, setData] = useState([]);
      const [useFahrenheit, setUseFahrenheit] = useState(false);
      const convertCtoF = (celsius) => (celsius * 9) / 5 + 32;
  
    const colors = [
      "#ff0000", "#ffa500", "#008000", "#0000ff", "#800080", "#ee82ee",
      "#f032e6", "#fabed4", "#469990", "#dcbeff", "#9a6324", "#800000",
      "#aaffc3", "#808000", "#ffd8b1", "#000075", "#a9a9a9"
    ];
  
    const {selectedCountries} = useContext(CountryContext)


  useEffect(() => {
    Papa.parse("/world-temperatures-transpose.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const rawRows = result.data;

        const reshaped = rawRows.map((row) => {
          const newRow = { Year: parseInt(row["Name"]) };
          selectedCountries.forEach((country) => {
            const value = parseFloat(row[country]);
            if (!isNaN(value)) {
              newRow[country] = useFahrenheit ? convertCtoF(value) : value;
            }
          });
          return newRow;
        });

        setData(reshaped);
      }
    });
  }, [useFahrenheit]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "0.5rem",
          }}
        >
          <div><b>Year: {label}</b></div>
          {payload.map((entry, index) => (
            <div key={index} style={{ color: entry.stroke }}>
              {`${entry.name}: ${entry.value.toFixed(2)} °${useFahrenheit ? "F" : "C"}`}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

    return (
      <div className="chart-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
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
                {selectedCountries.length === 0 ? (
        <h3><b>Please select countries for comparison on Heatmap tab...</b></h3>
        ) : <p></p>
      }  
        <ResponsiveContainer width="100%" height={500}>  
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {selectedCountries.map((name, index) => (
              <Area
                key={name}
                type="monotone"
                dataKey={name}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

export default RechartsStackedAreaChart;
