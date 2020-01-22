import React from "react";
// import Countdown from "react-houston";
// import "react-houston/dist/css/houston.css";
import "./index.css";
import { Collapse, Table, Row, Col, Icon, List } from "antd";
import Header from "antd/lib/calendar/Header";
import image from "../../bg.png";
import axios from "axios";
import { Slide, Fade } from "react-reveal";
import LevelForm from "./LevelForm/LevelForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LevelRules from "./LevelRules/LevelRules";
import LevelNews from "./LevelNews/LevelNews";

const { Panel } = Collapse;
const { Column } = Table;
const globalUrl = "http://localhost:8080/";
const new_data = [
  {
    title: "Hint 1",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
    title: "Hint 2",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
    title: "Hint 3",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  },
  {
    title: "Hint 4",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "
  }
];

const customPanelStyle1 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  borderRadius: "0px"
};
const customPanelStyle2 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  borderRadius: "0px"
};
const customPanelStyle3 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  // borderRadius: "5px",
  paddingBottom: ".2vh"
};

function callback(key) {
  console.log(key);
}

function call(key) {
  console.log(key);
}

class Question extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const level = this.props.level;
    console.log("lol" + level);
    switch (parseInt(level, 10)) {
      case -2:
        return <LevelForm />;
        break;
      case -1:
        return <LevelRules />;
        break;
      case 0:
        return <LevelNews />;
        break;
      default:
        return <p>Whatever</p>;
        break;
    }
  }
}

export default class Level extends React.Component {
  constructor() {
    super();
    this.state = {
      level: null,
      leaderboard: [
        {
          key: "1",
          firstName: 1,
          lastName: "Loading",
          age: 1
        },
        {
          key: "2",
          firstName: 2,
          lastName: "Loading",
          age: 1
        },
        {
          key: "3",
          firstName: 3,
          lastName: "Loading",
          age: 1
        },
        {
          key: "4",
          firstName: 4,
          lastName: "Loading",
          age: 1
        },
        {
          key: "5",
          firstName: 5,
          lastName: "Loading",
          age: 1
        },
        {
          key: "6",
          firstName: 6,
          lastName: "Loading",
          age: 1
        }
      ],
      hoursDifference: 0,
      minutesDifference: 0,
      secondsDifference: 0
    };
  }

