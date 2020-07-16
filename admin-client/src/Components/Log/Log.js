import React from "react";
import {
  Card,
  ControlGroup,
  InputGroup,
  Button,
  HTMLSelect,
  Icon,
} from "@blueprintjs/core";
import LogFeed from "./LogFeed";
import "./styles.css";

function Log() {
  const ANSWER_OPTIONS = ["All answers", "Correct Only", "Incorrect Only"];
  return (
    <Card className="log-book">
      <p className="bp3-heading">
        ANSWER LOG&nbsp;
        <Icon
          icon="refresh"
          iconSize="13"
          htmlTitle="Refresh Log"
          className="log-refresh-icon"
        />
      </p>
      <ControlGroup fill>
        <Button icon="filter" text="Filter" />
        <HTMLSelect options={ANSWER_OPTIONS} />
        <InputGroup placeholder="Filter by team" />
        <InputGroup placeholder="Filter by response" />
        <Button text="Apply" />
        <Button text="Reset All Filters" icon="reset" />
      </ControlGroup>
      <pre className="bp3-code-block log-container">
        <code className="bp3-code">
          <p className="log-record bp3-text-large">
            <span className="log-record-timestamp">TimeStamp</span>
            <span className="log-record-teamname">TeamName</span>
            <span className="log-record-username">Username</span>
            <span className="log-record-answer">Response</span>
            <span className="log-record-level">Stage</span>
          </p>
          <LogFeed
            team="adaephonben"
            user="AdaephonBen"
            answer="Hugeanswer"
            timestamp="12:34:48"
            level="Stage 2.1"
            correct="true"
          />
          <LogFeed
            team="adaephonben"
            user="AdaephonBen"
            answer="Hugeanswer"
            timestamp="12:34:48"
            level="Stage 2.1"
            correct="true"
          />
          <LogFeed
            team="adaephonben"
            user="AdaephonBen"
            answer="largeranswer"
            timestamp="12:34:48"
            level="Stage 2.1"
            correct="false"
          />
          <LogFeed
            team="adaephonben"
            user="AdaephonBen"
            answer="largeranswer"
            timestamp="12:34:48"
            level="Stage 2.1"
            correct="false"
          />
        </code>
      </pre>
    </Card>
  );
}

export default Log;
