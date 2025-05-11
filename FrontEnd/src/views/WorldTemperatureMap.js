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

const emptyDataCountryName = ["South Sudan", "Western Sahara", "French Guiana"]

// 🎨 Color scale for temperatures
const colorScale = scaleLinear()
  .domain([-10, 15, 35])  // cold to warm
  .range(["#0000ff", "#ffffff", "#ff0000"])
  .clamp(true);

const WorldTemperatureMap = () => {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("1950");
  const {selectedCountries, setCountries } = useContext(CountryContext) //Get context from CountryContext.js
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  useEffect(() => {
    csv(`/world-temperatures.csv`).then((data) => {
      setData(data);
    });
  }, []);

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const clearCountries = () => {
    setCountries([])
  }

  const [tooltipInfo, setTooltipInfo] = React.useState("")

  //Updates SelectedCountries list by adding country if not already present and removing if already in the list
  const handleCountrySelect = (geo) => {

    if (!emptyDataCountryName.includes(geo.properties.name)) {

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
  }


  return (
    <div style={{ textAlign: "center", paddingBottom: "30px" }}>
      <h2>Selected Year: {selectedYear}</h2>

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

      <h3 style={{ textAlign: "left"}}>Selected Countries: {selectedCountries.length != 0 ? selectedCountries.join(", ") : "None"}</h3>

      <div style={{ textAlign: "left", marginTop: "40px" }}>
          <button
            key={"Clear Countries"}
            onClick={() => clearCountries()}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: "#f0f0f0",
              color: "#000",
              border: "2px solid #aaa",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Countries
          </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <span>{isFahrenheit ? "°F" : "°C"}</span>
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
            checked={isFahrenheit}
            onChange={() => setIsFahrenheit((prev) => !prev)}
            style={{ opacity: 0, width: 0, height: 0 }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: isFahrenheit ? "#2196F3" : "#ccc",
              borderRadius: "24px",
              transition: ".4s",
            }}
          />
          <span
            style={{
              position: "absolute",
              height: "14px",
              width: "14px",
              left: isFahrenheit ? "18px" : "2px",
              bottom: "2px",
              backgroundColor: "white",
              borderRadius: "50%",
              transition: ".4s",
            }}
          />
        </label>
      </div>

          </div>
      {/* Map */}
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147
        }}
        viewBox="1 75 800 430"
        style={{ width: "100%", height: "auto" }}
      >
        <Graticule stroke="#E4E5E6" strokeWidth={0.6} />
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
                        const value = +d[selectedYear];
                         const display = isFahrenheit ? (value * 9/5 + 32).toFixed(2) + "°F" : value.toFixed(2) + "°C";
                         setTooltipInfo(`${geo.properties.name}: ${display}`)
                        } : null
                    }
                    onMouseOut={() => {
                      setTooltipInfo("")
                    }}
                    style={{
                      default: { outline: "#000", stroke: "#000", strokeWidth: 0.3},
                      hover: !emptyDataCountryName.includes(geo.properties.name) ? { outline: "#000", stroke: "#000", strokeWidth: 1.2} : { outline: "#000", stroke: "#000", strokeWidth: 0.3},
                      pressed: !emptyDataCountryName.includes(geo.properties.name) ? { outline: "#fff", stroke: "#000", strokeWidth: 2.0} : { outline: "#000", stroke: "#000", strokeWidth: 0.3}
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
<Tooltip id="mapTooltip" place="top" float={true}/>
      
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
          <span>Cold ({isFahrenheit ? "14°F" : "-10°C"})</span>
          <span>Hot ({isFahrenheit ? "95°F" : "35°C"})</span>
        </div>
      </div>
    </div>
  );
};

export default WorldTemperatureMap;
