import React, { useEffect, useState } from "react";
import {
  Flex,
  useToast,
  Heading,
  Stack,
  Text,
  Badge,
  AspectRatio,
  Image,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { callApi } from "../../api/auth";
import "./styles.css";
import { useHistory } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Lifelines = (props) => {
  const { getAccessTokenSilently } = props;
  const [bonusQuestions, setBonusQuestions] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      });
      const res = await callApi(accessToken, `${API_URL}question/bonus`, {
        fetchOptions: {
          method: "GET",
        },
      });
      console.log(res);
      if (res === null) {
        // history.push("/register");
      } else {
        setBonusQuestions(res);
      }
    };
    getQuestions();
  }, []);
  return (
    <div className="landing">
      <Flex
        align="center"
        justifyContent="space-between"
        className="center-box"
        flexDirection="column"
      >
        <Heading className="title">Lifelines</Heading>
        <Stack spacing={8} minWidth="80vw"></Stack>
      </Flex>
    </div>
  );
};

export default Lifelines;
