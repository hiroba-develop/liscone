/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

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

  function init() {
    // ... ajax콜을 통해 응답데이터로 topicudpate
    fetch(`http://localhost:3001/board`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      //redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(async (response) => {
        let datas = await response.json();
        console.log("뿌려준 데이터:::::", datas);
      })
      .catch((err) => {
        console.log("에러메시지:::::", err);
      });
  }

  return (
    <>
      <Helmet>
        <title>LisCone ログイン</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Typography marginBottom="30px" display="flex" variant="h3">
                ログイン
              </Typography>
              <Box component={"form"}>
                <InputContainer>
                  <OutlinedInput
                    type="text"
                    placeholder="メールアドレス"
                    value={auth.userId}
                    onChange={(e) => onChange(e, "userId")}
                    endAdornment={auth.userId.length > 0}
                  />
                  {isSnackBarError && (
                    <Typography
                      sx={{
                        color: "#E63A2E",
                        mt: 2,
                        ml: 4,
                      }}
                    >
                      아이디를 확인해주세요
                    </Typography>
                  )}
                </InputContainer>

                <InputContainer>
                  <OutlinedInput
                    type="password"
                    placeholder="パスワード"
                    value={auth.userPw}
                    onChange={(e) => onChange(e, "userPw")}
                    endAdornment={auth.userPw.length > 0}
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
                <Typography marginTop="30px" variant="body2">
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
