import React from "react";
import { Button } from "antd";
import $ from "jquery";
import auth0 from "auth0-js";
import Logo from "./../../128x128.png";
import DaVinci from "./../../128x128.png";

const AUTH0_CLIENT_ID = "nl87FH8EoPD4EFqJMYBIJQBr107BDlMZ";
const AUTH0_DOMAIN = "cryptex20.auth0.com";
const AUTH0_API_AUDIENCE = "https://cryptex20.auth0.com/api/v2/";
let globalRootURL = "https://cryptex.elan.org.in";
const AUTH0_CALLBACK_URL = "https://cryptex.elan.org.in";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }
  parseHash() {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID

      // overrides: {
      //   __tenant: config.auth0Tenant,
      //   __token_issuer: config.authorizationServer.issuer
      // }
    });
    this.auth0.parseHash((err, authResult) => {
      if (err) {
        return console.log(err);
      }
      if (
        authResult !== null &&
        authResult.accessToken !== null &&
        authResult.idToken !== null
      ) {
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem(
          "email",
          JSON.stringify(authResult.idTokenPayload)
        );
        window.location = window.location.href.substr(
          0,
          window.location.href.indexOf("")
        );
      }
    });
  }

  authenticate() {
    this.WebAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      scope: "openid email",
      audience: AUTH0_API_AUDIENCE,
      responseType: "token id_token",
      redirectUri: AUTH0_CALLBACK_URL
    });
    this.WebAuth.authorize();
  }

  setup() {
    $.ajaxSetup({
      beforeSend: function(xhr) {
        if (localStorage.getItem("access_token")) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("access_token")
          );
        }
      }
    });
  }

  setState() {
    let idToken = localStorage.getItem("id_token");
    if (idToken) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  componentWillMount() {
    this.setup();
    this.parseHash();
    this.setState();
  }

  componentDidMount() {
    this.authenticate();
  }

  render() {
    return <div></div>;
  }
}

export default Landing;
