import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
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
  Typography,
  useTheme,
  CardHeader,
  Grid,
  Autocomplete,
  TextField,
  Stack,
} from "@mui/material";
import Label from "src/components/Label";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { TaskList, TaskStatus } from "src/models/task_list";
import TaskUpdate from "../PopUp/TaskUpdate";
import Sort from "./Sort";

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
      text: "failed",
      color: "error",
    },
    completed: {
      text: "completed",
      color: "success",
    },
    pending: {
      text: "pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[taskStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (taskLists: TaskList[], filters: Filters): TaskList[] => {
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
  const [selectedTaskLists, setSelectedTaskLists] = useState<string[]>([]);
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

  const filteredTaskLists = applyFilters(taskLists, filters);
  const paginatedTaskLists = applyPagination(filteredTaskLists, page, limit);
  const theme = useTheme();

  const [taskUpdateOpen, setTaskUpdateOpen] = useState(false);
  const editTaskUpdateOpen = () => setTaskUpdateOpen(true);

  return (
    <Card>
      <CardHeader
        title={
          <Typography fontWeight="bold" sx={{ fontSize: "20px" }}>
            タスク
          </Typography>
        }
        sx={{ mt: -2 }}
        action={<Sort />}
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">　</TableCell>
              <TableCell align="center">ステータス</TableCell>
              <TableCell align="center">タスク</TableCell>
              <TableCell align="center">期日</TableCell>
              <TableCell align="center">架電先企業</TableCell>
              <TableCell align="center">架電先担当</TableCell>
              <TableCell align="center">電話番号</TableCell>
              <TableCell align="center">コメント</TableCell>
              <TableCell align="center">完了</TableCell>
              <TableCell align="center">編集</TableCell>
              <TableCell align="center">削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTaskLists.map((taskList) => {
              const isTaskListSelected = selectedTaskLists.includes(
                taskList.id
              );
              return (
                <TableRow hover key={taskList.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" value={isTaskListSelected} />
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
                      {format(taskList.dueDate, "MMMM dd yyyy")}
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
                  <TableCell padding="checkbox">
                    <Checkbox color="success" value={isTaskListSelected} />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={editTaskUpdateOpen}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <TaskUpdate
                      taskUpdateOpen={taskUpdateOpen}
                      setTaskUpdateOpen={setTaskUpdateOpen}
                    />
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
  taskLists: PropTypes.array.isRequired,
};

TaskLists.defaultProps = {
  taskLists: [],
};

export default TaskLists;
