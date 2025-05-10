import React, { useState, useEffect, useContext} from "react";

import RechartStackedAreaChart from "views/RechartsStackedAreaChart";
import RechartsPieChartStatic from "views/Top10TemperaturePieChart";
import TemperaturePieChartForSelectedCountries from "views/TemperaturePieChartForSelectedCountries"
import RechartsStripeChart from "views/TemperatureStripeChart";
import RechartsLineChart from "views/RechartsLineChart";


// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import {CountryContext} from './CountryContext.js'

// const {selectedCountries} = useContext(CountryContext)


function Dashboard() {
  return (
    <>
      {/* {selectedCountries.length === 0 && (
        <h1>Please select countries in heatmap tab...</h1>
      )} */}
      <Container fluid>
      <div className="d-flex align-items-center justify-content-center">
      <h1><b>Dynamic Visualizations</b></h1>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <h3>Visuaizations Dependent on Heatmap Selection</h3>
      </div>
      <div style={{ margin: "30px 0" }}></div>
      <Row>
          <Col md="12">
            <Card>
              <Card.Header>
          
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Trends Over Time</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Line Chart of Temperature Increase by Country per Year</p>
                <p className="card-category"><b>1)</b> Go to the Heatmap tab and select one or more countries by clicking on them.</p>
                <p className="card-category"><b>2)</b> This chart will update to show average temperature trends from 1950 to 2023 for each selected country.</p>
                <p className="card-category"><b>3)</b> Use the °C / °F toggle at the top of the chart to switch between Celsius and Fahrenheit temperature units.</p>
                <hr></hr>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              <RechartsLineChart/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
          </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Pie Chart</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Increase by Country per Year</p>
                <p className="card-category"><b>1)</b> This chart presents the average temperatures for the selected countries in the selected year.</p>
                <p className="card-category"><b>2)</b> Use the vertical slider on the left to choose a year between 1950 and 2023.</p>
                <p className="card-category"><b>3)</b> You can toggle between Celsius and Fahrenheit using the switch below.</p>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              <TemperaturePieChartForSelectedCountries/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
          </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Contributions</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Stacked Area Chart of Temperature Increase by Country per Year</p>
                <p className="card-category"><b>1)</b> Go to the Heatmap tab and select one or more countries by clicking on them.</p>
                <p className="card-category"><b>2)</b> This chart will update to display layered areas, each representing the average temperature of a selected country from 1950 to 2023.</p>
                <p className="card-category"><b>3)</b> Use the °C / °F toggle at the top of the chart to switch between Celsius and Fahrenheit temperature units.</p>
                <hr></hr>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              <RechartStackedAreaChart/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
          </Row>

          <div className="d-flex align-items-center justify-content-center">
      <h1><b>Static Visualizations</b></h1>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <h3>Visuaizations Independent on Heatmap Selection</h3>
      </div>
      <div style={{ margin: "30px 0" }}></div>
          <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Global Temperature Anomaly</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Stripe Chart of Global Warming</p>
                <p className="card-category"><b>1)</b> This chart shows global average temperature anomalies from 1950 to 2023.</p>
                <p className="card-category"><b>2)</b> The anomaly is the difference from the average temperature baseline across all years—it is a relative measure and does not have units.</p>
                <p className="card-category"><b>3)</b> Warmer colors indicate years hotter than average, while cooler colors indicate years colder than average.</p>
                <hr></hr>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              <RechartsStripeChart/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
          </Row>
          <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Top 10 Warmest Countries</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Pie Chart of the Top 10 Hottest Countries Each Year</p>
                <p className="card-category"><b>1)</b> Use the vertical slider on the left to choose a year between 1950 and 2023.</p>
                <p className="card-category"><b>2)</b> The pie chart will update to show the top 10 hottest countries based on average temperature for the selected year.</p>
                <p className="card-category"><b>3)</b> Use the °C / °F toggle above the chart to switch between Celsius and Fahrenheit temperature units.</p>
                <hr></hr>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              <RechartsPieChartStatic/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
          </Row>
          <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Pie Chart</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Increase by Country per Year</p>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              {/* <RechartsPieChart/> */}
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Other Chart</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Increase by Country per Year</p>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              {/* <RechartsPieChart/> */}
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                Note at the bottom here...
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;