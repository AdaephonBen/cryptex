import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import "./styles.css";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="landing">
      <Flex
        align="center"
        justifyContent="space-between"
        className="center-box"
        flexDirection="column"
      >
        <Heading className="title">landing</Heading>
        <Button colorScheme="blue" onClick={() => loginWithRedirect()}>
          DIVE IN
        </Button>
      </Flex>
    </div>
  );
};

export default LandingPage;
