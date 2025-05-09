import React from 'react';
import ReactDOM from 'react-dom/client';
import TemperaturePieChartForSelectedCountries from './TemperaturePieChartForSelectedCountries';
import Top10TemperaturePieChart from './Top10TemperaturePieChart'; 


const selectedCountries = ["United States", "China", "Canada","Italy"];
const selectedYear = "2023";


// Limit number of countries
if (selectedCountries.length > 10) {
  alert("You can select up to 10 countries only.");
} else {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* ✅ Wrap both components in a fragment or div */}
      <>
          {/*For run selected countries chart  */}
        <TemperaturePieChartForSelectedCountries
         selectedCountries={selectedCountries} 
         selectedYear={selectedYear} 
         /> 


        {/* For run top 10 warmest country chart */}
        {/* <Top10TemperaturePieChart /> */}
      </>
    </React.StrictMode>
  );
}


