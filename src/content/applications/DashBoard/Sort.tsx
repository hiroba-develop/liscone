import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Autocomplete,
  Box,
  Checkbox,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function Sort() {
  const user = [
    { label: "大友玲奈" },
    { label: "山田太郎" },
    { label: "鈴木次郎" },
  ];
  const status = [
    { label: "完了" },
    { label: "未完了" },
    { label: "期限超過" },
    { label: "本日期限" },
  ];

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Box sx={{}}>
      <Stack sx={{ m: 1 }} direction="row">
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "16px", mt: 2.5, mr: 1 }}>
              ユーザー：
            </Typography>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={user}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              style={{ width: 200, marginTop: 10 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ユーザー"
                  placeholder="Favorites"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: "16px", mt: 2.5, mr: 1, ml: 1 }}>
              期間：
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateRangePicker"]}>
                <DateRangePicker
                  localeText={{
                    start: "",
                    end: "",
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "16px", mt: 2.5, mr: 1 }}>
              ステータス：
            </Typography>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={status}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              style={{ width: 200, marginTop: 10 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ステータス"
                  placeholder="Favorites"
                />
              )}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default Sort;
