import React, { useState } from "react";
import { Flex, Text, Link, Tooltip } from "@chakra-ui/react";
import { FaSyncAlt } from "react-icons/fa";
import HintsList from "./HintsList";
import "./styles.css";

const Hints = (props) => {
  const [reload, setReload] = useState(false);
  return (
    <Flex className="hints" paddingTop="20px" flexDirection="column">
      <Flex className="hints-header" justifyContent="space-between">
        <Text className="hints-title">Hints</Text>
        <Flex className="hints-buttons">
          <Tooltip label="Refresh hints">
            <Link onClick={() => setReload(!reload)} className="icon-button">
              <FaSyncAlt />
            </Link>
          </Tooltip>
        </Flex>
      </Flex>
      <HintsList QuestionNumber={props.QuestionNumber} reload={reload} />
    </Flex>
  );
};

export default Hints;
