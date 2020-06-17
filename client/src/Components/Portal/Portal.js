import React from "react";
import { Flex, IconButton, Tooltip } from "@chakra-ui/core";
import { FaTable, FaStopwatch, FaInfo } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import Level from "../Levels/index";
import MiniLeaderboard from "../MiniLeaderboard/MiniLeaderboard";
import CountdownTimer from "../CountdownTimer/Countdown";
import Hints from "../Hints/Hints";
import "./styles.css";

// const MotionFlex = motion.custom(Flex);

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCountdownTimerOpen: true,
      isLeaderboardOpen: true,
      isHintsOpen: true,
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

  render() {
    const { isLeaderboardOpen, isCountdownTimerOpen, isHintsOpen } = this.state;
    return (
      <Flex className="portal-page" height="100%" flexDir="column">
        <Navbar />
        <Flex className="portal" flex="1 1 auto">
          <Flex
            className="sidebar-toggle"
            flexDirection="column"
            marginRight="10px"
            justify="center"
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
                size="md"
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
                size="md"
                icon={FaStopwatch}
                onClick={() => this.toggleTimer()}
              />
            </Tooltip>
            <Tooltip label={isHintsOpen ? "Hide Hints" : "Show Hints"}>
              <IconButton
                variantColor={isHintsOpen ? "blue" : "green"}
                size="md"
                icon={FaInfo}
                onClick={() => this.toggleHints()}
              />
            </Tooltip>
          </Flex>
          <Flex
            flexDirection="column"
            flexGrow="1"
            style={{ minHeight: "100%" }}
            justifyContent="space-between"
          >
            <Flex className="first-row" flexGrow="1">
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
        </Flex>
      </Flex>
    );
  }
}
