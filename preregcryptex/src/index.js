import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-6bvf74nd.us.auth0.com"
    clientId="rIJPlulmw7BbHOFHMWVXq9aa5g56TwWF"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);