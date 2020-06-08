import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";
import Portal from "./Components/Portal/Portal";
import Login from "./Components/LoginAndRegistration/Login";
import Register from "./Components/LoginAndRegistration/Register";
import LandingPage from "./Components/LandingPage/Landing";
import Auth0 from "./Components/Auth0/auth0";
import customTheme from "./theme";

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
            <Route path="/auth0">
              <Auth0 />
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
