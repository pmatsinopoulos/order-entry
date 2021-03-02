import './App.scss';

import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import Home from "./routes/Home";
import Orders from "./routes/Orders";
import {createConsumer} from "@rails/actioncable";
import {ORDERS_BACKEND_WS_URL} from "./constants";
import UI from "./store/reducers/UI";
import {processIncomingMessage} from "./channels/applicationMessagesChannel";

const storeRootReducer = combineReducers({
  UI,
});

const store = createStore(storeRootReducer);

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
      processIncomingMessage({dispatch: store.dispatch, data: data_received});
    },
  },
);


function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
