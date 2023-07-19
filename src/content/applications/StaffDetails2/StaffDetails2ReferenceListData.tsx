import { Card } from "@mui/material";
import StaffDetails2ReferenceTable from "./StaffDetails2ReferenceTable";

function StaffLists({ staffList }) {
  return (
    <Card>
      <StaffDetails2ReferenceTable staffList={staffList} />
    </Card>
  );
}

export default StaffLists;
