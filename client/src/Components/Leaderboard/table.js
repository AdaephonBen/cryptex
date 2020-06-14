import React from 'react';
import PropTypes from 'prop-types';
import { Text, Collapse, Button } from '@chakra-ui/core';
import './styles.css';

function Record(props) {
  const [show, setShow] = React.useState(false);
  const handleToggle = function () {
    return setShow(!show);
  };
  const members = props.users.map((user) => <Text>{user}</Text>);
  return (
    <tr className="record">
      <td>{props.rank}</td>
      <td>
        <Collapse isOpen={show} startingHeight={25}>
          <Button variant="link" onClick={handleToggle} marginBottom="8px">
            {props.team}
          </Button>
          {members}
        </Collapse>
      </td>
      <td>20</td>
    </tr>
  );
}

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
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
        <Record
          rank="2"
          team="adaephonben"
          users={['RonaldRoe', 'JaneDoe', 'RonaldRoe', 'JaneDoe']}
        />
      </tbody>
    </table>
  );
}

export default Table;
