import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Handle from "./Components/HandleAuthRoute/handle";
import Level from "./Components/LevelTemplates/index";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/handleAuth">
            <Handle />
          </Route>
          <Route path="/level">
            <Level />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
