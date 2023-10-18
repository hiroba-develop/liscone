import { Card } from "@mui/material";
import SalesListImportReferenceTable from "./SalesListImportReferenceTable";

function ListLists(salesListStatistic) {
  return (
    <Card sx={{ mt: 5 }}>
      <SalesListImportReferenceTable salesListStatistic={salesListStatistic} />
    </Card>
  );
}

export default ListLists;
