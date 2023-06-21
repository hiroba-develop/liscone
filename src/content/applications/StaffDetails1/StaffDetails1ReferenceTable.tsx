import { FC, useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  StaffList,
  StaffListRoles,
  StaffListPositions,
} from "src/models/staff_list";

import Label from "src/components/Label";
import LaunchIcon from "@mui/icons-material/Launch";

interface StaffListsProps {
  className?: string;
  staffLists: StaffList[];
}

interface Filters {
  status?: StaffListRoles;
}

const staffListRoles = (staffListRoles: StaffListRoles): JSX.Element => {
  const map = {
    marketing: {
      text: "マーケティング",
      color: "error",
    },
    sales: {
      text: "営業",
      color: "warn",
    },
  };

  const { text, color }: any = map[staffListRoles];

  return <Label color={color}>{text}</Label>;
};
const staffListPositions = (
  staffListPositions: StaffListPositions
): JSX.Element => {
  const map = {
    general: {
      text: "一般",
      color: "primary",
    },
    sectionManager: {
      text: "課長",
      color: "warning",
    },
    generalManager: {
      text: "部長",
      color: "success",
    },
  };

  const { text, color }: any = map[staffListPositions];

  return <Label color={color}>{text}</Label>;
};

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
  companyLists: StaffList[],
  page: number,
  limit: number
): StaffList[] => {
  return companyLists.slice(page * limit, page * limit + limit);
};

const StaffLists: FC<StaffListsProps> = ({ staffLists }) => {
  const selectedStaffLists: string[] = [];
  const page: number = 0;
  const limit: number = 5;
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const filteredStaffLists = applyFilters(staffLists, filters);
  const paginatedStaffLists = applyPagination(filteredStaffLists, page, limit);

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
            {paginatedStaffLists.map((staffList) => {
              const isStaffListSelected = selectedStaffLists.includes(
                staffList.id
              );
              return (
                <TableRow hover key={staffList.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.companyName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffListPositions(staffList.positions)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffListRoles(staffList.role)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.familyName}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      sx={{
                        color: "black",
                      }}
                      href={staffList.profileLink}
                    >
                      {staffList.accountSource}
                      <LaunchIcon
                        sx={{
                          ml: 1,
                          pt: 0.2,
                          fontSize: 18,
                        }}
                      />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.otherInformation}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

StaffLists.propTypes = {
  staffLists: PropTypes.array.isRequired,
};

StaffLists.defaultProps = {
  staffLists: [],
};

export default StaffLists;
