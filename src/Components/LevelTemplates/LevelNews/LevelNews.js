import React from "react";
import { Button, message, Typography } from "antd";
import { Form, FormGroup, Input } from "reactstrap";
import "./LevelNews.css";
import axios from "axios";

const { Text } = Typography;

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");
const globalUrl = "https://cryptex.elan.org.in/";

// message.config({
//     top: 500,
//     duration: 2,
//     maxCount: 3,
//   });

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "Admin", password: "" };
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
          "api/answer?idToken=" +
          localStorage.getItem("id_token") +
          "&answer=" +
          this.state.password
      )
      .then(response => {
        var isCorrect = response.data.isCorrect;
        if (isCorrect) {
          message.success("Correct Answer");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error("Incorrect Answer");
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
            value={this.state.username}
            placeholder="Admin"
            className="fromLeft"
            disabled
          />
          <span></span>
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
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
        <FormGroup>
          <Button
            type="primary"
            size="large"
            onClick={this.props.changeState}
            style={{
              marginTop: "20px",
              backgroundColor: "#24C4A3",
              borderColor: "#24C4A3",
              color: "#1e2a3a"
            }}
          >
            Back
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

export default class LevelForm extends React.Component {
  constructor() {
    super();

    this.state = { question: "", clicked: false };
    this.changeState = this.changeState.bind(this);
  }
  changeState() {
    this.setState({ clicked: false });
  }
  componentDidMount() {
    axios
      .get(
        globalUrl +
          "api/question?idToken=" +
          localStorage.getItem("id_token") +
          "&level=" +
          window.location.pathname.split("/")[2]
      )
      .then(response => {
        console.log(response.data.errorCode);
        this.setState({ question: response.data.question });
      })
      .catch(error => {
        localStorage.clear();
        window.location.replace("/");
      });
  }

  render() {
    if (this.state.clicked) {
      return <Login changeState={this.changeState} />;
    } else {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "10vh",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "1rem"
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              style={{
                width: "75%",
                height: "75%",
                boxShadow: "4px 16px 16px 4px rgba(0,0,0,0.2)"
                // position: "absolute"
              }}
              src={this.state.question.split(",")[0]}
            />
            <a
              onClick={() => {
                this.setState({ clicked: true });
              }}
              style={{
                top: "36%",
                left: "40%",
                width: "20%",
                height: "24%",
                display: "block",
                position: "absolute"
              }}
            ></a>
            <a
              target="_blank"
              href={this.state.question.split(",")[1]}
              style={{
                top: "76%",
                left: "63%",
                width: "22%",
                height: "20%",
                display: "block",
                position: "absolute"
              }}
            ></a>
          </div>
        </div>
      );
    }
  }
}
