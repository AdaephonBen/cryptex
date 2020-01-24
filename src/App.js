import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Level from "./Components/LevelTemplates/index";
import Leaderboard from "./Components/Leaderboard/Leaderboard";

let globalRootURL = "http://localhost:3000/";

class Redirect extends React.Component {
  componentDidMount() {
    window.location.replace("https://elan.org.in/cryptex");
  }
  render() {
    return <div></div>;
  }
}

class App extends React.Component {
  render() {
    if (window.location.href.length < 100) {
      if (localStorage.getItem("id_token")) {
        return (
          <Router>
            <Switch>
              <Route path="/leaderboard">
                <Leaderboard />
              </Route>
              <Route path="/">
                <Level />
              </Route>
            </Switch>
          </Router>
        );
      } else {
        return (
          <Router>
            <Switch>
              <Route path="/leaderboard">
                <Leaderboard />
              </Route>
              <Route path="/level">
                <Level />
              </Route>
              <Route path="/portal">
                <Landing />
              </Route>
              <Route path="/">
                <Redirect />
              </Route>
            </Switch>
          </Router>
        );
      }
    } else {
      return <Landing />;
    }
  }
}

export default App;
