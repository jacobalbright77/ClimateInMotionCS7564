import React, { useEffect, useState, useContext } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

import {Tooltip} from 'react-tooltip'

import {CountryContext} from './CountryContext.js'

const geoUrl = "/features.json";

// 🎨 Color scale for temperatures
const colorScale = scaleLinear()
  .domain([-10, 15, 35])  // cold to warm
  .range(["#0000ff", "#ffffff", "#ff0000"])
  .clamp(true);

const WorldTemperatureMap = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("1950");
  const {selectedCountries, setCountries } = useContext(CountryContext) //Get context from CountryContext.js

  useEffect(() => {
    csv(`/world-temperatures.csv`).then((data) => {
      setData(data);
    });
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const [tooltipInfo, setTooltipInfo] = React.useState("")

  


  //Updates SelectedCountries list by adding country if not already present and removing if already in the list
  const handleCountrySelect = (geo) => {

    //Check if clicked country is already in the selectedCountries list
    const selectionCheck = selectedCountries.includes(geo.properties.name)
    
    const selectedCountriesUpdate = selectionCheck 
    ? 
    //If selectionCheck is true, country is already in selectedCountries so must be removed with filter
    selectedCountries.filter((countryName) => countryName !== geo.properties.name)
    : 
    //If selectionCheck is false, country is not in selectedCountries so must be added with concat method
    selectedCountries.concat(geo.properties.name)

    setCountries(selectedCountriesUpdate) //Updated selected countries through context to update other files
  }


  return (
    <div style={{ textAlign: "center", paddingBottom: "30px" }}>
      <h2>World Average Temperature Map ({selectedYear})</h2>

      {/* Year Slider */}
      <input
        type="range"
        min="1950"
        max="2023"
        step="1"
        value={selectedYear}
        onChange={handleYearChange}
        style={{ width: "80%", marginBottom: "0px" }}
      />

      {/* Map */}
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find((s) => s.ISO3 === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    data-Tooltip-id="mapTooltip"
                    data-tooltip-content={tooltipInfo}
                    fill={d && d[selectedYear] !== undefined
                      ? colorScale(+d[selectedYear])
                      : "#F5F4F6"}
                    onClick={() => handleCountrySelect(geo)}
                    onMouseOver={
                    d && d[selectedYear] !== undefined ?
                      () => {
                         setTooltipInfo(`${geo.properties.name}: ${d[selectedYear]}°C`) 
                        } : null
                    }
                    onMouseOut={() => {
                      setTooltipInfo("")
                    }}
                    style={{
                      default: { outline: "#000", stroke: "#000", strokeWidth: 0.3},
                      hover: { outline: "#000", stroke: "#000", strokeWidth: 1.2},
                      pressed: { outline: "#fff", stroke: "#000", strokeWidth: 2.0}
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
      <Tooltip id="mapTooltip" />
      
      {/* <p>Selected Countries:</p>
      <ul>
        {SelectedCountries.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul> */}
      {/* Legend */}
      <div style={{ marginTop: "20px" }}>
        <div style={{
          height: "20px",
          width: "500px",
          background: "linear-gradient(to right, #0000ff, #ffffff, #ff0000)",
          margin: "0 auto",
          borderRadius: "10px"
        }}></div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          width: "600px",
          margin: "5px auto 0 auto",
          fontSize: "14px",
          color: "#555"
        }}>
          <span>Cold (-10°C)</span>
          <span>Hot (35°C)</span>
        </div>
      </div>
    </div>
  );
};

export default WorldTemperatureMap;
