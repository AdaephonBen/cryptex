import React from "react";
import { Flex, Text, Link } from "@chakra-ui/core";
import {
  FaSyncAlt,
  FaExternalLinkAlt,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import "./styles.css";

class Table extends React.Component {
  render() {
    return (
      <table className="mini-leaderboard-table">
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Level</th>
        </tr>
        <tr>
          <td>2</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
        <tr>
          <td>3</td>
          <td>adaephonben</td>
          <td>20</td>
        </tr>
      </table>
    );
  }
}

export default class MiniLeaderboard extends React.Component {
  render() {
    return (
      <Flex
        className="mini-leaderboard"
        padding="20px"
        flexDirection="column"
        backgroundColor="#212837"
      >
        <Flex className="leaderboard-header" justifyContent="space-between">
          <Text className="leaderboard-title">Leaderboard</Text>
          <Flex className="leaderboard-buttons">
            <Link href="http://google.com" className="icon-button">
              <FaSyncAlt></FaSyncAlt>
            </Link>
            <Link href="http://google.com" className="icon-button">
              <FaExternalLinkAlt></FaExternalLinkAlt>
            </Link>
          </Flex>
        </Flex>
        <Table />
      </Flex>
    );
  }
}
