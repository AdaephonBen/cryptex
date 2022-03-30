import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css';

ReactDOM.render(
  <Auth0Provider
    domain="dev-bikoq9os.us.auth0.com"
    clientId="FtRBqgh3RWQfVDGMlluWzSFa7yuKW77P"
    redirectUri={window.location.origin + "/users"}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);