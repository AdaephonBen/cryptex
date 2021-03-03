import React, { useEffect, useState } from "react";
import LevelImage from "./level-image";
import "./styles.css";
import {
  Flex,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";
import { callApi } from "../../api/auth";

const API_URL = process.env.REACT_APP_API_URL;

const Level = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hint, setHint] = useState("");
  const { question, getAccessTokenSilently, setAnswers } = props;
  const [lifelines, setLifelines] = useState([]);
  let currentLevel;
  if (question.question_type === 1) {
    currentLevel = (
      <LevelImage
        question={question}
        getAccessTokenSilently={getAccessTokenSilently}
        setAnswers={setAnswers}
      />
    );
  }

  useEffect(() => {
    const getQuestions = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      });
      const res = await callApi(accessToken, `${API_URL}lifeline`, {
        fetchOptions: {
          method: "GET",
        },
      });
      console.log(res);
      if (res === null) {
      } else {
        setLifelines(res);
      }
    };
    getQuestions();
  }, []);

  const consumeLifeline = async (lifeline) => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUDIENCE,
      scope: "read:current_user update:current_user_metadata",
    });
    const res = await callApi(accessToken, `${API_URL}lifeline`, {
      fetchOptions: {
        method: "POST",
        body: JSON.stringify({
          lifeline: lifeline,
        }),
      },
    });
    console.log(res);
    if (res === null) {
    } else {
      if (lifeline === "Skip Question") {
        window.location.reload();
      } else {
        setHint(res);
        onOpen();
      }
    }
  };

  return (
    <Flex direction="column" className="level" padding="20px">
      <Text>
        Available Lifelines:
        {lifelines.map((lifeline) => (
          <Button
            colorScheme="blue"
            ml="10px"
            onClick={() => consumeLifeline(lifeline)}
          >
            {lifeline}
          </Button>
        ))}
      </Text>
      {currentLevel}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You've successfully used your Lifeline to gain an unreleased hint to
            this question. Please save this hint somewhere since you won't be
            able to access it after closing this dialog. The hint is: <br />
            {hint}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Level;
