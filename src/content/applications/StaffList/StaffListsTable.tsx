import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";

import Label from "src/components/Label";
import { StaffList, StaffListRoles } from "src/models/staff_list";
import BulkActions from "./BulkActions";
import TaskLog from "../PopUp/TaskLog";

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
  const [selectedStaffLists, setSelectedStaffLists] = useState<string[]>([]);
  const selectedBulkActions = selectedStaffLists.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "marketing",
      name: "マーケティング",
    },
    {
      id: "sales",
      name: "営業",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllStaffLists = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedStaffLists(
      event.target.checked ? staffLists.map((staffList) => staffList.id) : []
    );
  };

  const handleSelectOneStaffList = (
    event: ChangeEvent<HTMLInputElement>,
    staffListId: string
  ): void => {
    if (!selectedStaffLists.includes(staffListId)) {
      setSelectedStaffLists((prevSelected) => [...prevSelected, staffListId]);
    } else {
      setSelectedStaffLists((prevSelected) =>
        prevSelected.filter((id) => id !== staffListId)
      );
    }
  };

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
  const selectedAllStaffLists = selectedStaffLists.length === staffLists.length;
  const theme = useTheme();

  const [taskLogOpen, setTaskLogOpen] = useState(false);
  const editTaskLogOpen = () => setTaskLogOpen(true);

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>役職</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="絞り込み"
        />
      )}
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
                      onClick={editTaskLogOpen}
                      sx={{ textDecoration: "underline" }}
                    >
                      {staffList.companyName}
                    </Typography>
                  </TableCell>
                  <TaskLog
                    taskLogOpen={taskLogOpen}
                    setTaskLogOpen={setTaskLogOpen}
                  />
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
