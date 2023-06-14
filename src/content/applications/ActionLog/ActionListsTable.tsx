import { ChangeEvent, FC, useState } from "react";

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

import Label from "src/components/Label";
import { ActionList, ActionListStatus } from "src/models/action_list";
import BulkActions from "./BulkActions";

interface ActionListsProps {
  className?: string;
  actionLists: ActionList[];
}

interface Filters {
  status?: ActionListStatus;
}

const getStatusLabel = (actionListStatus: ActionListStatus): JSX.Element => {
  const map = {
    recall: {
      text: "recall",
      color: "error",
    },
  };

  const { text, color }: any = map[actionListStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  actionList: ActionList[],
  filters: Filters
): ActionList[] => {
  return actionList.filter((actionList) => {
    let matches = true;

    if (filters.status && actionList.task !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  actionLists: ActionList[],
  page: number,
  limit: number
): ActionList[] => {
  return actionLists.slice(page * limit, page * limit + limit);
};

const ActionLists: FC<ActionListsProps> = ({ actionLists }) => {
  const [selectedActionLists, setSelectedActionLists] = useState<string[]>([]);
  const selectedBulkActions = selectedActionLists.length > 0;
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
      id: "recall",
      name: "recall",
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

  const handleSelectAllActionLists = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedActionLists(
      event.target.checked ? actionLists.map((actionList) => actionList.id) : []
    );
  };

  const handleSelectOneActionLists = (
    event: ChangeEvent<HTMLInputElement>,
    actionListId: string
  ): void => {
    if (!selectedActionLists.includes(actionListId)) {
      setSelectedActionLists((prevSelected) => [...prevSelected, actionListId]);
    } else {
      setSelectedActionLists((prevSelected) =>
        prevSelected.filter((id) => id !== actionListId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredActionLists = applyFilters(actionLists, filters);
  const paginatedActionLists = applyPagination(
    filteredActionLists,
    page,
    limit
  );
  const selectedSomeActionLists =
    selectedActionLists.length > 0 &&
    selectedActionLists.length < actionLists.length;
  const selectedAllActionLists =
    selectedActionLists.length === actionLists.length;
  const theme = useTheme();

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
                <InputLabel>リスト種類</InputLabel>
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
                  indeterminate={selectedSomeActionLists}
                  //onChange={handleSelectAllCompanyLists}
                />
              </TableCell>
              <TableCell align="center">企業名</TableCell>
              <TableCell align="center">行動日</TableCell>
              <TableCell align="center">リスト</TableCell>
              <TableCell align="center">担当者</TableCell>
              <TableCell align="center">行動結果</TableCell>
              <TableCell align="center">小項目</TableCell>
              <TableCell align="center">コメント</TableCell>
              <TableCell align="center">タスク</TableCell>
              <TableCell align="center">ユーザー</TableCell>
              <TableCell align="center">タスク期限</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedActionLists.map((actionList) => {
              const isActionListSelected = selectedActionLists.includes(
                actionList.id
              );
              return (
                <TableRow
                  hover
                  key={actionList.id}
                  //selected={isActionListSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      //checked={isactionffListSelected}
                      // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      //   handleSelectOneListtList(event, actionList.id)
                      // }
                      value={isActionListSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {actionList.companyName}
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
                      {actionList.actionDate}
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
                      {actionList.list}
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
                      {actionList.manager}
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
                      {actionList.actionResult}
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
                      {actionList.minorItem}
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
                      {actionList.comment}
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
                      {actionList.user}
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
                      {getStatusLabel(actionList.task)}
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
                      {actionList.taskDeadline}
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
          count={filteredActionLists.length}
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

ActionLists.propTypes = {
  actionLists: PropTypes.array.isRequired,
};

ActionLists.defaultProps = {
  actionLists: [],
};

export default ActionLists;
