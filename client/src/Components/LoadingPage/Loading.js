import React from "react";
import { Flex, Center, Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Flex width="100vw" height="100vh">
    <Center width="100vw" height="100vh">
      <Spinner size="xl" />
    </Center>
  </Flex>
);

export default Loading;
