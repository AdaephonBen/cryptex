import React from "react";
import Table from "../Table/table.tsx";
import "./styles.css";

const TableLeaderboard = () => {
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
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>2</Table.Td>
            <Table.Td>blahblahblahblah</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table.Table>
    </Table.Container>
  );
};

export default TableLeaderboard;
