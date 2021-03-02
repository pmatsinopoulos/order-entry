import './App.scss';

import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./routes/Home";
import Orders from "./routes/Orders";
import {createConsumer} from "@rails/actioncable";
import {ORDERS_BACKEND_WS_URL} from "./constants";

const consumer = createConsumer(`${ORDERS_BACKEND_WS_URL}/cable`);
consumer.subscriptions.create({
    channel: 'ApplicationMessagesChannel',
  },
  {
    connected: () => {
      console.debug('ApplicationMessagesChannel connected');
    },
    disconnected: () => {
      console.debug('ApplicationMessagesChannel disconnected');
    },
    received: (data_received) => {
      console.debug('ApplicationMessagesChannel: data', data_received);
    },
  },
);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/orders">
          <Orders />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
