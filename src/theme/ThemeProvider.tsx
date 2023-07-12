import { ThemeProvider } from "@mui/material";
import { StylesProvider } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { themeCreator } from "./base";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: React.FC = (props) => {
  const { pathname } = useLocation();
  const auth = useRecoilValue(authAtom);
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };
  useEffect(() => {
    logoutCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const logoutCheck = async () => {
    if (auth.userId === "") {
      sessionStorage.clear();
    }
  };
  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
