import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Portal from "./Components/Portal/Portal";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LandingPage from "./Components/LandingPage/Landing";
import Loading from "./Components/LoadingPage/Loading";
import customTheme from "./theme";
import { Global } from "@emotion/react";
import "./theme.css";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/register";

const Fonts = () => <Global styles={``} />;

function App() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    error,
  } = useAuth0();
  if (isLoading) {
    return (
      <ChakraProvider theme={customTheme}>
        <Loading />
      </ChakraProvider>
    );
  }
  if (error) {
    return <div>Oops... Please write to us. </div>;
  }
  return (
    <ChakraProvider theme={customTheme}>
      <Fonts />
      <Navbar
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
      />
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/portal">
          <Portal />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
