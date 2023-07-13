import { Card } from "@mui/material";
import ListListsTable from "./SalesListCorporationReferenceTable";

function ListLists(salesListStatistic) {
  return (
    <Card sx={{ mt: 5 }}>
      <ListListsTable salesListStatistic={salesListStatistic} />
    </Card>
  );
}

export default ListLists;
