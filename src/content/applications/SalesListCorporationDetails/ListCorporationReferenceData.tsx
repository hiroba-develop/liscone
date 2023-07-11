import { Card } from "@mui/material";
import ListListsTable from "./SalesListCorporationReferenceTable";

function ListLists(salesList) {
  return (
    <Card sx={{ mt: 5 }}>
      <ListListsTable salesList={salesList} />
    </Card>
  );
}

export default ListLists;
