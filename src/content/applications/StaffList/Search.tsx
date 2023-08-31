import {
  Card,
  TextField,
  Typography,
  Stack,
  Grid,
  Autocomplete,
  Button,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import SearchIcon from "@mui/icons-material/Search";

const source = [
  { label: "人事異動" },
  { label: "Wantedly" },
  { label: "Linkedin" },
  { label: "meety" },
];

function Search(props) {
  var searchClickValue;
  // 企業名
  const corporationNameChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.corporationNameChange(value);
  };
  // 役職
  const jobPositionChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.jobPositionChange(value);
  };
  //リスト
  const profileSourceTypeChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.profileSourceTypeChange(value);
  };
  // 担当者
  const staffNameChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.staffNameChange(value);
  };
  //検索ボタン
  const searchClick = () => {
    searchClickValue = 1;
    props.searchClickChange(searchClickValue);
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
            clearIcon={null}
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
        <Grid item xs={2}>
          <Button
            sx={{
              borderRadius: 0.5,
              backgroundColor: "#109DBC",
              m: 1,
            }}
            variant="contained"
            onClick={searchClick}
          >
            <SearchIcon />
            　検索
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Search;
