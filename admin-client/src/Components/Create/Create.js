import React from "react";
import {
  Card,
  Button,
  FormGroup,
  InputGroup,
  Elevation,
} from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import "./styles.css";

function Create() {
  return (
    <Card elevation={Elevation.THREE} className="start-box">
      <h3 className="bp3-heading">Create a new OTH</h3>
      <FormGroup
        helperText="Build your Brand Name"
        label="OTH Name"
        labelFor="text-input"
        labelInfo="required"
      >
        <InputGroup placeholder="cryptex" required />
      </FormGroup>
      <FormGroup
        helperText="When the action starts"
        label="OTH Start Time"
        className="start-date-box"
      >
        <DateInput
          formatDate={(date) => date.toLocaleDateString()}
          parseDate={(str) => new Date(str)}
          defaultValue={new Date()}
          minDate={new Date()}
          fill
        />
      </FormGroup>
      <a href="/manage">
        <Button className="bp3-intent-primary" type="submit">
          Create
        </Button>
      </a>
    </Card>
  );
}

export default Create;
