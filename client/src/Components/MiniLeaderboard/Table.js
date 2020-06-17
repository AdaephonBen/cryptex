import React, { useState, useRef, useEffect } from "react";
import uuid from "react-uuid";
import "./styles.css";

const TableRow = () => {
  return (
    <tr>
      <td>3</td>
      <td>adaephonben</td>
      <td>20</td>
    </tr>
  );
};

const Table = () => {
  const table = useRef(null);
  const [rowsToShow, setRowsToShow] = useState(20);
  useEffect(() => {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const heightToReduce = scrollHeight - document.documentElement.clientHeight;
    const rowHeight = table.current.clientHeight;
    setRowsToShow((r) => r - Math.ceil(heightToReduce / rowHeight));
  }, []);
  return (
    <table className="mini-leaderboard-table">
      <thead>
        <tr ref={table}>
          <th>Rank</th>
          <th>Username</th>
          <th>Level</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(rowsToShow)].map(() => (
          <TableRow key={uuid()} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
