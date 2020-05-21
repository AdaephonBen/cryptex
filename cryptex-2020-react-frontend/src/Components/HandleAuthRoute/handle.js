import React from "react";
import { Spin, Icon } from "antd";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
export default class Handle extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("id_token")) {
      window.location.replace("/level");
    }
  }
  render() {
    return (
      <p>
        <Spin indicator={antIcon} />
      </p>
    );
  }
}
