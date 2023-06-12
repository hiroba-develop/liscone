import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { TaskList, TaskStatus } from 'src/models/task_list'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface TaskListsProps {
  className?: string;
  taskLists: TaskList[];
}

interface Filters {
  status?: TaskStatus;
}

const getStatusLabel = (taskStatus: TaskStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'failed',
      color: 'error'
    },
    completed: {
      text: 'completed',
      color: 'success'
    },
    pending: {
      text: 'pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[taskStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  taskLists: TaskList[],
  filters: Filters
): TaskList[] => {
  return taskLists.filter((taskList) => {
    let matches = true;

    if (filters.status && taskList.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  taskLists: TaskList[],
  page: number,
  limit: number
): TaskList[] => {
  return taskLists.slice(page * limit, page * limit + limit);
};

const TaskLists: FC<TaskListsProps> = ({ taskLists }) => {
  const [selectedTaskLists, setSelectedTaskLists] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedTaskLists.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'completed'
    },
    {
      id: 'pending',
      name: 'pending'
    },
    {
      id: 'failed',
      name: 'failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllTaskLists = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedTaskLists(
      event.target.checked
        ? taskLists.map((taskList) => taskList.id)
        : []
    );
  };

  const handleSelectOneTaskList = (
    event: ChangeEvent<HTMLInputElement>,
    taskListId: string
  ): void => {
    if (!selectedTaskLists.includes(taskListId)) {
      setSelectedTaskLists((prevSelected) => [
        ...prevSelected,
        taskListId
      ]);
    } else {
      setSelectedTaskLists((prevSelected) =>
        prevSelected.filter((id) => id !== taskListId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredTaskLists = applyFilters(taskLists, filters);
  const paginatedTaskLists = applyPagination(
    filteredTaskLists,
    page,
    limit
  );
  const selectedSomeTaskLists =
    selectedTaskLists.length > 0 &&
    selectedTaskLists.length < taskLists.length;
  const selectedAllTaskLists =
    selectedTaskLists.length === taskLists.length;
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
                <InputLabel>ステータス</InputLabel>
                <Select
                  value={filters.status || 'all'}
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
          title="タスク"
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
                  //checked={selectedAllTaskLists}
                  indeterminate={selectedSomeTaskLists}
                  //onChange={handleSelectAllTaskLists}
                />
              </TableCell>
              <TableCell align="center">ステータス</TableCell>
              <TableCell align="center">タスク</TableCell>
              <TableCell align="center">期日</TableCell>
              <TableCell align="center">架電先企業</TableCell>
              <TableCell align="center">架電先担当</TableCell>
              <TableCell align="center">電話番号</TableCell>
              <TableCell align="center">コメント</TableCell>
              <TableCell align="center">行動</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTaskLists.map((taskList) => {
              const isTaskListSelected = selectedTaskLists.includes(
                taskList.id
              );
              return (
                <TableRow
                  hover
                  key={taskList.id}
                  //selected={isTaskListSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      // checked={isTaskListSelected}
                      // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      //   handleSelectOneTaskList(event, taskList.id)
                      // }
                      value={isTaskListSelected}
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
                      {getStatusLabel(taskList.status)}
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
                      {taskList.task}
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
                      {format(taskList.dueDate, 'MMMM dd yyyy')}
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
                      {taskList.companyToCall}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {taskList.companyToCall}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {taskList.chargeOfCalling}                      
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {taskList.phoneNumber}                      
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {taskList.comment}                      
                    </Typography>
                  </TableCell>
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredTaskLists.length}
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

TaskLists.propTypes = {
  taskLists: PropTypes.array.isRequired
};

TaskLists.defaultProps = {
  taskLists: []
};

export default TaskLists;
