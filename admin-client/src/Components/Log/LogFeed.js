import React from "react";
import "./styles.css";

function LogFeed(item) {
  let correctClass = "log-record-answer incorrect";
  if (item.correct === "true") correctClass = "log-record-answer correct";
  return (
    <p className="log-record bp3-text-large">
      <span className="log-record-timestamp">{item.timestamp}</span>
      <span className="log-record-teamname">{item.team}</span>
      <span className="log-record-username">{item.user}</span>
      <span className={correctClass}>{item.answer}</span>
      <span className="log-record-level">{item.level}</span>
    </p>
  );
}

export default LogFeed;
