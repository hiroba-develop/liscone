import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";

import Label from "src/components/Label";
import { StaffList, StaffListRoles } from "src/models/staff_list";
import TaskLog from "../PopUp/TaskLog";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

interface StaffListsProps {
  className?: string;
  staffLists: StaffList[];
}

interface Filters {
  status?: StaffListRoles;
}

const getStatusLabel = (staffListRoles: StaffListRoles): JSX.Element => {
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
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredStaffLists = applyFilters(staffLists, filters);
  const paginatedStaffLists = applyPagination(filteredStaffLists, page, limit);
  const selectedSomeStaffLists =
    selectedStaffLists.length > 0 &&
    selectedStaffLists.length < staffLists.length;

  const [taskLogOpen, setTaskLogOpen] = useState(false);
  const editTaskLogOpen = () => setTaskLogOpen(true);

  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        action={
          <Box>
            <Button variant="contained" onClick={editTaskLogOpen}>
              <AddIcon />
              　企業リストを作成
            </Button>
          </Box>
        }
      />
      <TaskLog taskLogOpen={taskLogOpen} setTaskLogOpen={setTaskLogOpen} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  //checked={selectedAllCompanyLists}
                  indeterminate={selectedSomeStaffLists}
                  //onChange={handleSelectAllCompanyLists}
                />
              </TableCell>
              <TableCell align="center">会社名・法人名</TableCell>
              <TableCell align="center">役職</TableCell>
              <TableCell align="center">氏名</TableCell>
              <TableCell align="center">アカウントソース</TableCell>
              <TableCell align="center">プロフィールリンク</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffLists.map((staffList) => {
              const isStaffListSelected = selectedStaffLists.includes(
                staffList.id
              );
              return (
                <TableRow
                  hover
                  key={staffList.id}
                  //selected={isStaffListSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      //checked={isStaffListSelected}
                      // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      //   handleSelectOneStaffList(event, staffList.id)
                      // }
                      value={isStaffListSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() => navigate("/staff/staffDetails1")}
                      sx={{ textDecoration: "underline" }}
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
                      {getStatusLabel(staffList.role)}
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
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.accountSource}
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
                      {staffList.profileLink}
                    </Typography>
                  </TableCell>
                  {/* 
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                   */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredStaffLists.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
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
