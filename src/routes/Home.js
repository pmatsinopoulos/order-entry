import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col><Link to="/orders">Orders</Link></Col>
      </Row>
    </Container>
  )
};

export default Home;
