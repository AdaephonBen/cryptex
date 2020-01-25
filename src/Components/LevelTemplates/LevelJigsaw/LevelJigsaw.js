import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Button, message, Typography } from "antd";
import { Form, FormGroup, Input } from "reactstrap";
import "./LevelJigsaw.css";
import axios from "axios";

const { Text } = Typography;

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("access_token");
const globalUrl = "https://cryptex.elan.org.in/";

export default class Jigsaw extends Component {
  state = {
    pieces: [],
    shuffled: [],
    solved: [],
    password: ""
  };

  componentDidMount() {
    let pieces = [];
    axios
      .get(
        globalUrl +
          "api/question?idToken=" +
          localStorage.getItem("id_token") +
          "&level=" +
          window.location.pathname.split("/")[2]
      )
      .then(response => {
        pieces = [...Array(26)].map((_, i) => ({
          img: response.data.question.split(",")[i],
          order: i,
          board: "shuffled"
        }));
        this.setState({
          pieces,
          shuffled: this.shufflePieces(pieces),
          solved: [...Array(26)]
        });
      })
      .catch(error => {
        localStorage.clear();
        window.location.replace("/");
      });
  }

  handleDrop(e, index, targetName) {
    let target = this.state[targetName];
    if (target[index]) return;

    const pieceOrder = e.dataTransfer.getData("text");
    const pieceData = this.state.pieces.find(p => {
      return p.order === +pieceOrder;
    });
    const origin = this.state[pieceData.board];

    if (targetName === pieceData.board) target = origin;
    origin[origin.indexOf(pieceData)] = undefined;
    target[index] = pieceData;
    pieceData.board = targetName;

    this.setState({ [pieceData.board]: origin, [targetName]: target });
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
  handleDragStart(e, order) {
    const dt = e.dataTransfer;
    dt.setData("text/plain", order);
    dt.effectAllowed = "move";
  }

  render() {
    return (
      <div className="jigsaw">
        <Text style={{ marginTop: "10px" }}>
          Please attempt this level using a computer for the best possible
          experience.{" "}
        </Text>
        <ul className="jigsaw__shuffled-board">
          {this.state.shuffled.map((piece, i) =>
            this.renderPieceContainer(piece, i, "shuffled")
          )}
        </ul>
        <ol
          className="jigsaw__solved-board"
          style={{ backgroundColor: "#1E2A3A" }}
        >
          {this.state.solved.map((piece, i) =>
            this.renderPieceContainer(piece, i, "solved")
          )}
        </ol>
        <Form
          style={{ textAlign: "center" }}
          onSubmit={e => {
            e.preventDefault();
            this.submitForm();
          }}
        >
          <FormGroup>
            <Input
              type="text"
              name="password"
              value={this.state.password}
              placeholder="Answer"
              onChange={e => {
                this.handleInputChange(e);
              }}
              className="fromCenter"
            />
          </FormGroup>
          <FormGroup>
            <Button
              type="primary"
              size="large"
              onClick={this.submitForm}
              onSubmit={this.submitForm}
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
      </div>
    );
  }

  renderPieceContainer(piece, index, boardName) {
    return (
      <li
        key={index}
        onDragOver={e => e.preventDefault()}
        onDrop={e => this.handleDrop(e, index, boardName)}
      >
        {piece && (
          <img
            draggable
            onDragStart={e => this.handleDragStart(e, piece.order)}
            src={piece.img}
          />
        )}
      </li>
    );
  }

  shufflePieces(pieces) {
    const shuffled = [...pieces];

    return shuffled;
  }
}
