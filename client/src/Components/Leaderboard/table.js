import React from "react";
import PropTypes from "prop-types";
import { Text, Collapse, Button } from "@chakra-ui/core";
import "./styles.css";

function Record(props) {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => {
    return setShow(!show);
  };
  const { users, rank, team } = props;
  const members = users.map((user) => <Text>{user}</Text>);
  return (
    <tr className="record">
      <td>{rank}</td>
      <td>
        <Collapse isOpen={show} startingHeight={25}>
          <Button variant="link" onClick={handleToggle} marginBottom="8px">
            {team}
          </Button>
          {members}
        </Collapse>
      </td>
      <td>20</td>
    </tr>
  );
}

Record.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  rank: PropTypes.number.isRequired,
  team: PropTypes.string.isRequired,
};

function Table() {
  return (
    <table className="table">
      <tr>
        <th>Rank</th>
        <th>Team</th>
        <th>Level</th>
      </tr>
      <tbody>
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={["RonaldRoe", "JaneDoe", "RonaldRoe", "JaneDoe"]}
        />
      </tbody>
    </table>
  );
}

export default Table;
