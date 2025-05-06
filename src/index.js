import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App'; // Default App
 import AppForSelectedCountries from './AppForSelectedCountries'; // Old 2D Pie Chart App

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AppForSelectedCountries />
   
  </React.StrictMode>
);

reportWebVitals();
