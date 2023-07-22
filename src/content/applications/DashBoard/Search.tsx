import React, { useState } from "react";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Search(props) {
  const user = [
    { label: "大友玲奈" },
    { label: "関 一子" },
    { label: "奥谷 一子" },
    { label: "高橋一子" },
  ];
  const status = [
    { label: "完了" },
    { label: "未完了" },
    { label: "期限超過" },
    { label: "本日期限" },
  ];
  // ユーザー
  const staffNameChange = (event) => {
    const value = event.target.innerText;
    console.log(value);
    props.staffNameChange(value);
  };
  //日付(から～)
  const fromDateChange = (event) => {
    const value = event.$d;
    console.log(value);
    props.fromDateChange(value);
  };
  //日付(～まで)
  const toDateChange = (event) => {
    const value = event.$d;
    props.toDateChange(value);
  };
  // ステータス
  const statusChange = (event) => {
    const value = event.target.innerText;
    console.log(value);
    props.statusChange(value);
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Box>
      <Stack sx={{ m: 1 }} direction="row">
        <Grid container spacing={5}>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "14px", mt: 2.5, mr: 1 }}>
              ユーザー：
            </Typography>
            <Autocomplete
              id="checkboxes-tags-demo"
              options={user}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              style={{ width: 200, marginTop: 10 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ユーザー"
                  size="small"
                  placeholder="Favorites"
                />
              )}
              onChange={staffNameChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: 16, mt: 2.5, mr: 1 }}>
              期間：
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
          <Grid item xs={3}>
            <Typography sx={{ fontSize: "16px", mt: 2.5, mr: 1 }}>
              ステータス：
            </Typography>
            <Autocomplete
              // multiple
              id="checkboxes-tags-demo"
              options={status}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              style={{ width: 200, marginTop: 10 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ステータス"
                  size="small"
                  placeholder="Favorites"
                />
              )}
              onChange={statusChange}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default Search;
