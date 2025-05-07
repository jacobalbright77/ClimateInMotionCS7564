import React, { useState, useEffect, useContext} from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import {CountryContext} from './CountryContext.js'


function RechartsStackedAreaChart() {
    const [data, setData] = useState([]);
  
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
            if (row[country] && !isNaN(parseFloat(row[country]))) {
              newRow[country] = parseFloat(row[country]);
            }
          });
          return newRow;
        });

        setData(reshaped);
      }
    });
  }, []);


    return (
      <div className="chart-container">
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Stacked Area Chart
        </h3>
        <p style={{ textAlign: "center", marginTop: 0, color: "#666" }}>
          Temperature Increase by Country per Year
        </p>
        <ResponsiveContainer width="100%" height={800}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis />
            <Tooltip />
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
