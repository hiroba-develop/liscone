/* eslint-disable react-hooks/rules-of-hooks */
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Container,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  commonErrorCallback,
  get,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { config } from "src/utility/config/AppConfig";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { NavigatePath } from "src/utility/constants/NavigatePath";
import ErrorIcon from "../applications/icon/ErrorIcon";

const MainContent = styled(Box)(
  ({ theme }) => `
    min-height: calc(100vh - 64px);
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    align-items: center;
    justify-content: center;
`
);
const InputContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  marginBottom: 24,
}));

const CustomButton = styled(Button)(() => ({
  display: "flex",
  justifyContent: "center",
  background: "#109DBC",
  height: 58,
  color: "white",
  "&:disabled": {
    background: "#E6E6E6",
    color: "#A3A3A3",
  },
}));

type InputType = "userId" | "userPw";

function signIn() {
  const [isSnackBarError, setIsTextError] = useState(false);
  const [auth, setAuth] = useState({
    userId: "",
    userPw: "",
  });

  const setAuthState = useSetRecoilState(authAtom);

  const navigate = useNavigate();

  const { mutate, isError } = useWrapMuation<any, any>(
    ["login"],
    async (data) => {
      const param = {
        member_id: data.userId,
        password: data.userPw,
      };

      return await post<any>(`${config().apiUrl}/members/login`, param);
    },
    {
      onSuccess: (data) => {
        setAuthState({
          userId: data.member_id,
          coId: data.company_code,
        });

        navigate(`/${NavigatePath.DASHBOARD}`);
      },
      onError: (error) => {
        commonErrorCallback(error);
        setIsTextError(true);
      },
    }
  );

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputType: InputType
  ) => {
    e.preventDefault();
    const { value } = e.target;

    if (inputType === "userId") {
      setAuth((oldAuth) => {
        return {
          ...oldAuth,
          userId: value,
        };
      });
    } else {
      setAuth((oldAuth) => {
        return {
          ...oldAuth,
          userPw: value,
        };
      });
    }
  };

  const login = (e: FormEvent) => {
    e.preventDefault();
    mutate(auth);
  };

  return (
    <>
      {isError && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={isSnackBarError}
          onClose={() => setIsTextError(false)}
        >
          <Alert
            severity="error"
            sx={{
              display: "flex",
              background: "#231F20",
              borderRadius: 4,
              padding: "16px 24px",
            }}
            iconMapping={{
              error: <ErrorIcon fontSize="inherit" />,
            }}
          >
            <AlertTitle>
              <Typography
                variant="body2"
                sx={{
                  color: "#FFFFFF",
                }}
              >
                Error
              </Typography>
            </AlertTitle>
            <Typography
              variant="body2"
              sx={{
                color: "#FFFFFF",
              }}
            >
              ログインできませんでした。
            </Typography>
          </Alert>
        </Snackbar>
      )}
      <Helmet>
        <title>LisCone ログイン</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ mt: 3, p: 4 }}>
            <Box sx={{ mt: 3 }}>
              <Typography marginBottom="30px" display="flex" variant="h3">
                ログイン
              </Typography>
              <Box component={"form"} onSubmit={(e) => login(e)}>
                <InputContainer>
                  <OutlinedInput
                    type="text"
                    placeholder="メールアドレス"
                    value={auth.userId}
                    onChange={(e) => onChange(e, "userId")}
                  />
                  {isSnackBarError && (
                    <Typography
                      sx={{
                        textAlign: "left",
                        color: "#E63A2E",
                      }}
                    >
                      メールアドレスを確認してください。
                    </Typography>
                  )}
                </InputContainer>

                <InputContainer>
                  <OutlinedInput
                    type="password"
                    placeholder="パスワード"
                    value={auth.userPw}
                    onChange={(e) => onChange(e, "userPw")}
                  />
                </InputContainer>

                <Box>
                  <CustomButton
                    type="submit"
                    fullWidth
                    disabled={
                      !(auth.userId.length > 0 && auth.userPw.length > 0)
                    }
                  >
                    <Typography>ログイン</Typography>
                  </CustomButton>
                </Box>
              </Box>
              <Link to="/account/changePassword">
                <Typography textAlign="center" marginTop="30px" variant="body2">
                  パスワードをお忘れの方はこちら
                </Typography>
              </Link>
            </Box>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default signIn;
