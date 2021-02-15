import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useRouteMatch} from "react-router-dom";

const NewOrder = () => {
  let match = useRouteMatch('/:back/new');

  return (
    <Container>
      <Row>
        <Col>Fill in the Form Below</Col>
        <Col><Link to={`/${match.params.back}`}>Back To Orders</Link></Col>
      </Row>
    </Container>
  );
};

export default NewOrder;
