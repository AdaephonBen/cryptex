import React from "react";
import { Flex, Text, Link, List, ListItem, ListIcon } from "@chakra-ui/core";
import { FaSyncAlt, FaAngleUp, FaAngleDown } from "react-icons/fa";
import "./styles.css";
import { motion, AnimatePresence } from "framer-motion";

class HintList extends React.Component {
  render() {
    return (
      <List spacing={1} className="hints-list">
        <ListItem>
          <ListIcon icon="check-circle" color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum
          dolor sit amet, consectetur adipisicing elit
        </ListItem>
        <ListItem>
          <ListIcon icon="check-circle" color="green.500" />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </ListItem>
        <ListItem>
          <ListIcon icon="check-circle" color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
        <ListItem>
          <ListIcon icon="check-circle" color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </ListItem>
      </List>
    );
  }
}

const MotionFlex = motion.custom(Flex);

export default class Hints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHintsOpen: true,
    };
  }
  toggleHints() {
    this.setState({ isHintsOpen: !this.state.isHintsOpen });
  }
  render() {
    return (
      <Flex
        className="hints"
        padding="20px"
        flexDirection="column"
        backgroundColor="#212837"
      >
        <Flex className="hints-header" justifyContent="space-between">
          <Text className="hints-title">Hints</Text>
          <Flex className="hints-buttons">
            <Link href="http://google.com" className="icon-button">
              <FaSyncAlt></FaSyncAlt>
            </Link>
            <Link
              href="#"
              className="icon-button"
              onClick={() => {
                this.toggleHints();
              }}
            >
              {this.state.isHintsOpen ? <FaAngleUp /> : <FaAngleDown />}
            </Link>
          </Flex>
        </Flex>

        <AnimatePresence>
          {this.state.isHintsOpen && (
            <MotionFlex
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <HintList />
            </MotionFlex>
          )}
        </AnimatePresence>
      </Flex>
    );
  }
}
