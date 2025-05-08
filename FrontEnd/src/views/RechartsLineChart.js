import React, { useState, useEffect, useContext} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import {CountryContext} from './CountryContext.js'


function RechartsLineChart() {
  const [data, setData] = useState([]);

  const colors = [
    "#ff0000", "#ffa500", "#008000", "#0000ff", "#800080", "#ee82ee",
    "#f032e6", "#fabed4", "#469990", "#dcbeff", "#9a6324", "#800000",
    "#aaffc3", "#808000", "#ffd8b1", "#000075", "#a9a9a9"
  ];

  const {selectedCountries} = useContext(CountryContext)

  // const selected_countries2 = ["United States of America", "China"];

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

  // console.log(data)


  return (
    <div style={{ width: "100%", height: 900 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* selectedCountries.length >= 0 ?  */}
          {selectedCountries.map((name, index) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RechartsLineChart;
