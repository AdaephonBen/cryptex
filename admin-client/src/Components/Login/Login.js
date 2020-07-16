import React from "react";
import {
  Card,
  Button,
  InputGroup,
  FormGroup,
  Elevation,
} from "@blueprintjs/core";
import "./styles.css";

function Login() {
  return (
    <Card elevation={Elevation.ZERO} className="login-box">
      <h3 className="login-heading bp3-heading">Rosetta Admin Login</h3>
      <FormGroup label="Username" labelInfo="required">
        <InputGroup type="text" required />
      </FormGroup>
      <FormGroup label="Password" labelInfo="required">
        <InputGroup type="password" required />
      </FormGroup>
      <a href="/create">
        <Button className="bp3-intent-primary" type="submit">
          Log In
        </Button>
      </a>
    </Card>
  );
}

export default Login;
