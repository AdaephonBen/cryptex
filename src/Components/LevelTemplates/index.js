import React from "react";
import Countdown from "react-houston";
import "react-houston/dist/css/houston.css";
import "./index.css";
import { Collapse, Table, Row, Col, Icon, List } from 'antd';
import Header from "antd/lib/calendar/Header";
const { Panel } = Collapse;
const { Column } = Table;

const data = [
  {
    key: '1',
    firstName: 1,
    lastName: 'Brown',
    age: 32,
  },
  {
    key: '2',
    firstName: 2,
    lastName: 'Green',
    age: 42,
  },
  {
    key: '3',
    firstName: 3,
    lastName: 'Black',
    age: 32,
  },
  {
    key: '4',
    firstName: 4,
    lastName: 'Black',
    age: 32,
  },
  {
    key: '5',
    firstName: 5,
    lastName: 'Black',
    age: 32,
  },
  {
    key: '6',
    firstName: 6,
    lastName: 'Black',
    age: 32,
  },
];

const new_data = [
  {
    title: 'Ant Design Title 1',
    description: 'yppppppppppppppppppppppppppppppp',
  },
  {
    title: 'Ant Design Title 2',
    description: 'yppppppppppppppppppppppppppppppp',
  },
  {
    title: 'Ant Design Title 3',
    description: 'yppppppppppppppppppppppppppppppp',
  },
  {
    title: 'Ant Design Title 4',
    description: 'yppppppppppppppppppppppppppppppp',
  },
];

const customPanelStyle = {
  overflow: 'hidden',
  color: '#cff8fa',
  background: '#13242b',
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
      <div style={{backgroundColor: "#13242b", height:"100vh"}}>
      <div style={{height: "8vh", backgroundColor: "#13242b"}}>
      <h1 style={{color: "#cff8fa", textAlign: "center", paddingTop: "2vh"}}>CRYPTEX</h1>
      </div>
      <Row>
      <Col span={5}>
      <Collapse className= "acc" style={{ borderRadius: "0px"}} onChange={callback} expandIcon={({ isActive }) => <Icon type="caret-down" rotate={isActive ? 180 : 0} />} >
      <Panel className=" acc one" header="LEADERBOARD" key="1" style={customPanelStyle}>
      <a href="https://www.helpnetsecurity.com/2016/05/12/facebook-ctf-platform-open-source/" target="_blank">
      <Table  className="borders" dataSource={data} pagination={false} showHeader={false}>
      <Column className="colm" title="Rank" dataIndex="firstName" key="firstName" />
      <Column className="colm" title="Username" dataIndex="lastName" key="lastName" />
      <Column className="colm" title="Level" dataIndex="age" key="age" />
      </Table>
      </a>
      </Panel>
      <Panel className="acc two" header="COUNTDOWN" key="2" style={customPanelStyle}>
      <p className="borders" style={{textAlign:"center", backgroundColor:"#13242b"}}><Countdown endDate={new Date('January 26, 2020 00:00:00')} /></p>
      </Panel>
      </Collapse>
      </Col>
      <Col span={13}></Col>
      <Col span={6}>
      <Collapse className="acc" style={{ borderRadius: "0px"}} onChange={call} expandIcon={({ isActive }) => <Icon type="caret-down" rotate={isActive ? 180 : 0} />} >
      <Panel className="acc three" header="HINTS" key="1" style={customPanelStyle}>
      <List
      itemLayout="horizontal"
      dataSource={new_data}
      renderItem={item => (
        <List.Item className="lists">
        <List.Item.Meta className="lists"
        avatar={<Icon style={{color:'#cff8fa', fontSize:'2vw'}} type="sketch"/>}
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
    
    