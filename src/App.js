import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing/Landing";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
