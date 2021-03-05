import React, { useState } from "react";
import {
  Flex,
  Text,
  FormControl,
  InputGroup,
  IconButton,
  InputRightElement,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { callApi } from "../../api/auth";
import { FaAngleRight } from "react-icons/fa";
import * as Tone from "tone";
import "./styles.css";

const API_URL = process.env.REACT_APP_API_URL;

const LevelGrid = (props) => {
  const { question, getAccessTokenSilently, setAnswers } = props;
  const { quote } = question.question;
  const [answer, setAnswer] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [synth, setSynth] = useState(null);
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
  const playNote = (note) => {
    if (synth) {
      synth.triggerAttackRelease(note, 0.5);
      console.log("Hello");
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
      <Flex
        direction="column"
        justifyContent="center"
        flex="1"
        minHeight="200px"
        marginTop="5px"
      >
        <Button
          size="md"
          style={{ display: isVisible ? "none" : "block" }}
          colorScheme="blue"
          padding="10px"
          onClick={async () => {
            setIsVisible(true);
            await Tone.start();
            setSynth(new Tone.PolySynth().toDestination());
          }}
        >
          Show Question
        </Button>
        <table
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            display: isVisible ? "block" : "none",
          }}
        >
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td onMouseOver={() => playNote(["A4", "C#4", "E4"])}></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td onMouseOver={() => playNote(["G4", "B4", "D4"])}></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td onMouseOver={() => playNote(["F#4", "A#4", "C#4"])}></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td onMouseOver={() => playNote(["F4", "A4", "C4"])}></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td onMouseOver={() => playNote(["D4", "F#4", "A4"])}></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td onMouseOver={() => playNote(["C4", "E4", "G4"])}></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
          </tr>
        </table>
      </Flex>
      <Flex flex="1" minHeight="0px" marginTop="10px">
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
        
            <FormErrorMessage>Incorrect Answer. Please try again.</FormErrorMessage>
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

export default LevelGrid;
