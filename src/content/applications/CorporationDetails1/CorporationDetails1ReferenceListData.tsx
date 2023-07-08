import { Card } from "@mui/material";
import CorporationDetails1ReferenceTable from "./CorporationDetails1ReferenceTable";

function ListLists(corporationList) {
  return (
    <Card sx={{ mt: 5 }}>
      <CorporationDetails1ReferenceTable corporationList={corporationList} />
    </Card>
  );
}

export default ListLists;
