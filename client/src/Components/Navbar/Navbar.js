import React, { useState } from "react";
import PropTypes from "prop-types";
import { Flex, Text, Link, Heading, Image } from "@chakra-ui/react";
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
  const [showNavbar, setShowNavbar] = useState(false);

  const { isAuthenticated, loginWithRedirect, logout } = props;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      pl="20px"
      color="white"
      flex="0 1 auto"
      className="container"
    >
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
          <Link className="navbar-link">Leaderboard</Link>
        </MenuItems>
        <MenuItems>
          <Link href="google.com" className="navbar-link">
            Rules
          </Link>
        </MenuItems>
        {isAuthenticated && (
          <MenuItems>
            <Link href="google.com" className="navbar-link">
              Levels
            </Link>
          </MenuItems>
        )}
        {isAuthenticated && (
          <MenuItems>
            <Link onClick={() => logout()} className="navbar-link">
              Sign Out
            </Link>
          </MenuItems>
        )}
        {!isAuthenticated && (
          <MenuItems>
            <Link className="navbar-link" onClick={() => loginWithRedirect()}>
              Sign In
            </Link>
          </MenuItems>
        )}
      </Flex>
    </Flex>
  );
}

Navbar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
