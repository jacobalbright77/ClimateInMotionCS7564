import React, { useState, useEffect, useContext} from "react";

import RechartStackedAreaChart from "views/RechartsStackedAreaChart";
import RechartsPieChartStatic from "views/RechartsPieChartStatic";
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
      <h1>Dynamic Visualizations</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <h3>Visuaizations Dependent on Heatmap Selection</h3>
      </div>
      <Row>
          <Col md="12">
            <Card>
              <Card.Header>
          
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Line Chart</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Increase by Country per Year</p>
              </Card.Header>
              <hr></hr>
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
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Stacked Area Chart</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Increase by Country per Year</p>
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
      <h1>Static Visualizations</h1>
      </div>
      <div className="d-flex align-items-center justify-content-center">
      <h3>Visuaizations Independent on Heatmap Selection</h3>
      </div>

          <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>Global Temperature Anomaly</Card.Title>
                <p style={{ textAlign: "center", marginBottom: "10px" }}>Stripe Chart</p>

                <p className="card-category"><b>1)</b> This chart shows global average temperature anomalies from 1950 to 2023.</p>
                <p className="card-category"><b>2)</b> The anomaly is the difference from the average temperature baseline across all years.</p>
                <p className="card-category"><b>3)</b> Warmer colors indicate years hotter than average, while cooler colors indicate years colder than average.</p>
                <p className="card-category"><b>4)</b> You can toggle between Celsius and Fahrenheit using the switch below.</p>
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
                <Card.Title as="h3" style={{ textAlign: "center", marginBottom: "10px" }}>Pie Chart</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px" }}>Temperature Increase by Country per Year</p>
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
