import React, { useState } from "react";
import {
  Flex,
  FormControl,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { callApi } from "../../api/auth";
import { FaAngleRight } from "react-icons/fa";
import { motion } from "framer-motion";

const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 2.5,
      duration: 5,
    },
  }),
  hidden: { opacity: 0 },
};

const API_URL = process.env.REACT_APP_API_URL;

const LevelTextAnimation = (props) => {
  const { question, getAccessTokenSilently, setAnswers } = props;
  const { text } = question.question;
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
      <Flex justifyContent="center" minHeight="200px" direction="column">
        {text.map((item, i) => (
          <motion.div
            custom={i}
            animate="visible"
            initial="hidden"
            variants={variants}
          >
            {item}
          </motion.div>
        ))}
      </Flex>
      <Flex
        minHeight="0px"
        width="80%"
        justifyContent="space-between"
        marginTop="30px"
        alignItems="center"
        alignSelf="center"
      >
        <form
          style={{
            display: "flex",
            width: "75%",
            justifyContent: "space-between",
            alignSelf: "center",
            margin: "auto",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl id="answer" isInvalid={isIncorrect}>
            <InputGroup
              alignSelf="center"
              display="flex"
              margin="auto"
              padding="auto"
            >
              <Input
                type="text"
                size="sm"
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <InputRightElement>
                <IconButton
                  mt={4}
                  colorScheme="gray"
                  type="submit"
                  size="md"
                  aria-label="Submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  icon={<FaAngleRight />}
                  marginBottom="15px"
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>
              Incorrect Answer. Please try again.
            </FormErrorMessage>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};

export default LevelTextAnimation;
