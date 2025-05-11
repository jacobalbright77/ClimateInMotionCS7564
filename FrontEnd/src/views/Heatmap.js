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
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2" style={{ textAlign: "center", marginBottom: "10px" }}>World Temperature Trends Over Time</Card.Title>
                <p className="card-category" style={{ textAlign: "center", marginBottom: "10px", fontSize: "18px" }}>Heatmap of Temperature Increase by Country per Year</p>                
                <p className="card-category" style={{fontSize: "16px" }}><b>1)</b> This world temperature heatmap showcases temperature increase by country per year</p>
                <p className="card-category" style={{fontSize: "16px" }}><b>2)</b> To change the year reflected on the heatmap ranging from 1950 to 2023, use the slider at the top of the visualization</p>
                <p className="card-category" style={{fontSize: "16px" }}><b>3)</b> The legend below the visualization describes how the temperature data encoding maps to the color visual encoding</p>
                <hr></hr>

              </Card.Header>
              <Card.Body style={{ height: "100%" }}>
                <WorldTemperatureMap/>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                South Sudan, French Guiana, and Western Sahara are displayed on the map but do not have available temperature data.
                Temperature dataset provided by World Bank
                </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
