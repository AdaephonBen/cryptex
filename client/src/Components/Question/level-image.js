import React, { useState } from "react";
import {
  Flex,
  AspectRatio,
  Image,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { callApi } from "../../api/auth";

const API_URL = process.env.REACT_APP_API_URL;

const LevelImage = (props) => {
  const { question, getAccessTokenSilently, setAnswers } = props;
  const { url } = question.question;
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUDIENCE,
      scope: "read:current_user update:current_user_metadata",
    });
    const res = await callApi(accessToken, `${API_URL}question`, {
      fetchOptions: {
        method: "POST",
        body: JSON.stringify({
          answer: answer,
        }),
      },
    });
    if (res == "correct-answer") {
      document.location.reload();
    } else {
      setIsIncorrect(true);
      setAnswers((old) => [...old, answer]);
    }
  };
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      minHeight="0px"
    >
      <Flex justifyContent="center" flex="1" minHeight="200px">
        <Image src={url} minHeight="200px" />
      </Flex>
      <Flex flex="1" minHeight="0px">
        <form
          style={{
            marginTop: "30px",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl id="answer" isInvalid={isIncorrect}>
            <Input
              type="text"
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <FormErrorMessage>Incorrect Answer :(</FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            width="100%"
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default LevelImage;
