import React from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  IconButton,
  Tooltip,
  Link,
} from "@chakra-ui/core";
import { FaGoogle, FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import "./styles.css";

export default class Login extends React.Component {
  render() {
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
            justifyContent="space-between"
            width={["70vw", "40vw", "25vw", "25vw"]}
          >
            <Tooltip label="Sign in with Google">
              <IconButton
                variantColor="green"
                size="lg"
                icon={FaGoogle}
                className="social-icon-button"
                isRound="true"
              />
            </Tooltip>
            <Tooltip label="Sign in with Facebook">
              <IconButton
                variantColor="green"
                size="lg"
                icon={FaFacebookF}
                className="social-icon-button"
                isRound="true"
              />
            </Tooltip>
            <Tooltip label="Sign in with Twitter">
              <IconButton
                variantColor="green"
                size="lg"
                icon={FaTwitter}
                className="social-icon-button"
                isRound="true"
              />
            </Tooltip>
            <Tooltip label="Sign in with Github">
              <IconButton
                variantColor="green"
                size="lg"
                icon={FaGithub}
                className="social-icon-button"
                isRound="true"
              />
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
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    aria-describedby="email-helper-text"
                    width={["70vw", "40vw", "25vw", "25vw"]}
                  />
                </FormControl>

                <Flex
                  className="form-subtitle"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Link href="/register" textAlign="center">
                    Sign up
                  </Link>
                  <Link href="/reset" textAlign="center">
                    Reset my Password
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
  }
}