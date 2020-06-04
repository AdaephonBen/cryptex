import React from "react";
import { Flex, Text, Link, Box } from "@chakra-ui/core";
import {
  FaSyncAlt,
  FaExternalLinkAlt,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import "../../fonts/GorgaGrotesque-Regular.ttf";
import "./styles.css";

class Countdown extends React.Component {
  render() {
    return <Box className="countdown">19:20:21</Box>;
  }
}

export default class CountdownTimer extends React.Component {
  render() {
    return (
      <Flex
        className="countdown-timer"
        padding="20px"
        flexDirection="column"
        backgroundColor="#212837"
      >
        <Flex className="countdown-header" justifyContent="space-between">
          <Text className="countdown-title">Countdown</Text>
        </Flex>
        <Countdown />
      </Flex>
    );
  }
}
