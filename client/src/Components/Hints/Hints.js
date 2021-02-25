import React from "react";
import { Flex, Text, Link, Tooltip } from "@chakra-ui/react";
import { FaSyncAlt } from "react-icons/fa";
import HintsList from "./HintsList";
import "./styles.css";

const Hints = () => {
  return (
    <Flex className="hints" paddingTop="20px" flexDirection="column">
      <Flex className="hints-header" justifyContent="space-between">
        <Text className="hints-title">Hints</Text>
        <Flex className="hints-buttons">
          <Tooltip label="Refresh hints">
            <Link href="http://google.com" className="icon-button">
              <FaSyncAlt />
            </Link>
          </Tooltip>
        </Flex>
      </Flex>
      <HintsList />
    </Flex>
  );
};

export default Hints;
