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
} from "@chakra-ui/react";
import Table from "./table";
import "./styles.css";

function Leaderboard() {
  return (
    <Box className="container">
      <Flex
        align="center"
        justify="space-between"
        flexDirection="column"
        className="leaderboard"
      >
        <Flex flexDir="column">
          <Heading
            marginTop="1.5rem"
            letterSpacing={[3, 7, 8]}
            fontWeight={[520, 600, 600]}
            marginRight={["-3px", "-7px", "-8px"]}
            className="heading"
          >
            LEADERBOARD
          </Heading>
          <Divider />
        </Flex>
        <Flex className="filters">
          <FormControl>
            <Input placeholder="Team/User Name" size="sm" />
          </FormControl>
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            size="sm"
            className="search"
          />
        </Flex>
        <Table />
        <Box className="paginator">
          <IconButton icon={<FaAngleLeft />} size="sm" />
          &nbsp;Page 1 of 20&nbsp;
          <IconButton icon={<FaAngleRight />} size="sm" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Leaderboard;
