import { Card } from "@mui/material";
import StaffDetails1ReferenceTable from "./StaffDetails1ReferenceTable";

function StaffLists({ staffList }) {
  return (
    <Card>
      <StaffDetails1ReferenceTable staffList={staffList} />
    </Card>
  );
}

export default StaffLists;
