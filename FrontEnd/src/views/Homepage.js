import React, { useState, useEffect, useContext} from "react";

import WorldTemperatureMap from "views/WorldTemperatureMap";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { CardFooter } from "reactstrap";
import {CountryContext} from './CountryContext.js'


function Typography() {
  return (
    <>
      <Container fluid>
      <Row className="justify-content-center text-center">
          <Col md="10">
          <div className="d-flex align-items-center justify-content-center">
            <h1>Climate in Motion</h1>
            <img src={require("assets/img/CIM_Logo.png")} alt="Climate in Motion Logo" height={200}/>
            </div>
            <h3>Group Members: Jacob Albright, Saeid Ghayour, Mohammad Heydari, Patterson Howell, Caitlin Vickery</h3>
            <div style={{ margin: "30px 0" }}></div>
            <p className="lead">
              Welcome to Climate in Motion! Please read below for project background and instructions
            </p>
          </Col>
        </Row>
        <div style={{ margin: "30px 0" }}></div>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h2">Project Navigation</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>The platform is organized into multiple views, with step-by-step guidance available on each page to help users navigate the visualizations. Navigation begins with the sidebar, where users can click on the “Heatmap” tab to access the interactive world map. This map provides an initial overview of global temperature trends and allows users to select countries of interest. Once selected, users can switch to the “Dashboard” tab to explore those countries in more detail through various charts, including a line chart, stacked area chart, and pie chart. Each view is designed to guide users from broad exploration to more focused analysis, supported by tooltips, legends, and toggle options for customizing the experience.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div style={{ margin: "30px 0" }}></div>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h2">Problem and Motivation</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>Climate change is a global issue with impacts that vary across regions and evolve over time. Understanding it through raw data can be difficult and time-consuming, especially when existing tools offer limited interactivity or only allow single-country views. The overall goal of this project is to present global temperature trends in a more intuitive and comparative way. Through an interactive world heatmap connected to multiple visualizations, the system makes climate data easier to explore and helps reveal patterns and changes over time.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div style={{ margin: "30px 0" }}></div>
        <Row className="justify-content-center">
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h2">Design and Tasks</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>The design integrates a world heatmap with connected chart visualizations to enable exploration and comparison of temperature trends across countries and years. Users can select multiple countries, adjust the year using a slider, and view corresponding data through stacked area, line, pie, and stripe charts. Interactive elements like tooltips or the Celsius/Fahrenheit toggle support navigation from a global view to detailed analysis without visual clutter.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div style={{ margin: "30px 0" }}></div>
      </Container>
    </>
  );
}

export default Typography;
