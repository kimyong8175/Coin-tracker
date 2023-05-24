import React, { useState } from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "Router";
import { GlobalStyle } from "styles/globalStyles";

function App() {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <>
      <GlobalStyle />
      <Router />
      <button onClick={themeToggler}>Switch Theme</button>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default App;
