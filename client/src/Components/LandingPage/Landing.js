import React from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/core";
import "./styles.css";

const LandingPage = () => {
  return (
    <div className="landing">
      <Flex
        align="center"
        justifyContent="space-between"
        className="center-box"
        flexDirection="column"
      >
        <Heading className="title">landing</Heading>
        <Flex className="form" flexDirection="column">
          <FormControl>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              type="email"
              id="email"
              aria-describedby="email-helper-text"
              width={["70vw", "40vw", "25vw", "25vw"]}
            />
            <FormHelperText id="email-helper-text">
              We&apos;ll never share your email.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Username</FormLabel>
            <Input
              type="email"
              id="email"
              aria-describedby="email-helper-text"
            />
            <FormHelperText id="email-helper-text">
              Like you want it on the Leaderboard
            </FormHelperText>
          </FormControl>
          <Button variantColor="green">DIVE IN</Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default LandingPage;
