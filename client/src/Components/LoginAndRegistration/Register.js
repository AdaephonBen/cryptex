import React from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Tooltip,
  Link,
} from "@chakra-ui/core";
import { FaGoogle } from "react-icons/fa";
import "./styles.css";

const Register = () => {
  return (
    <div className="login">
      <Flex
        align="center"
        justifyContent="space-between"
        className="center-box"
        flexDirection="column"
      >
        <Heading className="title">cryptex</Heading>
        <Flex
          className="social-icons"
          justifyContent="space-around"
          width={["70vw", "40vw", "25vw", "25vw"]}
        >
          <Tooltip label="Sign in with your Google Account">
            <Link
              href={
                process.env.REACT_APP_BACKEND_URL + "\\auth\\oauth2\\google"
              }
            >
              <Button
                variantColor="green"
                size="lg"
                leftIcon={FaGoogle}
                className="social-icon-button"
                isRound="true"
              >
                Sign in
              </Button>
            </Link>
          </Tooltip>
        </Flex>
        <Flex className="password-authentication">
          <Flex className="login">
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
                  width={["70vw", "40vw", "25vw", "25vw"]}
                />
                <FormHelperText id="email-helper-text">
                  Like you want it on the Leaderboard
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input
                  type="email"
                  id="email"
                  aria-describedby="email-helper-text"
                  width={["70vw", "40vw", "25vw", "25vw"]}
                />
                <FormHelperText id="email-helper-text">
                  Make sure you choose a strong password.
                </FormHelperText>
              </FormControl>
              <Flex
                className="form-subtitle"
                flexDirection="column"
                justifyContent="center"
              >
                <Link href="/login" textAlign="center">
                  Sign in
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Button variantColor="green" width={["70vw", "40vw", "10vw", "10vw"]}>
          DIVE IN
        </Button>
      </Flex>
    </div>
  );
};

export default Register;
