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

const searchList = [{ label: "全て" }];

function Search() {
  const margin = 0.5;
  const paddingBotton = 1.5;
  return (
    <Card sx={{ mb: 1 }}>
      <Stack sx={{ m: 1 }} direction="row">
        <ManageSearchIcon />
        <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
          絞り込み
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField label="企業名" sx={{ m: margin, pb: paddingBotton }} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="法人番号" sx={{ m: margin, pb: paddingBotton }} />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => <TextField {...params} label="リスト" />}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField label="担当者" sx={{ m: margin, pb: paddingBotton }} />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => <TextField {...params} label="ユーザー" />}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => <TextField {...params} label="行動種類" />}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => <TextField {...params} label="大項目" />}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={searchList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => <TextField {...params} label="小項目" />}
          />
        </Grid>
        <Grid item xs={5} sx={{ mt: -2 }}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>
            アクション日
          </Typography>
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
                      error: false,
                    },
                  }}
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
                      error: false,
                    },
                  }}
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
