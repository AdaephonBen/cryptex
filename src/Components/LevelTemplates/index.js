import React from "react";
// import Countdown from "react-houston";
// import "react-houston/dist/css/houston.css";
import "./index.css";
import { Collapse, Table, Row, Col, Icon, List } from "antd";
import Header from "antd/lib/calendar/Header";
import image from "../../bg.png";
import { removeInternalBabelPlugin } from "customize-cra";
const { Panel } = Collapse;
const { Column } = Table;

const data = [
  {
    key: "1",
    firstName: 1,
    lastName: "yppppppppppppppppppppppppppppppp",
    age: 32
  },
  {
    key: "2",
    firstName: 2,
    lastName: "Green",
    age: 42
  },
  {
    key: "3",
    firstName: 3,
    lastName: "Black",
    age: 32
  },
  {
    key: "4",
    firstName: 4,
    lastName: "Black",
    age: 32
  },
  {
    key: "5",
    firstName: 5,
    lastName: "Black",
    age: 32
  },
  {
    key: "6",
    firstName: 6,
    lastName: "Black",
    age: 32
  }
];

const new_data = [
  {
    title: "Hint 1",
    description: "yppppppppppppppppppppppppppppppp"
  },
  {
    title: "Hint 2",
    description: "yppppppppppppppppppppppppppppppp"
  },
  {
    title: "Hint 3",
    description: "yppppppppppppppppppppppppppppppp"
  },
  {
    title: "Hint 4",
    description: "yppppppppppppppppppppppppppppppp"
  }
];

const customPanelStyle1 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  borderTop: "solid .05vw #2b3d43",
  borderBottom: "solid .05vw #2b3d43",
  borderRadius: "0px"
};
const customPanelStyle2 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  borderBottom: "solid .05vw #2b3d43",
  borderRadius: "0px"
};
const customPanelStyle3 = {
  overflow: "hidden",
  color: "#cff8fa",
  background: "#1E2939",
  borderLeft: "solid .05vw #5f6368",
  borderRadius: "5px",
  paddingBottom: ".2vh"
};

function callback(key) {
  console.log(key);
}

function call(key) {
  console.log(key);
}

export default class Level extends React.Component {
  render() {
    return (
      <div style={{ height: "100vh" }}>
        <div
          className="navb"
          style={{ height: "8vh", backgroundColor: "#1E2939" }}
        >
          <a className="nav_link">
            <h3 style={{ color: "#24C4A3", fontSize: "1vw" }}>RULES</h3>
          </a>
          <h3 style={{ color: "#24C4A3", fontSize: "1.7vw" }}>CRYPTEX</h3>
          <a className="nav_link">
            <h3 style={{ color: "#24C4A3", fontSize: " 1vw" }}>PREVIOUS Qs</h3>
          </a>
        </div>
        <Row
          style={{ paddingTop: "4vh", marginLeft: "auto", marginRight: "auto" }}
        >
          <Col
            span={6}
            style={{
              paddingTop: "20px",
              paddingRight: "20px",
              borderTop: "1px solid white",
              borderRight: "1px solid white",
              height: "100vh"
            }}
          >
            <Collapse
              defaultActiveKey={["1"]}
              className="acc"
              style={{
                borderRadius: "0px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
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
                    dataSource={data}
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
              defaultActiveKey={["1"]}
              className="acc"
              style={{
                borderRadius: "0px",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
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
                      <p style={{ fontSize: "1.3vw" }}>48</p>
                      <p style={{ fontSize: ".7vw" }}>HOURS</p>
                    </Col>
                    <Col span={8}>
                      <p style={{ fontSize: "1.3vw" }}>24</p>
                      <p style={{ fontSize: ".7vw" }}>MINUTES</p>
                    </Col>
                    <Col span={8}>
                      <p style={{ fontSize: "1.3vw" }}>48</p>
                      <p style={{ fontSize: ".7vw" }}>SECONDS</p>
                    </Col>
                  </Row>
                </p>
              </Panel>
            </Collapse>
          </Col>
          <Col
            span={12}
            style={{
              height: "80vh"
            }}
          ></Col>
          <Col
            span={6}
            style={{
              paddingTop: "20px",
              paddingLeft: "20px",
              borderTop: "1px solid white",
              borderLeft: "1px solid white",
              height: "60vw"
            }}
          >
            <Collapse
              defaultActiveKey={["1"]}
              className="acc"
              style={{
                boxShadow: "0 3px 5px rgba(0,0,0,0.20)",
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
                            style={{ color: "#cff8fa", fontSize: "1.5vw" }}
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
        </Row>
      </div>
    );
  }
}
