import React from "react";
import { List, ListItem, ListIcon } from "@chakra-ui/core";
import "./styles.css";

const HintsList = () => {
	return (
		<List
			spacing={1}
			className="hints-list"
			style={{ backgroundColor: "#1a202c" }}
			padding="15px"
		>
			<ListItem>
				<ListIcon
					icon="check-circle"
					color="green.500"
				/>
				Lorem ipsum dolor sit amet, consectetur
				adipisicing elit Lorem ipsum dolor sit amet,
				consectetur adipisicing elit
			</ListItem>
			<ListItem>
				<ListIcon
					icon="check-circle"
					color="green.500"
				/>
				Assumenda, quia temporibus eveniet a libero
				incidunt suscipit
			</ListItem>
			<ListItem>
				<ListIcon
					icon="check-circle"
					color="green.500"
				/>
				Quidem, ipsam illum quis sed voluptatum quae eum
				fugit earum
			</ListItem>
			<ListItem>
				<ListIcon
					icon="check-circle"
					color="green.500"
				/>
				Quidem, ipsam illum quis sed voluptatum quae eum
				fugit earum
			</ListItem>
		</List>
	);
};

export default HintsList;
