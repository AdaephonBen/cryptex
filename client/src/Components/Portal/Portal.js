import React from "react";
import { Flex, IconButton, Tooltip } from "@chakra-ui/core";
import { FaTable, FaStopwatch, FaInfo, FaHistory } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Level from "../Question/index";
import MiniLeaderboard from "../MiniLeaderboard/MiniLeaderboard";
import CountdownTimer from "../CountdownTimer/Countdown";
import Hints from "../Hints/Hints";
import History from "../History/History";
import "./styles.css";

// const MotionFlex = motion.custom(Flex);

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCountdownTimerOpen: true,
      isLeaderboardOpen: true,
        isHintsOpen: true,
      isHistoryOpen: true,
      isSidebarOpen: false,
    };
  }

  toggleLeaderboard() {
    const { isLeaderboardOpen } = this.state;
    this.setState({ isLeaderboardOpen: !isLeaderboardOpen });
  }

  toggleTimer() {
    const { isCountdownTimerOpen } = this.state;
    this.setState({ isCountdownTimerOpen: !isCountdownTimerOpen });
  }

  toggleHints() {
    const { isHintsOpen } = this.state;
    this.setState({ isHintsOpen: !isHintsOpen });
  }

  toggleHistory() {
    const { isHistoryOpen } = this.state;
    this.setState({ isHistoryOpen: !isHistoryOpen });
  }

  toggleSidebar() {
    const { isSidebarOpen } = this.state;
    this.setState({ isSidebarOpen: !isSidebarOpen });
  }

  render() {
    const {
      isLeaderboardOpen,
      isCountdownTimerOpen,
      isHintsOpen,
      isHistoryOpen,
      isSidebarOpen,
    } = this.state;
    return (
      <Flex
        className="portal-page"
        height="100vh"
        flexDir="column"
        maxHeight="100vh"
      >
        <Navbar
          toggleSidebar={() => {
            this.toggleSidebar();
          }}
          isSidebarOpen={isSidebarOpen}
        />
        <Flex className="portal" flexGrow={1} overflowY="auto">
          {isSidebarOpen && (
            <Flex
              className="sidebar-toggle"
              flexDirection="column"
              ml="10px"
              mr="10px"
            >
              <Tooltip
                label={
                  isLeaderboardOpen
                    ? "Hide the Leaderboard"
                    : "Show the Leaderboard"
                }
              >
                <IconButton
                  variantColor={isLeaderboardOpen ? "blue" : "green"}
                  size="sm"
                  icon={FaTable}
                  onClick={() => this.toggleLeaderboard()}
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
                  variantColor={isCountdownTimerOpen ? "blue" : "green"}
                  size="sm"
                  icon={FaStopwatch}
                  onClick={() => this.toggleTimer()}
                />
              </Tooltip>
              <Tooltip label={isHintsOpen ? "Hide Hints" : "Show Hints"}>
                <IconButton
                  variantColor={isHintsOpen ? "blue" : "green"}
                  size="sm"
                  icon={FaInfo}
                  onClick={() => this.toggleHints()}
                />
              </Tooltip>
              <Tooltip label={isHistoryOpen ? "Hide History" : "Show History"}>
                <IconButton
                  variantColor={isHistoryOpen ? "blue" : "green"}
                  size="sm"
                  icon={FaHistory}
                  onClick={() => this.toggleHistory()}
                />
              </Tooltip>
            </Flex>
          )}
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
            <Flex overflowY="auto" flexGrow="1">
              <Flex
                flexDirection="column"
                style={{
                  minHeight: "100%",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
                justifyContent="space-between"
                flexGrow="1"
              >
                <Flex
                  className="first-row"
                  flexGrow="1"
                  style={{
                    overflowY: "auto",
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
                <Flex className="second-row">
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
                    maxWidth: "25vw",
                    minWidth: "25vw",
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
  }
}
