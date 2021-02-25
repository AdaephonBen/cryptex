/* eslint-disable react/prop-types */
import { Box, BoxProps } from "@chakra-ui/react";
import React, { MouseEvent } from "react";

const BOX_SHADOW = "0 0px 0px 0 rgba(0, 0, 0, 0.1)";

interface ContainerProps extends BoxProps {
  variant: "default" | "list";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  variant = "default",
  ...rest
}) => {
  return (
    <Box
      display="block"
      w="100%"
      borderRadius={4}
      // border={variant === "list" ? "none" : "1px"}
      boxShadow={variant === "list" ? "none" : BOX_SHADOW}
      borderColor="gray.200"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Table: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box
      as="table"
      w="100%"
      table-layout="auto"
      border-collapse="collapse"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Thead: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box as="thead" p={4} textAlign="left" {...rest}>
      {children}
    </Box>
  );
};

export const Tbody: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box as="tbody" p={4} {...rest}>
      {children}
    </Box>
  );
};

export const Tfoot: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box as="tfoot" p={4} {...rest}>
      {children}
    </Box>
  );
};

export const Tr: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <Box as="tr" my={1} {...rest}>
      {children}
    </Box>
  );
};

interface ThProps extends BoxProps {
  onClick?: (event: MouseEvent) => void;
}

export const Th: React.FC<ThProps> = ({ children, onClick, ...rest }) => {
  return (
    <Box
      as="th"
      p={4}
      borderBottom="1px"
      borderBottomColor="gray.200"
      _hover={{ cursor: onClick ? "pointer" : "" }}
      onClick={onClick}
      fontWeight="400"
      {...rest}
    >
      {children}
    </Box>
  );
};

export const Td: React.FC<ThProps> = ({ children, onClick, ...rest }) => (
  <Box
    as="td"
    p={4}
    // borderBottom="1px"
    borderBottomColor="gray.200"
    _hover={{ cursor: onClick ? "pointer" : "" }}
    onClick={onClick}
    {...rest}
  >
    {children}
  </Box>
);

export default {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
};
