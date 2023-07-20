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

interface StaffListsProps {
  className?: string;
  staffList: StaffList;
}

interface Filters {
  status?: StaffListRoles;
}

const applyFilters = (
  staffList: StaffList[],
  filters: Filters
): StaffList[] => {
  return staffList.filter((staffList) => {
    let matches = true;

    if (filters.status && staffList.role !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  corporationLists: StaffList[],
  page: number,
  limit: number
): StaffList[] => {
  return corporationLists.slice(page * limit, page * limit + limit);
};

const StaffLists: FC<StaffListsProps> = ({ staffList }) => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={staffList.staff_id}>
              <TableCell align="left">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffList.corporationEntity.corporation_name}
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
                  {staffList.job_position}
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
                  {staffList.staff_name}
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
                  href={staffList.profile_link}
                >
                  {staffList.profile_link}
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
                  {staffList.other_information}
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
