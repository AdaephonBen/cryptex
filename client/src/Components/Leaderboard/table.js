import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Text, Collapse, Button } from "@chakra-ui/react";
import "./styles.css";

const API_URL = process.env.REACT_APP_API_URL;

function Record(props) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { users, rank, team, level } = props;
  const members = users.map((user) => <Text>{user}</Text>);
  return (
    <tr className="record">
      <td>{rank}</td>
      <td>
        <Collapse in={show} startingHeight={25}>
          <Button
            variant="link"
            onClick={handleToggle}
            marginBottom="8px"
            marginTop="2px"
          >
            {team}
          </Button>
          {members}
        </Collapse>
      </td>
      <td>{level}</td>
    </tr>
  );
}

Record.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  rank: PropTypes.number.isRequired,
  team: PropTypes.string.isRequired,
};

function Table(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      console.log("Started Refreshing the leaderboard");
      const res = await fetch(
        `https://uploads157187.elan.org.in/leaderboard.json`
      );
      const json = await res.json();
      setData(json);
    };
    getLeaderboard();
    const refresh = setInterval(getLeaderboard, 5000);
    return () => clearInterval(refresh);
  }, [props.reload]);
  return (
    <table className="table">
      <tr>
        <th>Rank</th>
        <th>Team</th>
        <th>Level</th>
      </tr>
      <tbody>
        {data.length > 0 &&
          data.map((user) => (
            <Record
              rank={user.rank}
              team={user.username}
              users={[user.username]}
              level={user.question_number}
            />
          ))}
      </tbody>
    </table>
  );
}

export default Table;
