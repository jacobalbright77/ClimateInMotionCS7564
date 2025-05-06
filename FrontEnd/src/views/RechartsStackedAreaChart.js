import React, { useState, useEffect } from "react";
import * as d3 from 'd3'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse'


function RechartsStackedAreaChart() {


  const [data, setData] = useState([]);

  const colors = [" #ff0000", " #ffa500", " #008000", " #0000ff", " #800080", " #ee82ee", " #f032e6", " #fabed4", " #469990", " #dcbeff", " #9a6324", " #800000", " #aaffc3", " #808000", " #ffd8b1", " #000075", " #a9a9a9",]
    
  const selected_countries=["United States of America", "China"]

  
    const country_names = data.columns?.slice(1) ?? []; 
  
useEffect(() => {
    // Fetch data from the CSV file 
    d3.csv("/world-temperatures-transpose.csv", d3.autoType).then((parsedData) => {
      // console.log(parsedData)
      setData(parsedData);
    });
  }, []);
  

  return (
    <ResponsiveContainer width="100%" height={800}>
    <AreaChart
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Year" />
      <YAxis />
      <Tooltip />
      {/* <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
      <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
      {country_names.map((name, index) => (
        <Area type="monotone" dataKey={name} stackId="1" stroke={colors[index % colors.length]} fill={colors[index % colors.length]} />
      ))}
    </AreaChart>
  </ResponsiveContainer>
  );
}

export default RechartsStackedAreaChart;
