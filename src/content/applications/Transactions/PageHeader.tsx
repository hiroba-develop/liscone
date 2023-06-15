import { Button, Grid, Typography } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

function PageHeader() {
  function saveTopic() {
    fetch(`http://localhost:3001/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: "아이디2",
        password: "패스워드2",
        email: "이메일2",
        nickname: "닉네임2",
      }),
    }).catch((err) => {
      console.log("error ", err);
    });
  }

  function init() {
    // ... ajax콜을 통해 응답데이터로 topicudpate
    fetch(`http://localhost:3001/users`, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Transactions
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={saveTopic}
        >
          Create transaction
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
