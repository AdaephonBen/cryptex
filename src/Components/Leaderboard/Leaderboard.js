import "./index.css";
import React from "react";
import { Table } from "antd";
import { Fade } from "react-reveal";
import Navbar from "./../Navbar";
import { Typography } from "antd";
import axios from "axios";

const globalUrl = "https://cryptex.elan.org.in/";

const { Title } = Typography;

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank"
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level"
  }
];

export default class Leaderboard extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, dataSource: [] };
  }
  componentDidMount() {
    axios.get(globalUrl + "api/leaderboard").then(response => {
      var component = this.state.dataSource;
      response.data.map((user, index) => {
        component.push({
          key: index + 1,
          rank: index + 1,
          username: user.username,
          level: user.level
        });
      });
      this.setState({ dataSource: component, isLoading: false });
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <Fade>
          <div className="container">
            <Title level={1} className="main-title">
              Leaderboard
            </Title>
            <Table
              pagination={{ defaultPageSize: 500, position: "top" }}
              columns={columns}
              dataSource={this.state.dataSource}
              style={{ paddingLeft: "1vh", paddingRight: "1vh" }}
              loading={this.state.isLoading}
            />
          </div>
        </Fade>
      </div>
    );
  }
}
