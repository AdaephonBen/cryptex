import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Portal from "./Components/Portal/Portal";
import Login from "./Components/LoginAndRegistration/Login";
import Register from "./Components/LoginAndRegistration/Register";
import Leaderboard from "./Components/Leaderboard/Leaderboard"
import Team from "./Components/Team/Team";
import LandingPage from "./Components/LandingPage/Landing";
import Levels from "./Components/Levels/Levels"
import customTheme from "./theme";
import {Global} from '@emotion/react'
import "./theme.css" ;

const Fonts = () => (
	<Global styles={``} />
);

function App() {
  const { isLoading, error } = useAuth0();
	console.log(error)
  if(isLoading){
    return <div>Loading...Please Wait.</div>
  }
  if(error) {
    return <div>Oops... {error.message}</div>;
  }
  return (
    <ChakraProvider theme={customTheme}>
	  <Fonts />
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
    </ChakraProvider>
  );
}

export default App;
