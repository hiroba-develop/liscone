/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";

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

function changePassword() {
  return (
    <>
      <Helmet>
        <title>パスワード初期変更画面</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: "center", mt: 3, p: 4 }}>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <FormControl component="fieldset" variant="standard" fullWidth>
                <Box
                  marginBottom="30px"
                  gap="10px"
                  display="flex"
                  flexDirection="column"
                >
                  <Message>メールアドレス</Message>
                  <TextField
                    autoFocus
                    label="メールアドレス"
                    type="text"
                    variant="outlined"
                    name="email"
                  />
                  <Message paddingTop="20px">仮パスワード</Message>
                  <TextField
                    label="パスワード"
                    type="password"
                    name="tmp_password"
                  />
                  <Message paddingTop="20px">パスワード</Message>
                  <TextField
                    label="パスワード"
                    type="password"
                    name="new_password"
                  />
                  <TextField
                    label="パスワード（確認）"
                    type="password"
                    name="new_password_cfm"
                  />
                </Box>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  // onClick={init}
                >
                  パスワード変更
                </Button>
              </FormControl>
            </Box>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default changePassword;
