import React from "react";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/Landing";
import Level from "../Levels/index";
import MiniLeaderboard from "../MiniLeaderboard/MiniLeaderboard";
import CountdownTimer from "../CountdownTimer/Countdown";
import Hints from "../Hints/Hints";
import { Flex, IconButton, Tooltip } from "@chakra-ui/core";
import { FaTable, FaStopwatch, FaInfo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const MotionFlex = motion.custom(Flex);

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
    this.setState({ isLeaderboardOpen: !this.state.isLeaderboardOpen });
  }

  toggleTimer() {
    this.setState({ isCountdownTimerOpen: !this.state.isCountdownTimerOpen });
  }

  toggleHints() {
    this.setState({ isHintsOpen: !this.state.isHintsOpen });
  }

  render() {
    return (
      <div className="portal-page">
        <Navbar />
        <Flex className="portal">
          <Flex
            className="sidebar-toggle"
            flexDirection="column"
            marginRight="10px"
          >
            <Tooltip
              label={
                this.state.isLeaderboardOpen
                  ? "Hide the Leaderboard"
                  : "Show the Leaderboard"
              }
            >
              <IconButton
                variantColor={this.state.isLeaderboardOpen ? "blue" : "green"}
                size="md"
                icon={FaTable}
                onClick={() => this.toggleLeaderboard()}
              />
            </Tooltip>
            <Tooltip
              label={
                this.state.isCountdownTimerOpen
                  ? "Hide the Countdown Timer"
                  : "Show the Countdown Timer"
              }
            >
              <IconButton
                variantColor={
                  this.state.isCountdownTimerOpen ? "blue" : "green"
                }
                size="md"
                icon={FaStopwatch}
                onClick={() => this.toggleTimer()}
              />
            </Tooltip>
            <Tooltip
              label={this.state.isHintsOpen ? "Hide Hints" : "Show Hints"}
            >
              <IconButton
                variantColor={this.state.isHintsOpen ? "blue" : "green"}
                size="md"
                icon={FaInfo}
                onClick={() => this.toggleHints()}
              />
            </Tooltip>
          </Flex>
          <Flex flexDirection="column" flexGrow="1">
            <Flex className="first-row">
              <AnimatePresence>
                {this.state.isLeaderboardOpen && (
                  <MotionFlex
                    exit={{ opacity: 0, height: 0, x: "-100vw" }}
                    initial={{ opacity: 0, height: 0, x: "-100vw" }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                  >
                    <MiniLeaderboard />
                  </MotionFlex>
                )}
              </AnimatePresence>
              <Level />
            </Flex>
            <Flex className="second-row">
              <AnimatePresence>
                {this.state.isCountdownTimerOpen && (
                  <MotionFlex
                    exit={{ opacity: 0, height: 0, x: "-100vw" }}
                    initial={{ opacity: 0, height: 0, x: "-100vw" }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                  >
                    <CountdownTimer />
                  </MotionFlex>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {this.state.isHintsOpen && (
                  <MotionFlex
                    exit={{ opacity: 0, height: 0, x: "100vw" }}
                    initial={{ opacity: 0, height: 0, x: "100vw" }}
                    animate={{ opacity: 1, height: "auto", x: 0 }}
                    transition={{ ease: "easeIn", duration: 0.3 }}
                    flexGrow="1"
                  >
                    <Hints />
                  </MotionFlex>
                )}
              </AnimatePresence>
            </Flex>
          </Flex>
        </Flex>
      </div>
    );
  }
}
