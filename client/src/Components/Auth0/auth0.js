import React from "react";
import { Button } from "@chakra-ui/core";
import $ from "jquery";
import auth0 from "auth0-js";

const AUTH0_CLIENT_ID = "Y4lTZL7LZ05OnNglAcsmogfmTbDPDbDN";
const AUTH0_DOMAIN = "cryptex.auth0.com";
const AUTH0_API_AUDIENCE = "https://cryptex.auth0.com/api/v2/";
const AUTH0_CALLBACK_URL = "http://localhost:3000/auth0";

export default class Auth0 extends React.Component {
  constructor() {
    super();
    this.setup();
    this.parseHash();
    this.state = { loggedIn: false };
    this.authenticate = this.authenticate.bind(this);
  }
  parseHash() {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
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
  setup() {
    $.ajaxSetup({
      beforeSend: function (xhr) {
        if (localStorage.getItem("access_token")) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("access_token")
          );
        }
      },
    });
  }
  authenticate() {
    this.WebAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      scope: "openid email",
      audience: AUTH0_API_AUDIENCE,
      responseType: "token id_token",
      redirectUri: AUTH0_CALLBACK_URL,
    });
    this.WebAuth.authorize();
  }
  render() {
    return <Button onClick={this.authenticate}>LOG IN / REGISTER</Button>;
  }
}