  componentWillMount() {
    setInterval(() => {
      var rn = new Date();
      var cryptexDate = new Date(1579869000000);
      var difference = cryptexDate.getTime() - rn.getTime();

      var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
      difference -= hoursDifference * 1000 * 60 * 60;

      var minutesDifference = Math.floor(difference / 1000 / 60);
      difference -= minutesDifference * 1000 * 60;

      var secondsDifference = Math.floor(difference / 1000);
      this.setState({
        hoursDifference: hoursDifference,
        minutesDifference: minutesDifference,
        secondsDifference: secondsDifference
      });
    }, 1000);
    let x = window.location.pathname.split("/");
    if (x.length <= 2) {
      axios
        .get(
          globalUrl + "api/level?idToken=" + localStorage.getItem("id_token")
        )
        .then(response => {
          this.setState({ level: response.data.level });
          window.location.replace("/level/" + response.data.level);
        });
    } else {
      this.setState({ level: x[2] });
      setInterval(() => {
        axios.get(globalUrl + "/api/leaderboard").then(response => {
          if (response.data != null) {
            let lengthRecords = response.data.length;
            for (let i = 0; i < lengthRecords; i++) {
              var something = this.state.leaderboard;
              something[i].lastName = response.data[i].username;
              something[i].age = response.data[i].level;
              this.setState({ leaderboard: something });
            }
            axios
              .get(
                globalUrl +
                  "/api/username?email=" +
                  JSON.parse(localStorage.getItem("email")).email
              )
              .then(response2 => {
                if (response2.data.username) {
                  var Found = -1;
                  for (var i = 0; i < this.state.leaderboard.length; i++) {
                    if (
                      this.state.leaderboard[i].lastName ===
                      response2.data.username
                    )
                      Found = i;
                  }
                  if (Found < 0) {
                    var Found2 = -1;
                    for (var i = 0; i < response.data.length; i++) {
                      if (response.data[i].username === response2.data.username)
                        Found2 = i;
                    }
                    var max = -1;
                    for (var i = 0; i < response.data.length; i++) {
                      if (
                        response.data[Found2].level === response.data[i].level
                      ) {
                        max = i;
                        break;
                      }
                    }
                    var Found3 = -1;
                    for (var i = 0; i < this.state.leaderboard.length; i++) {
                      if (
                        this.state.leaderboard[i].lastName ===
                        response.data[max].username
                      )
                        Found3 = i;
                    }
                    if (Found3 < 0) {
                      var something = this.state.leaderboard;
                      something[4].lastName = response.data[max].username;
                      something[4].age = response.data[max].level;
                      this.setState({ leaderboard: something });
                    }
                    if (max == Found2) {
                      this.state.leaderboard.push();
                    } else {
                      var something = this.state.leaderboard;
                      something[5].lastName = response.data[max].username;
                      something[5].age = response.data[max].level;
                      this.setState({ leaderboard: something });
                    }
                  }
                }
              });
          }
        });
      }, 3000);
    }
  }
  render() {
    return (
      <div
        style={{ height: "100vh", backgroundColor: "rgba(30, 41, 57, 0.7)" }}
      >
        <Slide top>
          {/* <div className="navb" style={{ height: "8vh" }}>
            <a className="nav_link">
              <h3 style={{ color: "#24C4A3", fontSize: "1vw" }}>RULES</h3>
            </a>
            <h3
              className="crypt"
              style={{ color: "#24C4A3", fontSize: "2.5vw" }}
            >
              CRYPTEX
            </h3>
            <a className="nav_link">
              <h3 style={{ color: "#24C4A3", fontSize: " 1vw" }}>
                PREVIOUS Qs
              </h3>
            </a>
          </div> */}
          <Row>
            <Col span={2} style={{ textAlign: "center", paddingTop: "20px" }}>
              <h3
                className="crypt"
                style={{ color: "#24C4A3", fontSize: "1vw" }}
              >
                rules
              </h3>
            </Col>
            <Col span={20} style={{ textAlign: "center", paddingTop: "20px" }}>
              <h3
                className="crypt"
                style={{
                  color: "#24C4A3",
                  fontSize: "2vw"
                }}
              >
                cryptex
              </h3>
            </Col>
            <Col span={2} style={{ textAlign: "center", paddingTop: "20px" }}>
              <h3
                className="crypt"
                style={{ color: "#24C4A3", fontSize: " 1vw" }}
              >
                levels
              </h3>
            </Col>
          </Row>
        </Slide>
        <Row
          style={{ paddingTop: "4vh", marginLeft: "auto", marginRight: "auto" }}
        >
          <Slide left>
            <Col
              span={5}
              style={{
                paddingTop: "20px",
                paddingRight: "20px",
                boxShadow: "4px 16px 16px 4px rgba(0,0,0,0.2)",
                height: "100vh",
                backgroundColor: "rgb(30, 41, 57)"
              }}
            >
              <Collapse
                defaultActiveKey={["1"]}
                className="acc"
                style={{
                  borderRadius: "0px",
                  // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  marginLeft: "20px",
                  marginBottom: "20px"
                }}
                onChange={callback}
                expandIcon={({ isActive }) => (
                  <Icon
                    type="caret-down"
                    rotate={isActive ? 180 : 0}
                    style={{ color: "#24C4A3" }}
                  />
                )}
              >
                <Panel
                  className=" acc one"
                  header="LEADERBOARD"
                  key="1"
                  style={customPanelStyle1}
                >
                  <a
                    href="https://www.helpnetsecurity.com/2016/05/12/facebook-ctf-platform-open-source/"
                    target="_blank"
                  >
                    <Table
                      className="borders"
                      dataSource={this.state.leaderboard}
                      pagination={false}
                      showHeader={false}
                    >
                      <Column
                        className="colm"
                        ellipsis={true}
                        title="Rank"
                        dataIndex="firstName"
                        key="firstName"
                      />
                      <Column
                        className="colm"
                        ellipsis={true}
                        title="Username"
                        dataIndex="lastName"
                        key="lastName"
                      />
                      <Column
                        className="colm"
                        ellipsis={true}
                        title="Level"
                        dataIndex="age"
                        key="age"
                      />
                    </Table>
                  </a>
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["2"]}
                className="acc"
                style={{
                  borderRadius: "0px",
                  // boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  marginLeft: "20px"
                  // marginBottom: "60px"
                }}
                onChange={callback}
                expandIcon={({ isActive }) => (
                  <Icon
                    type="caret-down"
                    rotate={isActive ? 180 : 0}
                    style={{ color: "#24C4A3" }}
                  />
                )}
              >
                <Panel
                  className="acc two"
                  header="COUNTDOWN"
                  key="2"
                  style={customPanelStyle2}
                >
                  <p
                    className="borders"
                    style={{
                      backgroundColor: "#1E2939",
                      textAlign: "center",
                      color: "#cff8fa"
                    }}
                  >
                    <Row style={{ paddingTop: "1vw", paddingBottom: "1vw" }}>
                      <Col span={8}>
                        <p style={{ fontSize: "1.3vw" }}>
                          {this.state.hoursDifference}
                        </p>
                        <p style={{ fontSize: ".7vw" }}>HOURS</p>
                      </Col>
                      <Col span={8}>
                        <p style={{ fontSize: "1.3vw" }}>
                          {this.state.minutesDifference}
                        </p>
                        <p style={{ fontSize: ".7vw" }}>MINUTES</p>
                      </Col>
                      <Col span={8}>
                        <p style={{ fontSize: "1.3vw" }}>
                          {this.state.secondsDifference}
                        </p>
                        <p style={{ fontSize: ".7vw" }}>SECONDS</p>
                      </Col>
                    </Row>
                  </p>
                </Panel>
              </Collapse>
            </Col>
          </Slide>
          <Fade top>
            <Col
              span={14}
              style={{
                height: "80vh"
              }}
            >
              <Question level={this.state.level} />
            </Col>
          </Fade>
          <Slide right>
            <Col
              span={5}
              style={{
                paddingTop: "20px",
                paddingLeft: "20px",
                boxShadow: "4px 16px 16px 4px rgba(0,0,0,0.2)",
                height: "60vw",
                backgroundColor: "rgb(30, 41, 57)"
              }}
            >
              <Collapse
                defaultActiveKey={["1"]}
                className="acc"
                style={{
                  // boxShadow: "0 3px 5px rgba(0,0,0,0.20)",
                  marginRight: "20px"
                }}
                onChange={call}
                expandIcon={({ isActive }) => (
                  <Icon
                    type="caret-down"
                    rotate={isActive ? 180 : 0}
                    style={{ color: "#24C4A3" }}
                  />
                )}
              >
                <Panel
                  className="acc three"
                  header="HINTS"
                  key="1"
                  style={customPanelStyle3}
                >
                  <List
                    className="borders hints"
                    itemLayout="horizontal"
                    dataSource={new_data}
                    renderItem={item => (
                      <List.Item className="lists">
                        <List.Item.Meta
                          className="lists"
                          avatar={
                            <Icon
                              style={{ color: "#24C4A3", fontSize: "1.5vw" }}
                              type="sketch"
                            />
                          }
                          title={item.title}
                          description={item.description}
                        />
                      </List.Item>
                    )}
                  />
                </Panel>
              </Collapse>
            </Col>
          </Slide>
        </Row>
      </div>
    );
  }
}
