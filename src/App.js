import './App.scss';

import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Home from "./routes/Home";
import Orders from "./routes/Orders";

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
