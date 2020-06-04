import React from "react";
import Navbar from "../Navbar/Navbar";
import LandingPage from "../LandingPage/Landing";
import Level from "../Levels/index";
import MiniLeaderboard from "../MiniLeaderboard/MiniLeaderboard";
import CountdownTimer from "../CountdownTimer/Countdown";
import Hints from "../Hints/Hints";
import { Flex, IconButton } from "@chakra-ui/core";
import { FaTable, FaStopwatch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const MotionFlex = motion.custom(Flex);

export default class Portal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCountdownTimerOpen: true,
      isLeaderboardOpen: true,
    };
  }
  toggleLeaderboard() {
    this.setState({ isLeaderboardOpen: !this.state.isLeaderboardOpen });
  }

  toggleTimer() {
    this.setState({ isCountdownTimerOpen: !this.state.isCountdownTimerOpen });
  }

  render() {
    return (
      <div>
        {/* <LandingPage /> */}
        <Navbar />
        <Flex className="portal">
          <Flex
            className="sidebar-toggle"
            flexDirection="column"
            marginRight="10px"
          >
            <IconButton
              variantColor={this.state.isLeaderboardOpen ? "blue" : "green"}
              size="md"
              icon={FaTable}
              onClick={() => this.toggleLeaderboard()}
            />
            <IconButton
              variantColor={this.state.isCountdownTimerOpen ? "blue" : "green"}
              size="md"
              icon={FaStopwatch}
              onClick={() => this.toggleTimer()}
            />
          </Flex>
          <Flex className="first-column" flexDirection="column">
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
          </Flex>
          <Flex className="second-row" flexDirection="column" flexGrow="1">
            <Level />
            <Hints />
          </Flex>
        </Flex>
      </div>
    );
  }
}
