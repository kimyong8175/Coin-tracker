import { GlobalStyle } from "styles/globalStyles";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "atoms";
import Navbar from "components/Navbar/Navbar";

function Root() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Navbar />
      <Outlet />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </ThemeProvider>
  );
}

export default Root;
