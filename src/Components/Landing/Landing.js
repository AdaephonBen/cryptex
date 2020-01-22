import React from "react";
import "./styles";
import { Button } from "antd";
import "antd/dist/antd.css";
import $ from "jquery";
import auth0 from "auth0-js";

const AUTH0_CLIENT_ID = "2EC1moa4JGUvzXxP2ee0alTLusa074eM";
const AUTH0_DOMAIN = "cryptex.auth0.com";
const AUTH0_API_AUDIENCE = "https://cryptex.auth0.com/api/v2/";
let globalRootURL = "http://159.65.148.82";
const AUTH0_CALLBACK_URL = globalRootURL;

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
  }
  parseHash() {
    this.auth0 = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID
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
  render() {
    return (
      <div>
        <p>Main Landing Page. Angad and Rachit are working on it. </p>
        <Button type="primary" onClick={this.authenticate}>
          Play
        </Button>
      </div>
    );
  }
}

export default Landing;
