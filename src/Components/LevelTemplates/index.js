import React from "react";
// import Countdown from "react-houston";
// import "react-houston/dist/css/houston.css";
import "./index.css";
import { Collapse, Table, Row, Col, Icon, List, Dropdown, Menu } from "antd";
import Header from "antd/lib/calendar/Header";
import image from "../../bg.png";
import axios from "axios";
import { Slide, Fade } from "react-reveal";
import LevelForm from "./LevelForm/LevelForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LevelRules from "./LevelRules/LevelRules";
import LevelNews from "./LevelNews/LevelNews";
import LevelImage from "./LevelImage/LevelImage";
import LevelCode from "./LevelCode/LevelCode";
import LevelLink from "./LevelLink/LevelLink";
import LevelJigsaw from "./LevelJigsaw/LevelJigsaw";
import LevelVideo from "./LevelVideo/LevelVideo";
import LevelText from "./LevelText/LevelText";
import Navbar from "./../Navbar/index";

const { Panel } = Collapse;
const { Column } = Table;
const globalUrl = "https://cryptex.elan.org.in/";

const customPanelStyle1 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  borderRadius: "0px",
  padding: "0px"
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
      case 1:
        return <LevelImage />;
        break;
      case 2:
        return <LevelImage />;
        break;
      case 3:
        return <LevelImage />;
        break;
      case 4:
        return <LevelImage />;
        break;
      case 5:
        return <LevelImage />;
        break;
      case 6:
        return <LevelImage />;
        break;
      case 11:
        return <LevelCode />;
        break;
      case 12:
        return <LevelLink />;
        break;
      case 15:
        return <LevelJigsaw />;
        break;
      case 17:
        return <LevelLink />;
        break;
      case 19:
        return <LevelVideo />;
        break;
      case 20:
        return <LevelLink />;
        break;
      case 23:
        return <LevelText />;
        break;
      default:
        return <LevelImage />;
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
      secondsDifference: 0,
      loadingTable: true,
      hints: [],
      maxLevel: 0
    };
  }

  componentWillMount() {
    setInterval(() => {
      var rn = new Date();
      var cryptexDate = new Date(1580063400000);
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
    axios
      .get(globalUrl + "api/level?idToken=" + localStorage.getItem("id_token"))
      .then(response => {
        this.setState({ maxLevel: response.data.level });
      });
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
      this.setState({ loadingTable: true });
      var something = this.state.leaderboard;
      var hintsTemp = this.state.hints;
      axios.get(globalUrl + "/api/hints").then(response => {
        if (response.data) {
          response.data.forEach(element => {
            if (element.level === parseInt(x[2], 10)) {
              hintsTemp.push({
                title: "Hint " + element.index,
                description: element.hint
              });
            }
          });
        }
      });
      this.setState({ hints: hintsTemp });
      axios.get(globalUrl + "/api/leaderboard").then(response => {
        if (response.data != null) {
          let lengthRecords = this.state.leaderboard.length;
          for (let i = 0; i < lengthRecords && i < response.data.length; i++) {
            something[i].lastName = response.data[i].username;
            something[i].age = response.data[i].level;
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
                  if (Found2 >= 0) {
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
                      something[4].firstName = max + 1;
                    }
                    if (max == Found2) {
                      this.state.leaderboard.push();
                    } else {
                      var something = this.state.leaderboard;
                      something[5].lastName = response.data[Found2].username;
                      something[5].age = response.data[Found2].level;
                      something[5].firstName = Found2 + 1;
                    }
                  }
                }
              }
            });
        }
      });
      this.setState({ loadingTable: false });
      this.setState({ leaderboard: something });

      setInterval(() => {
        var hintsTemp = [];
        axios.get(globalUrl + "/api/hints").then(response => {
          if (response.data) {
            response.data.forEach(element => {
              if (element.level === parseInt(x[2], 10)) {
                hintsTemp.push({
                  title: "Hint " + element.index,
                  description: element.hint
                });
              }
              this.setState({ hints: hintsTemp });
            });
          }
        });

        this.setState({ loadingTable: true });
        var something = this.state.leaderboard;
        axios.get(globalUrl + "/api/leaderboard").then(response => {
          if (response.data != null) {
            let lengthRecords = this.state.leaderboard.length;
            for (
              let i = 0;
              i < lengthRecords && i < response.data.length;
              i++
            ) {
              something[i].lastName = response.data[i].username;
              something[i].age = response.data[i].level;
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
                    if (Found2 >= 0) {
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
                        something[4].firstName = max + 1;
                      }
                      if (max == Found2) {
                        this.state.leaderboard.push();
                      } else {
                        var something = this.state.leaderboard;
                        something[5].lastName = response.data[Found2].username;
                        something[5].age = response.data[Found2].level;
                        something[5].firstName = Found2 + 1;
                      }
                    }
                  }
                }
              });
          }
        });
        this.setState({ loadingTable: false });
        this.setState({ leaderboard: something });
      }, 3000);
    }
  }
  render() {
    const menuObjects = [];
    for (var i = 0; i <= this.state.maxLevel; i++) {
      menuObjects.push(
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href={"/level/" + i}>
            Level {i}
          </a>
        </Menu.Item>
      );
    }
    return (
      <div
        style={{ height: "100vh", backgroundColor: "rgba(30, 41, 57, 0.7)" }}
      >
        <Navbar />
        <Row
          style={{
            paddingTop: "3vh",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center"
          }}
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
              className="hiddenOnMobile"
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
                  // extra={}
                >
                  <a href="/leaderboard" target="_blank">
                    <Table
                      className="borders"
                      dataSource={this.state.leaderboard}
                      pagination={false}
                      loading={this.state.loadingTable}
                      // showHeader={false}
                    >
                      <Column
                        className="colm"
                        ellipsis={true}
                        title="Rank"
                        dataIndex="firstName"
                        key="firstName"
                        align="center"
                      />
                      <Column
                        className="colm"
                        ellipsis={true}
                        title="Username"
                        dataIndex="lastName"
                        key="lastName"
                        align="center"
                      />
                      <Column
                        className="colm"
                        ellipsis={true}
                        title="Level"
                        dataIndex="age"
                        key="age"
                        align="center"
                      />
                    </Table>
                    <div style={{ textAlign: "center", paddingTop: "5px" }}>
                      <a
                        href="/leaderboard"
                        target="_blank"
                        style={{
                          color: "#24C4A3",
                          marginLeft: "auto",
                          marginRight: "auto"
                        }}
                      >
                        View More
                      </a>
                    </div>
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
              span={window.innerWidth <= 480 ? 24 : 14}
              style={{
                height: "80vh",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Dropdown overlay={<Menu>{menuObjects}</Menu>}>
                  <a
                    className="ant-dropdown-link"
                    href="#"
                    style={{
                      color: "white",
                      fontSize: "1.1rem",
                      padding: "15px",
                      border: "1px solid #24C4A3"
                    }}
                  >
                    Choose level{" "}
                    <Icon
                      type="down"
                      style={{ color: "#24C4A3", paddingLeft: "5px" }}
                    />
                  </a>
                </Dropdown>
              </div>
              <Question level={this.state.level} />
              <div style={{ paddingTop: "20px" }}>
                <a
                  href="#"
                  style={{ color: "#24C4A3", fontSize: "1rem" }}
                  onClick={() => {
                    localStorage.clear();
                    window.location.replace("https://elan.org.in/cryptex");
                  }}
                >
                  Logout
                </a>
              </div>
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
              className="hiddenOnMobile"
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
                    dataSource={this.state.hints}
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
                  <div style={{ textAlign: "center" }}>
                    <a
                      href="https://forum.elan.org.in"
                      target="_blank"
                      style={{
                        color: "#24C4A3",
                        marginLeft: "auto",
                        marginRight: "auto"
                      }}
                    >
                      View Forum
                    </a>
                  </div>
                </Panel>
              </Collapse>
            </Col>
          </Slide>
        </Row>
      </div>
    );
  }
}
