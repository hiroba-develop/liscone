import { Box, Button, alpha, lighten, styled, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: 64px;
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: #109DBC;
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
`
);

const ButtonWrapper = styled(Button)(
  ({ theme }) => `
        color: white;
  `
);
function Header() {
  const theme = useTheme();

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === "dark"
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(
                theme.colors.alpha.black[100],
                0.2
              )}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`,
      }}
    >
      <Box>
        <ButtonWrapper href="/task">
          <img
            src="/static/images/logo/lisconne-logo.svg"
            alt="lisconne-logo"
          />
        </ButtonWrapper>
      </Box>
      <Box alignItems="left">
        <ButtonWrapper
          onClick={() => {
            sessionStorage.clear();
          }}
          href="/"
        >
          <img src="/static/images/logout.svg" alt="vector" />
          　ログアウト
        </ButtonWrapper>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
