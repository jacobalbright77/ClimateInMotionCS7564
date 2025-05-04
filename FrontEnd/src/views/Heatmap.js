import React from "react";

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

function Typography() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h2">World Temperature Heatmap</Card.Title>
                <p className="card-category">
                  Temperature Dataset provided by World Bank
                </p>
              </Card.Header>
              <Card.Body style={{ height: "1500px" }}>
                <WorldTemperatureMap/>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Typography;
