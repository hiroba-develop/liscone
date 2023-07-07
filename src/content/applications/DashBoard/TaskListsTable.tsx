import {
  Box,
  Button,
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
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Label from "src/components/Label";

import { TaskList, TaskStatus } from "src/models/sales_task_list";
import TaskLog from "../PopUp/TaskLog";
import TaskUpdate from "../PopUp/TaskUpdate";
import Sort from "./Sort";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { useNavigate } from "react-router";
import { NavigatePath } from "src/utility/constants/NavigatePath";

interface SalesTaskListsProps {
  className?: string;
  taskLists: TaskList[];
}

interface Filters {
  status?: TaskStatus;
}
const getTaskName = (taskName) => {
  const action = CODE.ACTION.find((e) => e.key === taskName);
  return action.code;
};

const getStatusLabel = (taskStatus: TaskStatus): JSX.Element => {
  const map = {
    overdueday: {
      text: "期限超過",
      color: "error",
    },
    completed: {
      text: "完了",
      color: "success",
    },
    pending: {
      text: "未完了",
      color: "info",
    },
    dueday: {
      text: "本日期限",
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

const TaskLists: FC<SalesTaskListsProps> = ({ taskLists }) => {
  const navigate = useNavigate();

  const [taskLogOpen, setTaskLogOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [staffList, setStaffs] = useState([]);
  const editTaskLogOpen = (taskList) => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/companystaffs/id_name_byCompany`,
          {
            params: {
              corporationId: taskList.corporationEntity.corporation_id,
            },
          }
        );

        if (response.statusText === "OK") {
          setStaffs(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getStaffs();

    setTaskList(taskList);
    if (taskList.status !== "completed") {
      setTaskLogOpen(true);
    }
  };

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
  const editTaskUpdateOpen = (e, taskList) => {
    if (taskList.status !== "completed") {
      setTaskList(taskList);
      setTaskUpdateOpen(true);
    }
  };
  const { mutate, isError } = useWrapMuation<any, any>(
    ["deleteTask"],
    async (data) => {
      const param = {
        task_number: data.task_number,
      };

      return await post<any>(`${config().apiUrl}/salesTasks/deleteTask`, param);
    },
    {
      onSuccess: (data) => {
        navigate(`/${NavigatePath.DASHBOARD}`);
      },
      onError: (error) => {
        commonErrorCallback(error);
        alert(error.response.data.message);
      },
    }
  );

  const deleteTask = (e: FormEvent, taskList) => {
    e.preventDefault();
    mutate(taskList);
  };
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
      <TaskLog
        taskLogOpen={taskLogOpen}
        setTaskLogOpen={setTaskLogOpen}
        taskList={taskList}
        staffList={staffList}
      />
      <TaskUpdate
        taskUpdateOpen={taskUpdateOpen}
        setTaskUpdateOpen={setTaskUpdateOpen}
        taskList={taskList}
      />
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
                taskList.task_number
              );
              return (
                <TableRow hover key={taskList.task_number}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" value={isTaskListSelected} />
                  </TableCell>
                  <TableCell align="center">
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
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getTaskName(taskList.task_name)}
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
                      {taskList.deadline}
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
                      {"corporation_name" in taskList.corporationEntity
                        ? taskList.corporationEntity.corporation_name
                        : ""}
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
                      {taskList.companystaffEntity !== null
                        ? taskList.companystaffEntity.staff_name
                        : ""}
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
                      {"representative_phone_number" in
                      taskList.corporationEntity
                        ? taskList.corporationEntity.representative_phone_number
                        : ""}
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
                      {taskList.comment}
                    </Typography>
                  </TableCell>
                  <TableCell padding="checkbox">
                    <Tooltip title="Task Complete" arrow>
                      <Button
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        startIcon={
                          <img src="/static/images/tickbox.svg" alt="tickbox" />
                        }
                        onClick={() => editTaskLogOpen(taskList)}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit" arrow>
                      <Button
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        startIcon={
                          <img src="/static/images/Edit.svg" alt="edit" />
                        }
                        onClick={(e) => editTaskUpdateOpen(e, taskList)}
                      ></Button>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete" arrow>
                      <Button
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                        startIcon={
                          <img src="/static/images/Delete.svg" alt="delete" />
                        }
                        onClick={(e) => deleteTask(e, taskList)}
                      ></Button>
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
  taskLists: PropTypes.array.isRequired,
};

TaskLists.defaultProps = {
  taskLists: [],
};

export default TaskLists;
