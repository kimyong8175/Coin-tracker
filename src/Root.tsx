import { useState } from "react";
import { GlobalStyle } from "styles/globalStyles";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

function Root() {
  const [isDark, setIsDark] = useState(true);
  const themeToggler = () => {
    setIsDark((current) => !current);
  };
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      {/* <button onClick={themeToggler}>Switch Theme</button> */}
      <GlobalStyle />
      <Outlet context={{ themeToggler, isDark }} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </ThemeProvider>
  );
}

export default Root;
