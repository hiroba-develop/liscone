import { Card } from "@mui/material";
import CompanyDetails1ReferenceTable from "./CompanyDetails1ReferenceTable";

function ListLists(companyList) {
  return (
    <Card sx={{ mt: 5 }}>
      <CompanyDetails1ReferenceTable companyList={companyList} />
    </Card>
  );
}

export default ListLists;
