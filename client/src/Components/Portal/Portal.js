import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Flex, IconButton, Tooltip, Text } from "@chakra-ui/react";
import { FaTable, FaStopwatch, FaInfo, FaHistory } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
import Level from "../Question/index";
import MiniLeaderboard from "../MiniLeaderboard/MiniLeaderboard";
import CountdownTimer from "../CountdownTimer/Countdown";
import Hints from "../Hints/Hints";
import { callApi } from "../../api/auth";
import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../LoadingPage/Loading";
import History from "../History/History";

// const MotionFlex = motion.custom(Flex);
const API_URL = process.env.REACT_APP_API_URL;

const Portal = () => {
  const history = useHistory();
  const [isCountdownTimerOpen, setisCountdownTimerOpen] = useState(true);
  const [isLeaderboardOpen, setisLeaderboardOpen] = useState(true);
  const [isHintsOpen, setisHintsOpen] = useState(true);
  const [isHistoryOpen, setisHistoryOpen] = useState(true);

  const toggleLeaderboard = () => {
    setisLeaderboardOpen(!isLeaderboardOpen);
  };

  const { getAccessTokenSilently } = useAuth0();

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
      });
      const res = await callApi(accessToken, `${API_URL}question`, {
        fetchOptions: {
          method: "POST",
        },
      });
      if (res !== null) {
        history.push("/portal");
      }
    };
    getUser();
  }, []);

  return (
    <Flex
      className="portal-page"
      height={{ base: "none", md: "100vh", lg: "100vh" }}
      flexDir="column"
      maxHeight={{ base: "none", md: "100vh", lg: "100vh" }}
    >
      <Flex className="portal" flexGrow={1} overflowY="auto">
        <Flex
          className="sidebar-toggle"
          flexDirection="column"
          ml="5px"
          mr="5px"
        >
          <Tooltip
            label={
              isLeaderboardOpen
                ? "Hide the Leaderboard"
                : "Show the Leaderboard"
            }
          >
            <IconButton
              colorScheme={isLeaderboardOpen ? "gray" : ""}
              size="sm"
              icon={<FaTable />}
              onClick={() => toggleLeaderboard()}
              style={{
                color: "#FFD500",
              }}
            />
          </Tooltip>
          <Tooltip
            label={
              isCountdownTimerOpen
                ? "Hide the Countdown Timer"
                : "Show the Countdown Timer"
            }
          >
            <IconButton
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
                maxHeight: "100%",
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
                flexGrow="1"
                //overflowY= {{base:"visible",lg:"auto"}}

                flexDirection={{
                  base: "column-reverse",
                  md: "row",
                  lg: "row",
                }}
              >
                {/* <AnimatePresence> */}
                {isLeaderboardOpen && (
                  // <MotionFlex
                  //   exit={{
                  //     opacity: 0,
                  //     height: 0,
                  //     x: "-100vw",
                  //   }}
                  //   initial={{
                  //     opacity: 0,
                  //     height: 0,
                  //     x: "-100vw",
                  //   }}
                  //   animate={{
                  //     opacity: 1,
                  //     height: "auto",
                  //     x: 0,
                  //   }}
                  //   transition={{
                  //     ease: "easeIn",
                  //     duration: 0.3,
                  //   }}
                  // >
                  <MiniLeaderboard />
                  // </MotionFlex>
                )}
                {/* </AnimatePresence> */}
                <Level />
              </Flex>
              <Flex
                className="second-row"
                flexDirection={{ base: "column", md: "row", lg: "row" }}
              >
                {/* <AnimatePresence> */}
                {isCountdownTimerOpen && (
                  // <MotionFlex
                  //   exit={{
                  //     opacity: 0,
                  //     height: 0,
                  //     x: "-100vw",
                  //   }}
                  //   initial={{
                  //     opacity: 0,
                  //     height: 0,
                  //     x: "-100vw",
                  //   }}
                  //   animate={{
                  //     opacity: 1,
                  //     height: "auto",
                  //     x: 0,
                  //   }}
                  //   transition={{
                  //     ease: "easeIn",
                  //     duration: 0.3,
                  //   }}
                  // >
                  <CountdownTimer />
                  // </MotionFlex>
                )}
                {/* </AnimatePresence> */}
                {/* <AnimatePresence> */}
                {isHintsOpen && (
                  // <MotionFlex
                  //   exit={{
                  //     opacity: 0,
                  //     height: 0,
                  //     x: "100vw",
                  //   }}
                  //   initial={{
                  //     opacity: 0,
                  //     height: 0,
                  //     x: "100vw",
                  //   }}
                  //   animate={{
                  //     opacity: 1,
                  //     height: "auto",
                  //     x: 0,
                  //   }}
                  //   transition={{
                  //     ease: "easeIn",
                  //     duration: 0.3,
                  //   }}
                  //   flexGrow="1"
                  // >
                  <Hints />
                  // </MotionFlex>
                )}
                {/* </AnimatePresence> */}
              </Flex>
            </Flex>
            {isHistoryOpen && (
              <Flex
                flexDirection="column"
                // flexGrow="1"
                style={{
                  minHeight: "100%",
                  maxHeight: "100%",
                  maxWidth: "15vw",
                  minWidth: "15vw",
                }}
                flexBasis="10%"
                justifyContent="space-between"
              >
                <History />
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Portal;
