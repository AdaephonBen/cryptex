import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
// import Create from "./Components/Create/Create";
import Login from "./Components/Login/Login";
import "./App.css";

function App() {
  return (
    <div className="container bp3-dark">
      <Router>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
