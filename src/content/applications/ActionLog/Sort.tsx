import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
  Autocomplete,
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

const maxSalesAmount = [
  { label: "特に指定しない" },
  { label: "1億円未満" },
  { label: "3億円" },
  { label: "10億円" },
  { label: "50億円" },
  { label: "300億円" },
  { label: "1000億円" },
];

function Sort() {
  const margin = 0.5;
  const paddingBotton = 1.5;
  return (
    <Box sx={{ mx: -8 }}>
      <Card sx={{ mb: 1 }}>
        <Stack sx={{ m: 1 }} direction="row">
          <ManageSearchIcon />
          <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
            絞り込み
          </Typography>
        </Stack>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <TextField label="企業名" sx={{ m: margin, pb: paddingBotton }} />
          </Grid>
          <Grid item xs={1}>
            <TextField label="法人番号" sx={{ m: margin, pb: paddingBotton }} />
          </Grid>
          <Grid item xs={1}>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              sx={{ m: margin, pb: paddingBotton }}
              renderInput={(params) => <TextField {...params} label="リスト" />}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField label="担当者" sx={{ m: margin, pb: paddingBotton }} />
          </Grid>
          <Grid item xs={1}>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              sx={{ m: margin, pb: paddingBotton }}
              renderInput={(params) => (
                <TextField {...params} label="ユーザー" />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              sx={{ m: margin, pb: paddingBotton }}
              renderInput={(params) => (
                <TextField {...params} label="行動種類" />
              )}
            />
          </Grid>
          <Grid item xs={1}>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              sx={{ m: margin, pb: paddingBotton }}
              renderInput={(params) => <TextField {...params} label="大項目" />}
            />
          </Grid>
          <Grid item xs={1}>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              sx={{ m: margin, pb: paddingBotton }}
              renderInput={(params) => <TextField {...params} label="小項目" />}
            />
          </Grid>
          <Grid item xs={4} sx={{ mt: -2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <Box sx={{ m: margin, pb: paddingBotton }}>
                  <DemoItem
                    label={
                      <Typography sx={{ my: -1.5 }}>アクション日</Typography>
                    }
                  >
                    <DateRangePicker
                      localeText={{
                        start: "",
                        end: "",
                      }}
                    />
                  </DemoItem>
                </Box>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}

export default Sort;
