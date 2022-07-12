import React from "react";
import { Flex, Badge } from "@chakra-ui/react";
import "./styles.css";

const HistoryItem = (item) => {
  return (
    <Flex wrap="nowrap" py={1}>
      <Badge ml="1" colorScheme="red" fontSize="20px" textTransform="lowercase">
        {item}
      </Badge>
    </Flex>
  );
};

const HistoryFeed = (props) => {
  const { answers } = props;
  return (
    <Flex
      className="history-feed"
      overflowY="auto"
      paddingY="10px"
      paddingX="10px"
      flexDirection="column"
      maxHeight="calc(100vh - 200px)"
    >
      {answers.map((item) => HistoryItem(item))}
    </Flex>
  );
};

export default React.memo(HistoryFeed);
