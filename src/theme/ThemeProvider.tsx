import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";
import { useLocation, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { NavigatePath } from "src/utility/constants/NavigatePath";

export const ThemeContext = React.createContext(
  (themeName: string): void => {}
);

const ThemeProviderWrapper: React.FC = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const curThemeName = localStorage.getItem("appTheme") || "PureLightTheme";
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = (themeName: string): void => {
    localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };
  // TO DO 임시방어
  // useEffect(() => {
  //   logoutCheck();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname]);

  // const logoutCheck = async () => {
  //   if (auth.userId === "") {
  //     localStorage.clear();
  //     navigate(`${NavigatePath.LOGIN}`);
  //   }
  // };
  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
