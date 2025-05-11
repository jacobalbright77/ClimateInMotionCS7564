This is our final project for the Information Visualization course (CS5764). The goal was to design an interactive dashboard that helps users explore and compare global temperature trends over time and across countries.

This project includes:
1. A world heatmap with clickable countries and color-coded temperatures
2. A dashboard with linked visualizations like stacked area, line, pie, and stripe charts that update based on selected countries
3. Tooltip support and a Celsius/Fahrenheit toggle for flexible viewing

We used React, Recharts, D3, and react-simple-maps. The temperature data came from the World Bank Climate Knowledge Portal, and we cleaned it to ensure consistency with geographic features.

To run the project:

git clone https://github.com/your-username/ClimateInMotionCS7564.git
cd ClimateInMotionCS7564/FrontEnd
npm install --legacy-peer-deps
npm start
