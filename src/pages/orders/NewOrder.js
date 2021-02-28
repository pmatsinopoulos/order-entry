import React, {useState} from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link, useRouteMatch} from "react-router-dom";
import {EVENTS_SERVER_URL} from "../../constants";
import Alert from "react-bootstrap/Alert";

const NewOrder = () => {
  let match = useRouteMatch('/:back/new');
  const [state, setState] = useState({
    createdOrderCode: '',
    product: '',
    price: '',
    UI: {
      submitting: false,
      displayingCreatedOrder: false,
    }
  });

  const onSubmit = (event) => {
    setState({
      ...state,
      UI: {
        ...state.UI,
        submitting: true,
      }
    });

    (async () => {
      const url = `${EVENTS_SERVER_URL}/events`;
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      const dataObj = {
        event_class: 'Command',
        event_type: 'CreateOrder',
        payload: {
          product: state.product,
          price: parseFloat(state.price),
        },
      };
      const body = JSON.stringify(dataObj);
      const fetchOptions = {method, headers, body};
      const response = await fetch(url, fetchOptions);

      if (!response.ok && response.status >= 500) {
        const errorMessage = `[GraphQL fetch NOK response]: status: ${
          response.status
        }, ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const parsedRes = await response.json();
      if (!parsedRes) {
        throw new Error('Something went wrong returning json data');
      } else {
        if (parsedRes.error) {
          const errorMessage = `[GraphQL fetch NOK response]: status: ${
            response.status
          }, ${parsedRes.error.message}`;
          throw new Error(errorMessage);
        }
        console.log('parsedRes', parsedRes);
        setState({
          ...state,
          createdOrderCode: parsedRes.code,
          UI: {
            ...state.UI,
            submitting: false,
          }
        });
      }
    })();

    event.preventDefault();
  };

  const onPriceChange = (event) => {
    setState({
      ...state,
      price: event.target.value,
    });
  };

  const onProductChange = (event) => {
    setState({
      ...state,
      product: event.target.value,
    });
  };

  const missingValues = () => {
    return (
      !state.product || !state.price
    );
  };

  return (
    <Container>
      <Row>
        <Col>Fill in the Form Below</Col>
        <Col><Link to={`/${match.params.back}`}>Back To Orders</Link></Col>
      </Row>
      {state.createdOrderCode && (
        <Alert variant='success'>{`Order Created: ${state.createdOrderCode}`}</Alert>
      )}
      {!state.createdOrderCode && (
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicProduct">
            <Form.Label>Product</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" autoFocus value={state.code} onChange={onProductChange}/>
          </Form.Group>

          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Enter price" autoFocus value={state.code} onChange={onPriceChange}/>
          </Form.Group>

          <Button type='submit' disabled={missingValues() || state.submitting}>
            Create Order
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default NewOrder;
