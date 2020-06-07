import React from "react";
import { Flex, Text } from "@chakra-ui/core";
import Countdown from "./CountdownTimer";
import "../../fonts/GorgaGrotesque-Regular.ttf";
import "./styles.css";

const CountdownTimer = () => {
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
};

export default CountdownTimer;
