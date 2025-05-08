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
                <Card.Text>This is about navigation</Card.Text>
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
                <Card.Text>This is about problem and motivation</Card.Text>
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
                <Card.Text>This is about Design and Tasks</Card.Text>
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
