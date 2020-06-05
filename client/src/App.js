import React from "react";
import Portal from "./Components/Portal/Portal";
import Login from "./Components/LoginAndRegistration/Login";
import Register from "./Components/LoginAndRegistration/Register";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";
import LandingPage from "./Components/LandingPage/Landing";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { customTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <DarkMode>
        <CSSReset />
        <Router>
          <Switch>
            <Route path="/portal">
              <Portal />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
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
