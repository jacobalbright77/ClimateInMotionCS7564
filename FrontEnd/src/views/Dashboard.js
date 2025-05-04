import React from "react";

import RechartStackedAreaChart from "views/RechartsStackedAreaChart";
import RechartsPieChart from "views/RechartsPieChart";
import RechartsStripeChart from "views/RechartsStripeChart";

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

function Dashboard() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Pie Chart</Card.Title>
                <p className="card-category">Temperature Increase by Country per Year</p>
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
                <p className="card-category">Temperature Increase by Country per Year</p>
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
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Pie Chart</Card.Title>
                <p className="card-category">Temperature Increase by Country per Year</p>
              </Card.Header>
              <Card.Body>
              <div style={{ margin: "20px 0" }}></div>
              <RechartsPieChart/>
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
                <Card.Title as="h3">Stacked Area Chart</Card.Title>
                <p className="card-category">Temperature Increase by Country per Year</p>
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
          <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h3">Stripe Chart</Card.Title>
                <p className="card-category">Temperature Increase by Country per Year</p>
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
                <Card.Title as="h3">Line Chart</Card.Title>
                <p className="card-category">Temperature Increase by Country per Year</p>
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
