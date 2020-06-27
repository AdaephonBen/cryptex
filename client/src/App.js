import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";
import Portal from "./Components/Portal/Portal";
import Login from "./Components/LoginAndRegistration/Login";
import Register from "./Components/LoginAndRegistration/Register";
import Leaderboard from "./Components/Leaderboard/Leaderboard"
import Team from "./Components/Team/Team";
import LandingPage from "./Components/LandingPage/Landing";
import Levels from "./Components/Levels/Levels"
import customTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <DarkMode>
        <CSSReset />
        <Router>
          <Switch>
          <Route path="/levels">
           jk
      </Route>
            <Route path="/portal">
              <Portal />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/team">
              <Team />
            </Route>
            <Route path="/leaderboard">
             <Leaderboard />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>           
          </Switch>
        </Router>
      </DarkMode>
    </ThemeProvider>
  );
}

export default App;
