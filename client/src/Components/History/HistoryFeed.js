import React, { useEffect, useState } from "react";
import { Flex, Text, Badge } from "@chakra-ui/core";
import "./styles.css";

const HistoryItem = (item) => {
  console.log(HistoryItem);
  return (
    <Flex wrap="nowrap" py={1}>
      <Badge ml="1" variantColor="green" textTransform="lowercase">
        {item.timestamp}
      </Badge>
      <Badge ml="1" variantColor="blue" textTransform="lowercase">
        {item.username}
      </Badge>
      {/* <Text wrap="nowrap">{item.answer}</Text> */}
      <Badge ml="1" variantColor="red" textTransform="lowercase">
        {item.answer}
      </Badge>
    </Flex>
  );
};

const HistoryFeed = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((history) => [
        ...history,
        {
          username: "adaephonben",
          answer: "largeranswer",
          timestamp: "12:34:56",
        },
      ]);
    }, 1000);
  }, []);
  console.log(history);
  return (
    <Flex
      className="history-feed"
      overflowY="auto"
      paddingY="10px"
      paddingX="10px"
      flexDirection="column"
    >
      {history.map((item) => HistoryItem(item))}
    </Flex>
  );
};

export default React.memo(HistoryFeed);