import { Box, alpha, lighten, styled, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { NavigatePath } from "src/utility/constants/NavigatePath";
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

function Header() {
  const theme = useTheme();
  const auth = useRecoilValue(authAtom);

  useEffect(() => {
    logoutCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const logoutCheck = async () => {
    if (auth.userId === "") {
      localStorage.clear();
    }
  };
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
        <img src="/static/images/logo/lisconne-logo.svg" alt="lisconne-logo" />
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
