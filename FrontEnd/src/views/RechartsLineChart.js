import React, { useState, useEffect } from "react";
import * as d3 from 'd3'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse'


function RechartsLineChart() {


  const [data, setData] = useState([]);

  const colors = [" #ff0000", " #ffa500", " #008000", " #0000ff", " #800080", " #ee82ee", " #f032e6", " #fabed4", " #469990", " #dcbeff", " #9a6324", " #800000", " #aaffc3", " #808000", " #ffd8b1", " #000075", " #a9a9a9",]
    
  const selected_countries=["United States of America", "China"]

  const country_names = data.columns?.slice(1) ?? []; 
  
useEffect(() => {
    // Fetch data from the CSV file 
    d3.csv("/world-temperatures-transpose.csv", d3.autoType).then((parsedData) => {
      console.log(parsedData)
      setData(parsedData);
    });
  }, []);
  

  return (
    <div style={{ width: '100%', height: 900 }}>
    <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Year" padding={{ left: 30, right: 30 }}/>
      <YAxis />
      <Tooltip />
      <Legend />
      {country_names.map((name, index) => (
        <Line type="monotone" dataKey={name} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} />
      ))}
    </LineChart>
  </ResponsiveContainer>
  </div>
  );
}

export default RechartsLineChart;
