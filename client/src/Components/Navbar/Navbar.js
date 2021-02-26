import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Tooltip,
  IconButton,
  Flex,
  Text,
  Link,
  Heading,
  Image,
} from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles.css";
import logo from "../../assets/512x512notext.png";

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

function Navbar(props) {
  const [showNavbar, setshowNavbar] = useState(false);
  const handleToggle = () => {
    setshowNavbar(!showNavbar);
  };
  const { isSidebarOpen, toggleSidebar } = props;
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      ml="20px"
      color="white"
      flex="0 1 auto"
      className="container"
    >
      <Flex
        flexGrow={{ base: "0", md: "1", lg: "1" }}
        flexShrink="0"
        flexBasis=" 0"
      >
        <Tooltip label={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}>
          <IconButton
            colorScheme={isSidebarOpen ? "#d8be00" : "green"}
            size="sm"
            icon={isSidebarOpen ? <FaTimes /> : <FaBars />}
            onClick={toggleSidebar}
            color={isSidebarOpen ? "#FFD500" : "#001C27"}
          />
        </Tooltip>
      </Flex>

      <Flex>
        <Image
          src={logo}
          boxSize="100px"
          style={{
            filter: "drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5))",
          }}
        />

        <Heading
          as="h1"
          size="lg"
          className="title"
          style={{
            color: "#40e0d0",
          }}
          paddingRight={{ base: "5px", md: "20px", lg: "25px" }}
        >
          CRYPTEX
        </Heading>
      </Flex>

      {/* <Box display={["block", "none"]} onClick={handleToggle()}>
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

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
