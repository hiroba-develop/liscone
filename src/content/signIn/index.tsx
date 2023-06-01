import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  OutlinedInput,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';

const MainContent = styled(Box)(
  ({ theme }) => `
    min-height: calc(100vh - 64px);
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: -290px;
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonContainer = styled(Button)(
  ({ theme }) => `
    background-color: #109DBC;
`
);

function signIn() {

  // 
  function init() {
    // ... ajax콜을 통해 응답데이터로 topicudpate
    fetch(`http://localhost:3001/board`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      //redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(async response => {
        let datas = await response.json();
        console.log("뿌려준 데이터:::::", datas)
      })
      .catch(err => {
        console.log("에러메시지:::::", err);
      });
  }


  return (
    <>
      <Helmet>
        <title>sign-in</title>
      </Helmet>
      <MainContent>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <Typography marginBottom="30px" display="flex" variant='h3'>ログイン</Typography>
              <FormControl variant="outlined" fullWidth>
                <Box marginBottom="30px" gap="30px" display="flex" flexDirection="column">
                  <OutlinedInputWrapper
                    type="text"
                    placeholder="メールアドレス"
                  />
                  
                  <OutlinedInputWrapper
                    type="text"
                    placeholder="パスワード"
                  />
                  <FormControlLabel control={<Checkbox />} label="ログイン情報を保存する" />
                </Box>
                  <ButtonContainer
                    size="large" 
                    variant="contained" 
                    onClick={init}
                  >
                    ログイン
                  </ButtonContainer>
              </FormControl>
              <Typography marginTop="30px" variant="body2">パスワードをお忘れの方はこちら</Typography>
            </Card>
          </Container>
      </MainContent>
    </>
  );
}

export default signIn;
