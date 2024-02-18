import Label from "src/components/Label";
import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CorporationListStatus } from "src/models/corporation_list";
import { renderCellExpand } from "src/utility/renderexpand";
function CorporationDetails3Reference(corporationList) {
  return (
    <Card>
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 20, m: 1 }}>サイトPV</Typography>
          <Typography
            sx={{
              fontSize: 16,
              m: 2,
            }}
          >
            {corporationList.site_pv}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 20, m: 1 }}>Publishers</Typography>
          <Typography
            sx={{
              fontSize: 16,
              m: 2,
            }}
          >
            {corporationList.publishers}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 20, m: 1 }}>Ad Networks</Typography>
          <Typography
            sx={{
              fontSize: 16,
              m: 2,
            }}
          >
            {corporationList.ad_networks}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CorporationDetails3Reference;
