import React, { useState } from "react";
import Router from "Router";
import { ReactQueryDevtools } from "react-query/devtools";
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
      <ReactQueryDevtools initialIsOpen={false} />
      <button onClick={themeToggler}>Switch Theme</button>
    </>
  );
}

export default App;
