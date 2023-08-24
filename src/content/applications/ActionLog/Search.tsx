import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useRecoilValue } from "recoil";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import { useState } from "react";
import { CODE } from "src/utility/constants/Code";

function Search(props) {
  //リスト_リスト情報
  const salesListNameList = props.selectSalesListNames;
  //ユーザー_リスト情報
  const user = useRecoilValue(membersAtom);
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
  // 大項目
  const [BRSelected, setBRSelected] = useState("");
  const executeBigResultChange = (event) => {
    const value = event.target.innerText;
    setBRSelected(value);
    props.executeBigResultChange(value);
  };

  // 小項目
  const executeSmallResultChange = (event) => {
    const value = event.target.innerText;
    props.executeSmallResultChange(value);
  };
  const smallResult = () => {
    if (BRSelected === "受付拒否") {
      return CODE.SMALL_RESULT_BR01;
    } else if (BRSelected === "受付突破") {
      return CODE.SMALL_RESULT_BR02;
    } else if (BRSelected === "担当者拒否") {
      return CODE.SMALL_RESULT_BR03;
    } else if (BRSelected === "担当者止まり") {
      return CODE.SMALL_RESULT_BR04;
    } else if (BRSelected === "担当者突破") {
      return CODE.SMALL_RESULT_BR05;
    } else if (BRSelected === "送信済み") {
      return CODE.SMALL_RESULT_BR06;
    } else {
      return [];
    }
  };
  const bigResultArray = smallResult();

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
        <Grid item xs={3}>
          <Autocomplete
            disablePortal
            options={salesListNameList}
            sx={{ m: margin, pb: paddingBotton }}
            renderInput={(params) => (
              <TextField {...params} size="small" label="リスト" />
            )}
            onChange={salesListNameChange}
            clearIcon={null}
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
            id="checkboxes-tags-demo"
            options={user}
            sx={{ m: margin, pb: paddingBotton }}
            disableCloseOnSelect
            getOptionLabel={(option) => option.member_name}
            renderInput={(params) => (
              <TextField {...params} size="small" label="ユーザー" />
            )}
            onChange={(option) => memberNameChange(option)}
            clearIcon={null}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            options={CODE.BIG_RESULT}
            getOptionLabel={(option) => option.code}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="大項目"
                sx={{ m: margin, pb: paddingBotton }}
              />
            )}
            onChange={executeBigResultChange}
            clearIcon={null}
          />
        </Grid>

        <Grid item xs={2}>
          <Autocomplete
            options={bigResultArray}
            getOptionLabel={(option) => option.code}
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label="小項目"
                sx={{ m: margin, pb: paddingBotton }}
              />
            )}
            onChange={executeSmallResultChange}
            clearIcon={null}
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
