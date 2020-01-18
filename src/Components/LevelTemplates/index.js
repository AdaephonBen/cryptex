import React from "react";
import { Layout, Menu, Timeline} from "antd";
import { Row, Col, Table , Drawer, Icon} from 'antd';
import Countdown from "react-houston";
import "react-houston/dist/css/houston.css";
import "./index.css";
const { Header, Content} = Layout;
const cb = () => {
  console.log("expired callback");
};
const { Column} = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 1,
    age: 32,
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 2,
    age: 42,
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 3,
    age: 32,
  },
];

export default class Level extends React.Component {
  state = { visible: 'true', placement: 'left' };
  
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  
  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };
  render() {
    return (
      <div>
      <Layout className="layout" theme="dark" style={{paddingRight:'0px'}}>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%"}}>
      <Menu
      mode="horizontal"
      style={{ lineHeight: '9vh', float:"right", backgroundColor: "#001529", fontSize: '2.2vh'}}
      >
      <Menu.Item  key="1" onClick={this.showDrawer}><a id="link_one"><Icon type="tool" />Utilities</a></Menu.Item>
      <Menu.Item  key="2"><a id="link_two"href="https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_width_ref"  target="_blank">
      <Icon type="bars" />Rules</a></Menu.Item>
      <Menu.Item  key="3" ><a id="link_three"href="https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_width_ref"  target="_blank">
      <Icon type="trophy" />Leaderboard</a></Menu.Item>
      </Menu>
      </Header>
      <Content style={{ padding: '0 50px'}}>
      <Drawer
      title="CRYPTEX"
      placement={this.state.placement}
      onClose={this.onClose}
      visible={this.state.visible}
      mask={false}
      maskClosable={false}
      width="18vw"
      >
      <a href="https://www.w3schools.com/jquery/tryit.asp?filename=tryjquery_css_width_ref"  target="_blank"><Table dataSource={data} pagination={false}>
      <Column title="Rank" dataIndex="lastName" key="lastName" />
      <Column title="Name" dataIndex="firstName" key="firstName" />
      <Column title="Level" dataIndex="age" key="age" />
      />
      </Table></a>
      <Countdown endDate={new Date("January 24, 2020 00:00:00")} />
      </Drawer>
      <Row>
      <Col span={18} id="col2" style={{height:"100vh", padding:"10vh 2vw"}}>
      </Col>
      <Col span={6} id= "col3" style={{height:"100vh", padding:"10vh 2vw", borderLeft:".1vw #4f5254 solid"}}>
      <h2 align="center" style={{color: "white", marginBottom: '5vh'}}><Icon type="bulb" /> HINTS</h2>
      <div style={{color:'white'}}>
      <Timeline >
      <Timeline.Item color="#0faf9f">
      Hint 1
      <p>Create a services site 2015-09-01 big big big big big big big big big big gib </p>
      </Timeline.Item>
      <Timeline.Item color="#0faf9f">
      Hint 2
      <p>Solve initial network problems 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="#0faf9f">
      Hint 3
      <p>Technical testing 2015-09-01</p>
      </Timeline.Item>
      <Timeline.Item color="#0faf9f">
      Hint 4
      <p>Network problems being solved 2015-09-01</p>
      </Timeline.Item>
      </Timeline>
      </div>
      </Col>
      </Row>
      </Content>
      </Layout>
      </div>
      );
    }
  }
  
