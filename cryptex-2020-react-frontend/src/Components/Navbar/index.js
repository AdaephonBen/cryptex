import "./index.css";
import React from "react";
import { Row, Col } from "antd";
import { Slide } from "react-reveal";
import image from "./../../128x128.png";

export default class Navbar extends React.Component {
  render() {
    return (
      <Slide top>
        <Row>
          <Col span={5} style={{ textAlign: "center", paddingTop: "20px" }}>
            <h2 className="crypt" style={{ color: "#24C4A3" }}>
              <a href="https://elan.org.in/cryptex/elements.html">Rules</a>
            </h2>
          </Col>
          <Col span={14} style={{ textAlign: "center", paddingTop: "20px" }}>
            <h1
              className="crypt"
              style={{
                color: "#24C4A3"
              }}
            >
              cryptex
            </h1>
          </Col>
          <Col span={5} style={{ textAlign: "center", paddingTop: "20px" }}>
            <h2 className="crypt" style={{ color: "#24C4A3" }}>
              <a href="https://forum.elan.org.in">Forum</a>
            </h2>
          </Col>
        </Row>
      </Slide>
    );
  }
}
