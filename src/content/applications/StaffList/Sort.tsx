import {
  Card,
  TextField,
  Typography,
  Stack,
  Grid,
  Autocomplete,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const source = [{ label: "すべて" }];

const minEmployeeNumber = [
  { label: "特に指定しない" },
  { label: "0" },
  { label: "50" },
  { label: "100" },
  { label: "300" },
  { label: "500" },
  { label: "1000" },
  { label: "3000" },
  { label: "5000" },
];

const maxEmployeeNumber = [
  { label: "特に指定しない" },
  { label: "50" },
  { label: "100" },
  { label: "300" },
  { label: "500" },
  { label: "1000" },
  { label: "3000" },
  { label: "5000" },
];

function Sort() {
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
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>　</Typography>
          <TextField label="法人名" size="small" sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>　</Typography>
          <TextField label="役職" size="small" sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>　</Typography>
          <Autocomplete
            disablePortal
            options={source}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="ソース" />}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>　</Typography>
          <TextField label="担当者名" size="small" sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>従業員数</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minEmployeeNumber}
              size="small"
              sx={{ minWidth: 150 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
            <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxEmployeeNumber}
              size="small"
              sx={{ minWidth: 150 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Sort;
