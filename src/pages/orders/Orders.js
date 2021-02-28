import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {Link, useRouteMatch} from "react-router-dom";
import {useQuery, gql} from "@apollo/client";

const ORDERS = gql`
  query Orders {
    orders {
      id
      code
      product
      price
    }
  }
`;

const Orders = () => {
  let match = useRouteMatch();

  const {loading, error, data} = useQuery(ORDERS, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Container>
      <Row>
        <Col><Link to="/">Home</Link></Col>
        <Col>Orders List</Col>
        <Col><Link to={`${match.path}/new`}>New Order</Link></Col>
      </Row>
      {loading && (
        <div>Loading...</div>
      )}
      {error && (
        <div>Error loading data!</div>
      )}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th><th>Code</th><th>Product</th><th>Price</th>
          </tr>
          </thead>
          <tbody>
          {data.orders.map((order, index) => {
            return (
              <tr key={order.code}>
                <td>{order.id}</td><td>{order.code}</td><td>{order.product}</td><td>{order.price}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Orders;
