import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './containers/Index'

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
      </div>
    </Router>
  );
}

export default AppRouter;