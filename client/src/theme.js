import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    heading: "'Lato', sans-serif",
    body: "'Roboto', sans-serif",
  },
};

export default customTheme;
