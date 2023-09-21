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
import { styled } from "@mui/material/styles";
import { ChangeEvent, FormEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { NavigatePath } from "src/utility/constants/NavigatePath";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import ErrorIcon from "../applications/icon/ErrorIcon";
import CryptoJS from "crypto-js";

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

const Message = styled(Typography)(
  ({ theme }) => `
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;  
  letter-spacing: -0.06px;  
  color: #212529;
  text-align: left;
`
);
type InputType = "tmpPass" | "newPass" | "newPassCfm";

function changePassword() {
  const navigate = useNavigate();

  const [isSnackBarError, setIsTextError] = useState(false);

  const auth = useRecoilValue(authAtom);
  const [changepass, setPass] = useState({
    tmpPass: "",
    newPass: "",
    newPassCfm: "",
    errorMessage: "",
  });

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputType: InputType
  ) => {
    e.preventDefault();
    const { value } = e.target;

    if (inputType === "tmpPass") {
      setPass((oldPass) => {
        return {
          ...oldPass,
          tmpPass: value,
        };
      });
    } else if (inputType === "newPass") {
      setPass((oldPass) => {
        return {
          ...oldPass,
          newPass: value,
        };
      });
    } else if (inputType === "newPassCfm") {
      setPass((oldPass) => {
        return {
          ...oldPass,
          newPassCfm: value,
        };
      });
    }
  };

  const { mutate, isError } = useWrapMuation<any, any>(
    ["changepassword"],
    async (data) => {
      const sha256Hash = CryptoJS.SHA256(data.newPass).toString(
        CryptoJS.enc.Hex
      );
      const param = {
        member_id: auth.userId,
        password: data.tmpPass,
        newpassword: sha256Hash,
      };

      return await post<any>(
        `${config().apiUrl}/members/changepassword`,
        param
      );
    },
    {
      onSuccess: (data) => {
        navigate(`/${NavigatePath.DASHBOARD}`);
      },
      onError: (error) => {
        commonErrorCallback(error);
        setIsTextError(true);
        setPass((oldPass) => {
          return {
            ...oldPass,
            errorMessage: error.response.data.message,
          };
        });
      },
    }
  );
  const changepassword = (e: FormEvent) => {
    e.preventDefault();
    mutate(changepass);
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
              {changepass.errorMessage}
            </Typography>
          </Alert>
        </Snackbar>
      )}
      <Helmet>
        <title>パスワード初期変更画面</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
            <Box component={"form"} onSubmit={(e) => changepassword(e)}>
              <Box
                marginBottom="30px"
                gap="10px"
                display="flex"
                flexDirection="column"
              >
                <Message>メールアドレス</Message>
                <Box>
                  <Typography textAlign="left" variant="h3">
                    {auth.userId}
                  </Typography>
                </Box>
                <Message paddingTop="20px">仮パスワード</Message>
                <InputContainer>
                  <OutlinedInput
                    type="password"
                    placeholder="パスワード"
                    value={changepass.tmpPass}
                    onChange={(e) => onChange(e, "tmpPass")}
                  />
                </InputContainer>
                <Message paddingTop="20px">パスワード</Message>
                <InputContainer>
                  <OutlinedInput
                    type="password"
                    placeholder="パスワード"
                    value={changepass.newPass}
                    onChange={(e) => onChange(e, "newPass")}
                  />
                </InputContainer>
                <InputContainer>
                  <OutlinedInput
                    type="password"
                    placeholder="パスワード確認"
                    value={changepass.newPassCfm}
                    onChange={(e) => onChange(e, "newPassCfm")}
                  />
                </InputContainer>
              </Box>
              <Box>
                <CustomButton
                  type="submit"
                  fullWidth
                  disabled={
                    !(
                      auth.userId.length > 0 &&
                      changepass.tmpPass.length > 0 &&
                      changepass.newPass.length > 0 &&
                      changepass.newPassCfm.length > 0 &&
                      changepass.newPass === changepass.newPassCfm
                    )
                  }
                >
                  <Typography>パスワード変更</Typography>
                </CustomButton>
              </Box>
            </Box>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default changePassword;
