import React from "react";
import { Flex, Text, Link, Tooltip } from "@chakra-ui/core";
import { FaSyncAlt } from "react-icons/fa";
import HistoryFeed from "./HistoryFeed";
import "./styles.css";

const History = () => {
  return (
    <Flex
      className="history"
      flexDirection="column"
      style={{ maxHeight: "100%" }}
    >
      <Flex className="history-header" justifyContent="space-between">
        <Text className="history-title">Answer History</Text>
        <Flex className="history-buttons">
          <Tooltip label="Refresh history">
            <Link href="http://google.com" className="icon-button">
              <FaSyncAlt />
            </Link>
          </Tooltip>
        </Flex>
      </Flex>
      <HistoryFeed />
    </Flex>
  );
};

export default History;
