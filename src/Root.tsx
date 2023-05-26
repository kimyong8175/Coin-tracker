import { useState } from "react";
import { GlobalStyle } from "styles/globalStyles";
import { Outlet } from "react-router-dom";

function Root() {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <button onClick={themeToggler}>Switch Theme</button>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}

export default Root;
