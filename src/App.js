import './App.scss';

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Container>
      <Row>
        <Col>New Order</Col>
        <Col>Orders</Col>
      </Row>
    </Container>
  );
}

export default App;
