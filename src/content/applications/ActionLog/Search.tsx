import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const searchList = [
  { label: "test" },
  { label: "JUSHINSEO" },
  { label: "渡邉弥叶" },
  { label: "受付拒否" },
  { label: "送信済み" },
  { label: "電話番号なし" },
];

function Search(props) {
  // 企業名
  const corporationNameChange = (event) => {
    const value = event.target.value;
    props.corporationNameChange(value);
  };
  //リスト
  const salesListNameChange = (event) => {
    const value = event.target.innerText;
    props.salesListNameChange(value);
  };
  // 担当者
  const staffNameChange = (event) => {
    const value = event.target.value;
    props.staffNameChange(value);
  };
  //ユーザー
  const memberNameChange = (event) => {
    const value = event.target.innerText;
    props.memberNameChange(value);
  };
  //行動種類
  const executeBigResultChange = (event) => {
    const value = event.target.innerText;
    props.executeBigResultChange(value);
  };
  //小項目
  const executeSmallResultChange = (event) => {
    const value = event.target.innerText;
    props.executeSmallResultChange(value);
  };
  //日付(から～)
  const fromDateChange = (event) => {
    const value = event.$d;
    props.fromDateChange(value);
  };
  //日付(～まで)
  const toDateChange = (event) => {
    const value = event.$d;
    props.toDateChange(value);
  };

  const margin = 0.5;
  const paddingBotton = 1.5;
  return (
    <Card>
      <Stack sx={{ m: 1 }} direction="row">
        <ManageSearchIcon />
        <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
          絞り込み
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField
            label="企業名"
            size="small"
            sx={{ m: margin, pb: paddingBotton }}
            onChange={corporationNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="法人番号"
            size="small"
            sx={{ m: margin, pb: paddingBotton }}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="リスト" />
            )}
            onChange={salesListNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="担当者"
            size="small"
            sx={{ m: margin, pb: paddingBotton }}
            onChange={staffNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="ユーザー" />
            )}
            onChange={memberNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="行動種類" />
            )}
            onChange={executeBigResultChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="大項目" />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="小項目" />
            )}
            onChange={executeSmallResultChange}
          />
        </Grid>
        <Grid item xs={5} sx={{ mt: -2 }}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>行動日</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  pt: -1,
                }}
              >
                <DatePicker
                  label=""
                  format={"YYYY-MM-DD"}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: false,
                    },
                  }}
                  onChange={fromDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  pt: -1,
                }}
              >
                <DatePicker
                  label=""
                  format={"YYYY-MM-DD"}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: false,
                    },
                  }}
                  onChange={toDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Search;
