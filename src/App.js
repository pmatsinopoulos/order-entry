import './App.scss';

import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import Home from "./routes/Home";
import Orders from "./routes/Orders";

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
}

export default App;
