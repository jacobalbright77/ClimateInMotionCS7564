import TemperaturePieChartForSelectedCountries from './TemperaturePieChartForSelectedCountries.js';

const AppForSelectedCountries = () => {
  const selectedCountries = ["United States of America", "China", "India", "Brazil"];
  const selectedYear = "2017";

    // Enforce a max limit of 6 countries
    if (selectedCountries.length > 10) {
        alert("You can select up to 10 countries only.");
        return null; // Prevent component from rendering
      }

  return (
    <div>
      <TemperaturePieChartForSelectedCountries
        selectedCountries={selectedCountries}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default AppForSelectedCountries;
