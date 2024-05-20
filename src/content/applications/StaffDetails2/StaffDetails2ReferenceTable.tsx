import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FC } from "react";

import LaunchIcon from "@mui/icons-material/Launch";
import { SalesListStaff } from "src/models/sales_list_staff";

interface StaffListsProps {
  className?: string;
  staffList: SalesListStaff;
}

const StaffLists: FC<StaffListsProps> = ({ staffList }) => {
  let employee_status;
  if (staffList.staff_employee_status === 0) {
  	employee_status="現職";
  } else if (staffList.staff_employee_status === 1) {
  	employee_status="休職中";
  } else if (staffList.staff_employee_status === 2) {
  	employee_status="離職済み";
  } else {
  	employee_status="不明なステータス";
  }
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">会社名・法人名</TableCell>
              <TableCell align="left">役職</TableCell>
              <TableCell align="left">部署</TableCell>
              <TableCell align="left">氏名</TableCell>
              <TableCell align="left">アカウントソース</TableCell>
              <TableCell align="left">その他</TableCell>
              <TableCell align="left">在籍状況</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={staffList.staff_staff_id}>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.corporation_corporation_name}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff_job_position}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.role}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff_staff_name}
                </Typography>
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Button
                  sx={{
                    color: "black",
                  }}
                  href={staffList.staff_profile_link}
                >
                  {staffList.staff_profile_link}
                  <LaunchIcon
                    sx={{
                      ml: 1,
                      pt: 0.2,
                      fontSize: 18,
                    }}
                  />
                </Button>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff_other_information}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {employee_status}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default StaffLists;
