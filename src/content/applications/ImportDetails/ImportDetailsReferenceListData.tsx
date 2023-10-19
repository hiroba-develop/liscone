import { Card } from "@mui/material";
import ImportDetailsReferenceTable from "./ImportDetailsReferenceTable";

function ListLists(importList) {
  return (
    <Card sx={{ mt: 5 }}>
      <ImportDetailsReferenceTable importList={importList} />
    </Card>
  );
}

export default ListLists;
