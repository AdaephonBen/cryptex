import React from "react";
import darkTheme from '@ant-design/dark-theme';
import { Button, DatePicker, version} from "antd";
import { Layout, Menu, Drawer, Icon } from 'antd';
import "antd/dist/antd.css";
import "./index.css";
import Countdown from 'react-houston';
import 'react-houston/dist/css/houston.css';
const { Header, Content, Footer } = Layout;
const cb = () => {
	console.log('expired callback')
}

export default class Level extends React.Component {
	state = { visible: false, placement: 'right' };

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
			<Layout className="layout">
			<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
			<div className="logo"></div>
			<Menu
			theme="dark"
			mode="horizontal"
			style={{ lineHeight: '64px', float:'right' }}
			>
			<Menu.Item key="1">Leaderboard</Menu.Item>
			<Menu.Item key="2">Rules</Menu.Item>
			<Menu.Item key="3">PrevQ</Menu.Item>
			<Menu.Item key="4">Sign Out</Menu.Item>
			</Menu>
			</Header>
			<Content style={{ color: 'white',padding: '10vh 0', minHeight: '100vh'}}>
			<div>Content</div>
			<div>
			<div>
			<Button type="primary" onClick={this.showDrawer}>
			<Icon type="bulb" />HINTS
			</Button>
			<Drawer
			title="HINTS"
			width={700}
			placement={this.state.placement}
			closable={true}
			onClose={this.onClose}
			visible={this.state.visible}
			mask={false}
			maskClosable= {false}
			>
			<p>nothing yet</p>
			<div
			style={{
				position: 'absolute',
				right: 0,
				bottom: 0,
				width: '100%',
				borderTop: '1px solid #e9e9e9',
				padding: '10px 16px',
				background: '#fff',
				textAlign: 'right',
			}}
			>
			<Button onClick={this.onClose} style={{ marginRight: 8 }}>
			Close
			</Button>
			</div>
			</Drawer>
			</div>
			<Countdown  endDate={new Date('December 25, 2020 00:00:00')} />
			</div>
			</Content>
			</Layout>
			</div>);
	}
}
