import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

// Let's say you want to add custom colors
const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "rgba(0, 28, 39, 0.6)")(props),
        color: mode("black", "white")(props),
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Raleway",
    body: "Roboto",
  },
});

export default customTheme;
