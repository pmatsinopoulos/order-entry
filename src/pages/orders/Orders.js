import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useRouteMatch} from "react-router-dom";

const Orders = () => {
  let match = useRouteMatch();

  return (
    <Container>
      <Row>
        <Col><Link to="/">Home</Link></Col>
        <Col>Orders List</Col>
        <Col><Link to={`${match.path}/new`}>New Order</Link></Col>
      </Row>
    </Container>
  );
};

export default Orders;
