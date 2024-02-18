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
function CorporationDetails2Reference(corporationList) {
  return (
    <Card>
      <Grid container spacing={0}>
        <Grid item xs={8}>
          <Typography sx={{ fontSize: 20, m: 1 }}>概要文章</Typography>
          <Typography
            sx={{
              fontSize: 16,
              m: 2,
            }}
          >
            {corporationList.business_detail}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontSize: 20, m: 1 }}>平均年齢</Typography>
          <Typography
            sx={{
              fontSize: 16,
              m: 2,
            }}
          >
            {corporationList.average_age}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default CorporationDetails2Reference;
