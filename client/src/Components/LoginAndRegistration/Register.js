import React, { useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/core";
import { FaGoogle } from "react-icons/fa";
import { Redirect } from "react-router-dom";
import { RegisterAPI, GetCurrentUserAPI } from "../../api/AuthAPI.ts";
import "./styles.css";

const Register = () => {
  const [emailID, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const toast = useToast();

  const register = async (e) => {
    e.preventDefault();
    const response = await RegisterAPI(emailID, username, password);
    if (response.data.status === "success") {
      setRedirect(true);
    } else {
      toast({
        title: "Error",
        description: "You already have an account with us. ",
        status: "error",
        duration: 2000,
      });
    }
  };

  async function GetUserDetails() {
    const DoesUserExistResponse = await GetCurrentUserAPI();
    if (DoesUserExistResponse.data.Email) {
      setRedirect(true);
    }
  }

  useEffect(() => {
    GetUserDetails();
  });

  if (redirect) {
    return <Redirect to="/portal" />;
  }
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
          <Tooltip label="Sign up with your Google Account">
            <Link
              href={`${process.env.REACT_APP_BACKEND_URL}/auth/oauth2/google`}
            >
              <Button
                variantColor="green"
                size="lg"
                leftIcon={FaGoogle}
                className="social-icon-button"
                isRound="true"
              >
                Sign up
              </Button>
            </Link>
          </Tooltip>
        </Flex>
        <Flex className="password-authentication">
          <Flex className="login">
            <form
              className="form"
              flexDirection="column"
              onSubmit={(e) => register(e)}
            >
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="emailID"
                  aria-describedby="email-helper-text"
                  width={["70vw", "40vw", "25vw", "25vw"]}
                  onChange={(e) => setEmail(e.target.value)}
                  value={emailID}
                />
                <FormHelperText id="email-helper-text">
                  We&apos;ll never share your email with anyone.
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Username</FormLabel>
                <Input
                  type="username"
                  id="email"
                  name="username"
                  aria-describedby="email-helper-text"
                  width={["70vw", "40vw", "25vw", "25vw"]}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  pattern="^[a-zA-Z0-9]([._@-]|[a-zA-Z0-9]){6,29}[a-zA-Z0-9]$"
                  title="Username should"
                />
                <FormHelperText id="email-helper-text">
                  Like you want it on the Leaderboard
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Password</FormLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  aria-describedby="email-helper-text"
                  width={["70vw", "40vw", "25vw", "25vw"]}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  minLength={8}
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
              <Flex
                className="form-subtitle"
                flexDirection="column"
                justifyContent="center"
              >
                <Button
                  variantColor="green"
                  width={["70vw", "40vw", "10vw", "10vw"]}
                  type="submit"
                  marginX="auto"
                >
                  DIVE IN
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Register;
