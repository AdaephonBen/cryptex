import React from "react";
import { Button, message, Typography } from "antd";
import "./LevelRules.css";
import axios from "axios";

const { Text } = Typography;

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
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm() {
    axios
      .get(
        globalUrl +
          "api/answer?idToken=" +
          localStorage.getItem("id_token") +
          "&answer="
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
      <div
        style={{
          textAlign: "center",
          marginTop: "10vh",
          backgroundColor: "#1E2939",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "30px",
          fontSize: "1rem"
        }}
      >
        <Text>Please read the Rules and Guidelines before you dive in.</Text>
        <br />
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
          Dive In
        </Button>
      </div>
    );
  }
}
