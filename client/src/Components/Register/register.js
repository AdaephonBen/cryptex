import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Flex,
  FormErrorMessage,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
} from "@chakra-ui/react";
import "./styles.css";

import { callApi } from "../../api/auth";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../LoadingPage/Loading";

const API_URL = process.env.REACT_APP_API_URL;

const Register = (props) => {
  const { history, getAccessTokenSilently } = props;
  const [username, setUsername] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    PostUsername();
  };
  const PostUsername = async () => {
    const accessToken = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUDIENCE,
      scope: "read:current_user update:current_user_metadata",
    });
    const res = await callApi(accessToken, `${API_URL}user`, {
      fetchOptions: {
        method: "POST",
        body: JSON.stringify({
          username,
        }),
      },
    });
    if (res === null) {
      setIsInvalid(true);
    } else {
      console.log("res is null");
      history.push("/portal");
    }
  };
  return (
    <div className="landing">
      <Flex
        align="center"
        
        className="center-box"
        flexDirection="column"
        height="100vh"
      >
        <Heading className="title">REGISTER</Heading>
        <Flex className="form" flexDirection="column">
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={isInvalid}>
              <FormLabel htmlFor="username" isRequired>
                Username
              </FormLabel>
              <Input
                type="username"
                id="username"
                aria-describedby="username-helper-text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <FormErrorMessage>
                That username is already taken. Please try a different one.{" "}
              </FormErrorMessage>

              <FormHelperText id="username-helper-text">
                Like you want it on the Leaderboard
              </FormHelperText>
              <FormHelperText>
                By clicking the "DIVE IN" button below, you are agreeing to the
                rules and privacy policy.
              </FormHelperText>
              <Button
                colorScheme="green"
                type="submit"
                width="100%"
                marginTop="10px"
              >
                DIVE IN
              </Button>
            </FormControl>
          </form>
        </Flex>
      </Flex>
    </div>
  );
};

export default withRouter(
  withAuthenticationRequired(Register, {
    onRedirecting: () => <Loading />,
  })
);
