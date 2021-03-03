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

const LevelImage = (props) => {
  const history = useHistory();
  const toast = useToast();
  const { question, getAccessTokenSilently } = props;
  const { url } = question.bonus_question;
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
    const res = await callApi(accessToken, `${API_URL}question/bonus`, {
      fetchOptions: {
        method: "POST",
        body: JSON.stringify({
          answer: answer,
          bonus_question_id: question.bonus_question_id,
        }),
      },
    });
    if (res == "correct-answer") {
      toast({
        title: "Correct answer",
        status: "success",
        duration: 3000,
      });
      setTimeout(() => {
        history.push("/portal");
      }, 3000);
    } else {
      setIsIncorrect(true);
      // setAnswers((old) => [...old, answer]);
    }
  };
  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <AspectRatio width="600px" ratio={16 / 9}>
        <Image src={url} />
      </AspectRatio>
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
  );
};

const BonusQuestion = (question, getAccessTokenSilently) => {
  return (
    <Flex direction="column" border="1px solid white" padding="10px">
      <Text marginY="10px" textAlign="center">
        This bonus question will be available until{" "}
        {new Date(question.available_to).toLocaleString()} and will unlock the
        lifeline <Badge colorScheme="green">{question.lifeline}</Badge>. It is
        effective for Questions {question.initial_question} -{" "}
        {question.final_question}.
      </Text>
      <LevelImage
        question={question}
        getAccessTokenSilently={getAccessTokenSilently}
      />
    </Flex>
  );
};

const BonusQuestions = (props) => {
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
        <Heading className="title">Bonus Questions</Heading>
        <Stack spacing={8} minWidth="80vw">
          {bonusQuestions.map((question) =>
            BonusQuestion(question, getAccessTokenSilently)
          )}
        </Stack>
      </Flex>
    </div>
  );
};

export default BonusQuestions;
