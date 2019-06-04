import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Balance from './containers/Balance'
import Index from './containers/Index'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/balances" component={Balance} />
      </div>
    </Router>
  );
}

export default AppRouter;