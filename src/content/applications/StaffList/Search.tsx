import {
  Card,
  TextField,
  Typography,
  Stack,
  Grid,
  Autocomplete,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const source = [{ label: "人事異動" }, { label: "Wantedly" }];

function Search(props) {
  // 企業名
  const corporationNameChange = (event) => {
    const value = event.target.value;
    props.corporationNameChange(value);
  };
  // 役職
  const jobPositionChange = (event) => {
    const value = event.target.value;
    props.jobPositionChange(value);
  };
  //リスト
  const profileSourceTypeChange = (event) => {
    const value = event.target.innerText;
    props.profileSourceTypeChange(value);
  };
  // 担当者
  const staffNameChange = (event) => {
    const value = event.target.value;
    props.staffNameChange(value);
  };
  return (
    <Card>
      <Stack sx={{ m: 1 }} direction="row">
        <ManageSearchIcon />
        <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
          絞り込み
        </Typography>
      </Stack>
      <Grid container spacing={1} sx={{ mb: 1 }}>
        <Grid item xs={2}>
          <TextField
            label="法人名"
            size="small"
            sx={{ m: 1 }}
            onChange={corporationNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="役職"
            size="small"
            sx={{ m: 1 }}
            onChange={jobPositionChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={source}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="ソース" />}
            onChange={profileSourceTypeChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="担当者名"
            size="small"
            sx={{ m: 1 }}
            onChange={staffNameChange}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export default Search;
