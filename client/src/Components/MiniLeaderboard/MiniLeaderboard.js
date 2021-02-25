import React from "react";
import { Flex, Text, Link, Tooltip } from "@chakra-ui/react";
import { FaSyncAlt, FaExternalLinkAlt } from "react-icons/fa";
import Table from "./Table";
import "./styles.css";

const MiniLeaderboard = () => {
  return (
    <Flex
      className="mini-leaderboard"
      flexDirection="column"
    >
      <Flex className="leaderboard-header" justifyContent="space-between">
        <Text className="leaderboard-title">Leaderboard</Text>
        <Flex className="leaderboard-buttons">
          <Tooltip label="Refresh leaderboard">
            <Link href="http://google.com" className="icon-button">
              <FaSyncAlt />
            </Link>
          </Tooltip>
          <Tooltip label="View complete leaderboard">
            <Link href="http://google.com" className="icon-button">
              <FaExternalLinkAlt />
            </Link>
          </Tooltip>
        </Flex>
      </Flex>
      <Table />
    </Flex>
  );
};

export default MiniLeaderboard;
