import React, {useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {Link, useRouteMatch} from "react-router-dom";

import graphQLFetch from "../../utils/graphQLFetch";

const ORDERS = `
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
  const [state, setState] = useState({
    orders: [],
    UI: {
      loading: false,
    }
  });

  useEffect(() => {
    setState({
      ...state,
      UI: {
        ...state.UI,
        loading: true,
      },
    });

    (async () => {
      let resp = await graphQLFetch({
        query: ORDERS,
      });

      const {data: {orders = []} = {}} = resp;

      setState({
        ...state,
        orders: state.orders.concat(orders),
        UI: {
          ...state.UI,
          loading: false,
        },
      });
    })();
  }, []);

  return (
    <Container>
      <Row>
        <Col><Link to="/">Home</Link></Col>
        <Col>Orders List</Col>
        <Col><Link to={`${match.path}/new`}>New Order</Link></Col>
      </Row>
      {state.UI.loading && (
        <div>Loading...</div>
      )}
      {!state.UI.loading && (
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>#</th><th>Code</th><th>Product</th><th>Price</th>
          </tr>
          </thead>
          <tbody>
          {state.orders.filter(order => order).map((order, index) => {
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
