import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { FaTable, FaStopwatch, FaInfo, FaHistory } from "react-icons/fa";
import Level from "../Question/index";
import MiniLeaderboard from "../MiniLeaderboard/MiniLeaderboard";
import CountdownTimer from "../CountdownTimer/Countdown";
import Hints from "../Hints/Hints";
import { callApi } from "../../api/auth";
import "./styles.css";
import Loading from "../LoadingPage/Loading";
import History from "../History/History";
import { withAuthenticationRequired } from "@auth0/auth0-react";

const API_URL = process.env.REACT_APP_API_URL;

const Portal = (props) => {
  const { history, getAccessTokenSilently, setisAscii } = props;
  const [isCountdownTimerOpen, setisCountdownTimerOpen] = useState(true);
  const [isLeaderboardOpen, setisLeaderboardOpen] = useState(true);
  const [isHintsOpen, setisHintsOpen] = useState(true);
  const [isHistoryOpen, setisHistoryOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);

  const toggleLeaderboard = () => {
    setisLeaderboardOpen(!isLeaderboardOpen);
  };

  const toggleTimer = () => {
    setisCountdownTimerOpen(!isCountdownTimerOpen);
  };
  const toggleHints = () => {
    setisHintsOpen(!isHintsOpen);
  };

  const toggleHistory = () => {
    setisHistoryOpen(!isHistoryOpen);
  };

  useEffect(() => {
    const getUser = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "read:current_user update:current_user_metadata",
      });
      const res = await callApi(accessToken, `${API_URL}question`, {
        fetchOptions: {
          method: "GET",
        },
      });
      console.log(res);
      if (res === null) {
        history.push("/register");
      } else {
        setQuestion(res);
        setIsLoading(false);
      }
    };
    getUser();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex className="portal-page" flexDir="column">
      <Flex className="portal" flexGrow={1} overflowY="auto">
        <Flex
          className="sidebar-toggle"
          display={{ base: "none", md: "flex", lg: "flex" }}
          flexDirection="column"
          mr="5px"
        >
          <Tooltip
            display={{ base: "none", md: "flex", lg: "flex" }}
            label={
              isLeaderboardOpen
                ? "Hide the Leaderboard"
                : "Show the Leaderboard"
            }
          >
            <IconButton
              colorScheme={isLeaderboardOpen ? "gray" : ""}
              display={{ base: "none", md: "flex", lg: "flex" }}
              size="sm"
              icon={<FaTable />}
              onClick={() => toggleLeaderboard()}
              style={{
                color: "#FFD500",
              }}
            />
          </Tooltip>
          <Tooltip
            display={{ base: "none", md: "flex", lg: "flex" }}
            label={
              isCountdownTimerOpen
                ? "Hide the Countdown Timer"
                : "Show the Countdown Timer"
            }
          >
            <IconButton
              display={{ base: "none", md: "none", lg: "flex" }}
              size="sm"
              colorScheme={isCountdownTimerOpen ? "gray" : ""}
              icon={<FaStopwatch />}
              onClick={() => toggleTimer()}
              style={{
                color: "#FFD500",
              }}
            />
          </Tooltip>
          <Tooltip label={isHintsOpen ? "Hide Hints" : "Show Hints"}>
            <IconButton
              size="sm"
              icon={<FaInfo />}
              colorScheme={isHintsOpen ? "gray" : ""}
              style={{
                color: "#FFD500",
              }}
              onClick={() => toggleHints()}
            />
          </Tooltip>
          <Tooltip label={isHistoryOpen ? "Hide History" : "Show History"}>
            <IconButton
              size="sm"
              display={{ base: "none", md: "flex", lg: "flex" }}
              colorScheme={isHistoryOpen ? "gray" : ""}
              icon={<FaHistory />}
              onClick={() => toggleHistory()}
              style={{
                color: "#FFD500",
              }}
            />
          </Tooltip>
        </Flex>
        <Flex
          flexDirection="column"
          flexGrow="1"
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            maxWidth: "100%",
          }}
          justifyContent="space-between"
        >
          <Flex
            overflowY="auto"
            flexGrow="1"
            flexDirection={{ base: "column", md: "column", lg: "row" }}
          >
            <Flex
              flexDirection="column"
              style={{
                minHeight: "100%",
                maxHeight: "calc(100vh - 200px)",
              }}
              maxWidth={{
                base: "none",
                md: "none",
                lg: "100%",
              }}
              justifyContent="space-between"
              flexGrow="1"
            >
              <Flex
                className="first-row"
                minHeight="0px"
                flex="1"
                flexBasis="40%"
                flexDirection={{
                  base: "column-reverse",
                  md: "row",
                  lg: "row",
                }}
              >
                {isLeaderboardOpen && <MiniLeaderboard />}
              </Flex>
              <Flex
                className="second-row"
                minHeight="0px"
                flex="none"
                flexDirection={{ base: "column", md: "row", lg: "row" }}
              >
                {isCountdownTimerOpen && <CountdownTimer />}
                {isHintsOpen && (
                  <Hints QuestionNumber={question.question_number} />
                )}
              </Flex>
            </Flex>
            {isHistoryOpen && (
              <Flex
                flexDirection="column"
                style={{
                  minHeight: "100%",
                  maxHeight: "100%",
                  maxWidth: "15vw",
                  minWidth: "15vw",
                }}
                flexBasis="10%"
                justifyContent="space-between"
                display={{ base: "none", md: "none", lg: "flex" }}
              >
                <History answers={answers} setAnswers={setAnswers} />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default withRouter(
  withAuthenticationRequired(Portal, {
    onRedirecting: () => <Loading />,
  })
);
