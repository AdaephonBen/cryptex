import React from "react";
import { Box } from "@chakra-ui/react";
import "./styles.css";

const Countdown = () => {
  return (
    <Box className="countdown" fontSize={{ base: "3rem", md: "3.5rem" }}>
      19:20:21
    </Box>
  );
};

export default Countdown;
