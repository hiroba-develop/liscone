import { Card } from "@mui/material";
import StaffDetails2Table from "./StaffDetails2Table";

function ListLists({ staffList }) {
  return (
    <Card sx={{ mt: 5 }}>
      <StaffDetails2Table staffDetails2List={staffList.corporation} />
    </Card>
  );
}

export default ListLists;
