import React from "react";
import Portal from "./Components/Portal/Portal";
import { ThemeProvider, CSSReset, DarkMode } from "@chakra-ui/core";
import { customTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <DarkMode>
        <CSSReset />
        <div className="App" style={{ backgroundColor: "#212837" }}>
          <Portal />
        </div>
      </DarkMode>
    </ThemeProvider>
  );
}

export default App;
