import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
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
import Rules from "./Components/Rules/Rules";
import background from "./assets/background.jpg";
import BonusQuestions from "./Components/BonusQuestion/BonusQuestions";
import PreviousQuestions from "./Components/PreviousQuestion/PreviousQuestions";

const Fonts = () => (
  <Global
    styles={`
/* cyrillic-ext */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCFPrEHJA.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCMPrEHJA.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* vietnamese */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCHPrEHJA.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCGPrEHJA.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/raleway/v19/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrE.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu5mxKOzY.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7mxKOzY.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4WxKOzY.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7WxKOzY.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`}
  />
);

function App() {
  const [isAscii, setisAscii] = useState(false);
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    error,
    getAccessTokenSilently,
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
      <Box
        maxHeight="100vh"
        height="100vh"
        backgroundImage={`url(${background})`}
        backgroundSize="cover"
        backgroundAttachment="fixed"
        backgroundRepeat="repeat-y"
      >
        <Navbar
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
          logout={logout}
          isAscii={isAscii}
        />
        <Switch>
          <Route path="/bonus">
            <BonusQuestions getAccessTokenSilently={getAccessTokenSilently} />
          </Route>
          <Route path="/register">
            <Register getAccessTokenSilently={getAccessTokenSilently} />
          </Route>
          <Route path="/portal">
            <Portal
              getAccessTokenSilently={getAccessTokenSilently}
              setisAscii={setisAscii}
            />
          </Route>
          <Route path="/previous">
            <PreviousQuestions
              getAccessTokenSilently={getAccessTokenSilently}
            />
          </Route>

          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/">
            <LandingPage loginWithRedirect={loginWithRedirect} />
          </Route>
        </Switch>
      </Box>
    </ChakraProvider>
  );
}

export default App;
