import React from "react";
import { Flex, Text, Link, Tooltip } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import HistoryFeed from "./HistoryFeed";
import "./styles.css";

const History = (props) => {
  const { answers, setAnswers } = props;
  return (
    <Flex
      className="history"
      flexDirection="column"
      style={{ maxHeight: "100%" }}
    >
      <Flex className="history-header" justifyContent="space-between">
        <Text className="history-title">Answer History</Text>
        <Flex className="history-buttons">
          <Tooltip label="Reset History">
            <Link
              onClick={() => setAnswers((old) => [])}
              className="icon-button"
            >
              <FaTimes />
            </Link>
          </Tooltip>
        </Flex>
      </Flex>
      <HistoryFeed answers={answers} />
    </Flex>
  );
};

export default History;
