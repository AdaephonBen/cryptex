import { extendTheme } from "@chakra-ui/react"

// Let's say you want to add custom colors
const customTheme = extendTheme({
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
