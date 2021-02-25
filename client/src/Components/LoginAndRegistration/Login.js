import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tooltip,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { LoginAPI, GetCurrentUserAPI } from "../../api/AuthAPI.ts";
import "./styles.css";

const Register = () => {
  const [emailID, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(null);
  const toast = useToast();

  const login = async (e) => {
    e.preventDefault();
    const response = await LoginAPI(emailID, password);
    if (response.data.status === "success") {
      setRedirect(true);
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
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
          <Tooltip label="Sign in with your Google Account">
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
                Sign in
              </Button>
            </Link>
          </Tooltip>
        </Flex>
        <Flex className="password-authentication">
          <Flex className="login">
            <form
              className="form"
              flexDirection="column"
              onSubmit={(e) => login(e)}
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
              </FormControl>
              <Flex
                className="form-subtitle"
                flexDirection="column"
                justifyContent="center"
              >
                <Link href="/register" textAlign="center">
                  Sign up
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
