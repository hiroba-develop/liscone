import { Card } from "@mui/material";
import StaffDetails1Table from "./StaffDetails1Table";

function ListLists({ staffList }) {
  return (
    <Card sx={{ mt: 5 }}>
      <StaffDetails1Table staffDetails1List={staffList.corporationEntity} />
    </Card>
  );
}

export default ListLists;
