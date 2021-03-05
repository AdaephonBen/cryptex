import React, { useEffect, useState } from "react";
import { Flex, Heading, Stack, Image, Text } from "@chakra-ui/react";
import { callApi } from "../../api/auth";
import "./styles.css";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../LoadingPage/Loading";

const API_URL = process.env.REACT_APP_API_URL;

const LevelImage = (props) => {
  const { question } = props;
  const { url } = question.question;
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        justifyContent="center"
        flex="1"
        minHeight="200px"
      >
        <Text marginBlock="10px">
          {" "}
          Question Number: {question.question_number}{" "}
        </Text>
        <Image src={url} minHeight="200px" maxHeight="400px" />
      </Flex>
    </Flex>
  );
};

const PreviousQuestion = (question) => {
  return (
    <Flex direction="column" border="1px solid white" padding="10px">
      <LevelImage question={question} />
    </Flex>
  );
};

const PreviousQuestions = (props) => {
  const { getAccessTokenSilently } = props;
  const [previous, setPrevious] = useState([]);
  useEffect(() => {
    const getQuestions = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      });
      const res = await callApi(accessToken, `${API_URL}question/previous`, {
        fetchOptions: {
          method: "GET",
        },
      });
      console.log(res);
      if (res === null) {
        // history.push("/register");
      } else {
        setPrevious(res);
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
        <Heading className="title">Previous Questions</Heading>
        <Stack spacing={8} minWidth="80vw">
          {previous.map((question) => PreviousQuestion(question))}
        </Stack>
      </Flex>
    </div>
  );
};

export default withAuthenticationRequired(PreviousQuestions, {
  onRedirecting: () => <Loading />,
});
