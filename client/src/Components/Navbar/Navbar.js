import React, { ReactPropTypes } from "react";
import { Box, Heading, Flex, Text, Link } from "@chakra-ui/core";
import "./styles.css";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

MenuItems.propTypes = {
  children: ReactPropTypes.string,
};

MenuItems.defaultProps = {
  children: "Link",
};

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      showNavbar: false,
    };
  }

  handleToggle() {
    const { showNavbar } = this.state;
    this.setState({ showNavbar: !showNavbar });
  }

  render() {
    const { showNavbar } = this.state;
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="0.6rem 1.5rem"
        bg="#212837"
        color="white"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" className="title">
            CRYPTEX
          </Heading>
        </Flex>

        <Box display={["block", "none"]} onClick={() => this.handleToggle()}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={[showNavbar ? "block" : "none", "flex"]}
          width={["full", "auto"]}
          alignItems="center"
          flexGrow={1}
          justifyContent="right"
        >
          <MenuItems>
            <Link href="https://discord.gg" isExternal className="navbar-link">
              Forum
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="/leaderboard" className="navbar-link">
              Leaderboard
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="google.com" className="navbar-link">
              Rules
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="google.com" className="navbar-link">
              Levels
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="https://google.com" className="navbar-link">
              Sign Out
            </Link>
          </MenuItems>
        </Box>
      </Flex>
    );
  }
}
