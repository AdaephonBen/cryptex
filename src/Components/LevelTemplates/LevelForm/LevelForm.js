import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Button, message } from "antd";
import "./LevelForm.css";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");
const globalUrl = "http://159.65.148.82/";

// message.config({
//     top: 500,
//     duration: 2,
//     maxCount: 3,
//   });

export default class LevelForm extends React.Component {
  constructor() {
    super();
    this.state = { name: "", username: "", phone: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  submitForm() {
    axios
      .get(
        globalUrl +
          "api/adduser?idToken=" +
          localStorage.getItem("id_token") +
          "&name=" +
          this.state.name +
          "&username=" +
          this.state.username +
          "&phonenumber=" +
          this.state.phone
      )
      .then(response => {
        var error = response.data.errorCode;
        if (error === "Success") {
          message.success("Created user");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else if (error === "Duplicate username") {
          message.error("Duplicate username");
        } else if (error === "Invalid username") {
          message.error(
            "Invalid username. Make sure it's at least 8 characters long. "
          );
        } else {
          message.error(
            "Unknown error. Please write to us at cryptex@elan.org.in. "
          );
        }
      })
      .catch(error => {
        localStorage.clear();
        window.location.replace("/");
      });
  }
  render() {
    return (
      <Form style={{ textAlign: "center", marginTop: "20vh" }}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Full Name"
            onChange={this.handleInputChange}
            className="fromLeft"
          />
          <span></span>
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Username"
            onChange={this.handleInputChange}
            className="fromCenter"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="phone"
            value={this.state.phone}
            placeholder="Phone Number"
            onChange={this.handleInputChange}
            className="fromCenter"
          />
        </FormGroup>
        <FormGroup>
          <Button
            type="primary"
            size="large"
            onClick={this.submitForm}
            style={{
              marginTop: "20px",
              backgroundColor: "#24C4A3",
              borderColor: "#24C4A3",
              color: "#1e2a3a"
            }}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
