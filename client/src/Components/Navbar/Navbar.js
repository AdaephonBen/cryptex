import React from "react";
import PropTypes from "prop-types";
import {
  Tooltip,
  IconButton,
  Flex,
  Text,
  Link,
  Heading,
} from "@chakra-ui/core";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

MenuItems.propTypes = {
  children: PropTypes.string,
};

MenuItems.defaultProps = {
  children: "Link",
};

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
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
    const { isSidebarOpen, toggleSidebar } = this.props;
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        marginTop="20px"
        paddingBottom="1rem"
        ml="10px"
        bg="#212837"
        color="white"
        flex="0 1 auto"
      >
        <Flex flex="1 0 0">
          <Tooltip label={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}>
            <IconButton
              variantColor={isSidebarOpen ? "blue" : "green"}
              size="md"
              icon={isSidebarOpen ? FaTimes : FaBars}
              onClick={toggleSidebar}
            />
          </Tooltip>
        </Flex>

        <Flex>
          <Heading as="h1" size="lg" className="title">
            CRYPTEX
          </Heading>
        </Flex>

        {/* <Box display={["block", "none"]} onClick={() => this.handleToggle()}>
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box> */}

        <Flex
          display={[showNavbar ? "block" : "none", "flex"]}
          // width={["full", "full"]}
          // alignItems="center"
          flex="1 0 0"
          justifyContent="flex-end"
        >
          <MenuItems>
            <Link href="google.com" isExternal className="navbar-link">
              Forum
            </Link>
          </MenuItems>
          <MenuItems>
            <Link href="google.com" className="navbar-link">
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
            <Link href="google.com" className="navbar-link">
              Sign Out
            </Link>
          </MenuItems>
        </Flex>
      </Flex>
    );
  }
}
