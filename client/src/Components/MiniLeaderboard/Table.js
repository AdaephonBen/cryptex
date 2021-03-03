import React, { useState, useEffect } from "react";
import Table from "../Table/table.tsx";
import "./styles.css";

const API_URL = process.env.REACT_APP_API_URL;

const TableLeaderboard = (props) => {
  const [mini, setMini] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      console.log("refreshing lb");
      const res = await fetch(`${API_URL}leaderboard`);
      const json = await res.json();
      setMini(json.slice(0, 8));
    };
    getLeaderboard();
    const refresh = setInterval(getLeaderboard, 5000);
    return () => clearInterval(refresh);
  }, [props.reload]);

  return (
    <Table.Container
      my={4}
      overflowX="hidden"
      overflowY="auto"
      visibility="hidden"
      className="container_table"
    >
      <Table.Table className="actual_table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rank</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Level</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {mini.length > 0 &&
            mini.map((user) => (
              <Table.Tr>
                <Table.Td>{user.rank}</Table.Td>
                <Table.Td>{user.username}</Table.Td>
                <Table.Td>{user.question_number}</Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table.Table>
    </Table.Container>
  );
};

export default TableLeaderboard;
