/* eslint-disable react-hooks/rules-of-hooks */
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  OutlinedInput,
  Snackbar,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import CryptoJS from "crypto-js";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { NavigatePath } from "src/utility/constants/NavigatePath";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { authAtom, lsAuthAtom } from "src/utility/recoil/auth/Auth.atom";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import { productsAtom } from "src/utility/recoil/comp/Products.atom";
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
  const lsauth = useRecoilValue(lsAuthAtom);
  const [auth, setAuth] = useState({
    userId: lsauth.userId,
    userPw: lsauth.pw,
    coId: "",
  });
  const [storeAuthChecked, setStoreAuthChecked] = useState(false);
  const current = new Date();
  const today = `${current.getFullYear()}-${
    current.getMonth() < 10 ? "0" : ""
  }${current.getMonth() + 1}-${
    current.getDate() < 10 ? "0" : ""
  }${current.getDate()}`;

  const setAuthState = useSetRecoilState(authAtom);
  const setLSAuthState = useSetRecoilState(lsAuthAtom);
  const setMembers = useSetRecoilState(membersAtom);
  const setProducts = useSetRecoilState(productsAtom);

  const navigate = useNavigate();
  const [isSnackBarError, setIsTextError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { mutate, isError } = useWrapMuation<any, any>(
    ["login"],
    async (data) => {
      const sha256Hash = CryptoJS.SHA256(data.userPw).toString(
        CryptoJS.enc.Hex
      );
      const param = {
        member_id: data.userId,
        password: sha256Hash,
      };

      return await post<any>(`${config().apiUrl}/members/login`, param);
    },
    {
      onSuccess: (data) => {
        if (storeAuthChecked) {
          setLSAuthState({ userId: auth.userId, pw: auth.userPw });
        } else {
          setLSAuthState({ userId: auth.userId, pw: auth.userPw });
        }
        setAuthState({
          userId: data.member_id,
          coId: data.company_code,
        });

        const getMembers = async () => {
          try {
            const response = await axios.get(
              `${config().apiUrl}/members/byCompId`,
              {
                params: {
                  companyCode: data.company_code,
                },
              }
            );

            if (response.statusText === "OK") {
              setMembers(response.data);
            }
          } catch (error) {
            commonErrorCallback(error);
          }
        };
        getMembers();

        const getProducts = async () => {
          try {
            const response = await axios.get(
              `${config().apiUrl}/membercompanyproducts/byCompId`,
              {
                params: {
                  companyCode: data.company_code,
                },
              }
            );

            if (response.statusText === "OK") {
              setProducts(response.data);
            }
          } catch (error) {
            commonErrorCallback(error);
          }
        };
        getProducts();

        if (data.password_expired_day < today) {
          navigate(`/${NavigatePath.CHANGE_PW}`);
        } else {
          navigate(`/${NavigatePath.DASHBOARD}`);
        }
      },
      onError: (error) => {
        commonErrorCallback(error);
        setErrorMessage(error.response.data.message);
        setIsTextError(true);
      },
    }
  );

  const login = (e: FormEvent) => {
    e.preventDefault();
    mutate(auth);
  };

  const handleChange = (e) => {
    setStoreAuthChecked(e.target.checked);
  };

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

  return (
    <>
      {isError && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={isSnackBarError}
          autoHideDuration={3000}
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
              {errorMessage}
            </Typography>
          </Alert>
        </Snackbar>
      )}
      <Helmet>
        <title>Lisconne ログイン</title>
        <meta name="description" content="Lisconne" />
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
                </InputContainer>

                <InputContainer>
                  <OutlinedInput
                    type="password"
                    placeholder="パスワード"
                    value={auth.userPw}
                    onChange={(e) => onChange(e, "userPw")}
                  />
                </InputContainer>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={storeAuthChecked}
                      onChange={handleChange}
                    />
                  }
                  label="ログイン情報を保存する"
                />
                <Box sx={{ mt: 3 }}>
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
              {/* <Link to="/account/changePassword">
                <Typography textAlign="center" marginTop="30px" variant="body2">
                  パスワードをお忘れの方はこちら
                </Typography>
              </Link> */}
            </Box>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default signIn;
