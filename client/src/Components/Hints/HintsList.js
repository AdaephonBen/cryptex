import React, { useState, useEffect } from "react";
import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import "./styles.css";
import Loading from "../LoadingPage/Loading";

const API_URL = process.env.REACT_APP_API_URL;

const HintsList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hints, setHints] = useState([]);

  useEffect(() => {
    const getHints = async () => {
      const res = await fetch(`${API_URL}hint`, {
        method: "POST",
        body: JSON.stringify({
          question_number: props.QuestionNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setHints(json);
      setIsLoading(false);
    };
    getHints();
    const refresh = setInterval(() => getHints(), 5000);
    return () => clearInterval(refresh);
  }, [props.reload]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <List spacing={1} className="hints-list" padding="15px">
      {hints &&
        hints.map((hint) => (
          <ListItem>
            <ListIcon as={MdCheckCircle} color="green.500" />
            {hint}
          </ListItem>
        ))}
    </List>
  );
};

export default HintsList;
