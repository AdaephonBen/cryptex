import React from "react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import {MdCheckCircle} from "react-icons/md";
import "./styles.css";

const HintsList = () => {
	return (
		<List
			spacing={1}
			className="hints-list"
			padding="15px"
		>
			<ListItem>
				<ListIcon
					as={MdCheckCircle}
					color="green.500"
				/>
				Lorem ipsum dolor sit amet, consectetur
				adipisicing elit Lorem ipsum dolor sit amet,
				consectetur adipisicing elit
			</ListItem>
			<ListItem>
				<ListIcon
					as={MdCheckCircle}
					color="green.500"
				/>
				Assumenda, quia temporibus eveniet a libero
				incidunt suscipit
			</ListItem>
			<ListItem>
				<ListIcon
					as={MdCheckCircle}
					color="green.500"
				/>
				Quidem, ipsam illum quis sed voluptatum quae eum
				fugit earum
			</ListItem>
			<ListItem>
				<ListIcon
					as={MdCheckCircle}
					color="green.500"
				/>
				Quidem, ipsam illum quis sed voluptatum quae eum
				fugit earum
			</ListItem>
		</List>
	);
};

export default HintsList;
