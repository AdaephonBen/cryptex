import React from "react";
import { Flex } from "@chakra-ui/core";
import "./styles.css";

export default class Level extends React.Component {
  render() {
    return (
      <Flex className="level" padding="20px" flexDirection="column">
        Question
        <br /> Question
        <br /> Question
        <br /> Question
        <br /> Question
        <br /> Question
      </Flex>
    );
  }
}
