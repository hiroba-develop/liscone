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
import { StaffList, StaffListRoles } from "src/models/staff_list";

import LaunchIcon from "@mui/icons-material/Launch";
import { StaffDetails2List } from "src/models/staff_details2_list";

interface StaffListsProps {
  className?: string;
  staffList: StaffDetails2List;
}

interface Filters {
  status?: StaffListsProps;
}

const applyFilters = (
  staffList: StaffDetails2List[],
  filters: Filters
): StaffDetails2List[] => {
  return staffList.filter((staffList) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  staffList: StaffDetails2List[],
  page: number,
  limit: number
): StaffDetails2List[] => {
  return staffList.slice(page * limit, page * limit + limit);
};

const StaffLists: FC<StaffListsProps> = ({ staffList }) => {
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">会社名・法人名</TableCell>
              <TableCell align="center">役職</TableCell>
              <TableCell align="center">部署</TableCell>
              <TableCell align="center">氏名</TableCell>
              <TableCell align="center">アカウントソース</TableCell>
              <TableCell align="center">その他</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={staffList.staff_id}>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.corporation.corporation_name}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff.job_position}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff.role}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff.staff_name}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Button
                  sx={{
                    color: "black",
                  }}
                  href={staffList.staff.profile_link}
                >
                  {staffList.staff.profile_link}
                  <LaunchIcon
                    sx={{
                      ml: 1,
                      pt: 0.2,
                      fontSize: 18,
                    }}
                  />
                </Button>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.staff.other_information}
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
