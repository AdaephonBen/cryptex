import React from "react";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";
import {
  Flex,
  Box,
  Divider,
  Input,
  FormControl,
  IconButton,
  Heading,
} from "@chakra-ui/core";
import Navbar from "../Navbar/Navbar";
import Table from "./table";
import "./styles.css";
// import { icons } from "react-icons/lib/cjs";

function Leaderboard() {
  return (
    <Box className="page">
      <Navbar />
      <Flex
        align="center"
        justify="space-between"
        flexDirection="column"
        className="leaderboard"
      >
        <Heading
          marginTop="1.5rem"
          letterSpacing={[3, 7, 8]}
          fontWeight={[520, 600, 600]}
          marginRight={["-3", "-7", "-8"]}
          className="heading"
        >
          LEADERBOARD
          <Divider />
        </Heading>
        <Flex className="filters">
          <FormControl>
            <Input placeholder="Team/User Name" size="sm" />
          </FormControl>
          <IconButton
            aria-label="Search"
            icon={FaSearch}
            size="sm"
            className="search"
          />
        </Flex>
        <Table />
        <Box className="paginator">
          <IconButton icon={FaAngleLeft} size="sm" />
          &nbsp;Page 1 of 20&nbsp;
          <IconButton icon={FaAngleRight} size="sm" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Leaderboard;