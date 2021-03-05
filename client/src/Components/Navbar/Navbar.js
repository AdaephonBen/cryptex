import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Link,
  Heading,
  Image,
} from "@chakra-ui/react";
import "./styles.css";
import logo from "../../assets/512x512notext.png";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Header = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { isAuthenticated, isAscii } = props;
  console.log("Show", show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      className="container"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Image boxSize="50px" src={logo} />
        <Heading as="h2" size="lg" letterSpacing="5px">
          {isAscii ? "67 82 89 80 84 69 88" : "CRYPTEX"}
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
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
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {isAuthenticated && (
          <>
            <MenuItems>
              <Link href="/bonus">Bonus Questions</Link>
            </MenuItems>
            <MenuItems>
              <Link href="/previous">Previous Questions</Link>
            </MenuItems>
            <MenuItems>
              <Link href="/portal">Current Question</Link>
            </MenuItems>
          </>
        )}
        <MenuItems>
          <Link href="/rules">Rules</Link>
        </MenuItems>

        <MenuItems>
          <Link href="/leaderboard">Leaderboard</Link>
        </MenuItems>

        <MenuItems>
          <Link href="https://discord.gg/y2DZeMA7hj">Forum</Link>
        </MenuItems>
      </Box>
      {props.level != null && (
        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          Current Level: {props.level}
        </Box>
      )}

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          bg="transparent"
          border="1px"
          onClick={() => {
            if (isAuthenticated) {
              props.logout({ returnTo: process.env.REACT_APP_LOGOUT_URL });
            } else {
              props.loginWithRedirect();
            }
          }}
        >
          {isAuthenticated ? "Sign out" : "Sign in"}
        </Button>
      </Box>
    </Flex>
  );
};

export default Header;
