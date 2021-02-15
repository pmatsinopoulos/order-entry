import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import NewOrder from "../pages/orders/NewOrder";
import OrdersPage from "../pages/orders/Orders";

const Orders = () => {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/new`}><NewOrder /></Route>
      <Route path={match.path}><OrdersPage /></Route>
    </Switch>
  )
};

export default Orders;

