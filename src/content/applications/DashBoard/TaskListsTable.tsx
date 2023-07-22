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
import { ChangeEvent, FC, FormEvent, useState } from "react";
import Label from "src/components/Label";

import axios from "axios";
import { useNavigate } from "react-router";
import { TaskList, TaskStatus } from "src/models/sales_task_list";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import { NavigatePath } from "src/utility/constants/NavigatePath";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import DashboardTaskLog from "../PopUp/DashboardTaskLog";
import TaskUpdate from "../PopUp/TaskUpdate";
import Search from "./Search";

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
          `${config().apiUrl}/corporationstaffs/id_name_bycorporation`,
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
        commonErrorCallback(error);
      }
    };
    getStaffs();

    setTaskList(taskList);
    if (taskList.status !== "completed") {
      setTaskLogOpen(true);
    }
  };

  const [selectedTaskLists] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters] = useState<Filters>({
    status: null,
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  // ユーザー
  const [staffName, setStaffName] = useState("");
  const staffNameChange = (staffName) => {
    setStaffName(staffName);
  };
  // 日付(から～)
  const [fromDate, setFromDate] = useState("");
  const fromDateChange = (fromDate) => {
    setFromDate(fromDate);
  };
  // 日付(～まで)
  const [toDate, setToDate] = useState("");
  const toDateChange = (toDate) => {
    setToDate(toDate);
  };
  // ステータス
  const [status, setStatus] = useState("");
  const statusChange = (status) => {
    setStatus(status);
  };
  // ユーザー絞り込み
  function matchStaffName(entity, searchvalue) {
    const result =
      entity !== null
        ? entity.staff_name.match(searchvalue)
        : searchvalue !== "" && searchvalue !== undefined
        ? ""
        : blank.match("");
    return result;
  }
  // 日付フォーマット
  function formatDateToISO(dateString) {
    if (!dateString) {
      return null;
    }
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    const isoDate = dateObj.toISOString().split("T")[0];
    return isoDate;
  }
  // 行動日絞り込み
  const blank = "";
  function filterDateInRange(date, startDate, endDate) {
    const currentDate = new Date(date);
    var formatStartDate = null;
    var formatEndDate = null;
    if (startDate !== null) {
      formatStartDate = new Date(startDate);
      formatStartDate.setDate(formatStartDate.getDate() + 1);
    }
    if (endDate !== null) {
      formatEndDate = new Date(endDate);
      formatEndDate.setDate(formatEndDate.getDate() + 1);
    }
    if (
      (formatStartDate && currentDate < formatStartDate) ||
      (formatEndDate && currentDate > formatEndDate)
    ) {
      return null;
    } else {
      return blank.match("");
    }
  }
  function searchStatus(value) {
    let status;

    switch (value) {
      case "完了":
        status = "completed";
        break;
      case "期限超過":
        status = "overdueday";
        break;
      case "未完了":
        status = "pending";
        break;
      case "本日期限":
        status = "dueday";
    }

    return status;
  }
  // 絞り込み
  let searchtaskLists = taskLists.filter(
    (taskList) =>
      matchStaffName(taskList.corporationstaffEntity, staffName) &&
      filterDateInRange(
        taskList.deadline,
        formatDateToISO(fromDate),
        formatDateToISO(toDate)
      ) &&
      taskList.status.match(searchStatus(status))
  );

  const filteredTaskLists = applyFilters(searchtaskLists, filters);
  const paginatedTaskLists = applyPagination(filteredTaskLists, page, limit);
  const theme = useTheme();

  const [taskUpdateOpen, setTaskUpdateOpen] = useState(false);
  const editTaskUpdateOpen = (e, taskList) => {
    if (taskList.status !== "completed") {
      setTaskList(taskList);
      setTaskUpdateOpen(true);
    }
  };
  const { mutate } = useWrapMuation<any, any>(
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
        action={
          <Search
            staffNameChange={staffNameChange}
            fromDateChange={fromDateChange}
            toDateChange={toDateChange}
            statusChange={statusChange}
          />
        }
      />
      <Divider />
      <DashboardTaskLog
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
              <TableCell align="left">ステータス</TableCell>
              <TableCell align="left">タスク</TableCell>
              <TableCell align="left">期日</TableCell>
              <TableCell align="left">架電先企業</TableCell>
              <TableCell align="left">架電先担当</TableCell>
              <TableCell align="left">電話番号</TableCell>
              <TableCell align="left">コメント</TableCell>
              <TableCell align="left">完了</TableCell>
              <TableCell align="left">編集</TableCell>
              <TableCell align="left">削除</TableCell>
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
                  <TableCell align="left">
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
                  <TableCell align="left">
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
                  <TableCell align="left">
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
                  <TableCell align="left">
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
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {taskList.corporationstaffEntity !== null
                        ? taskList.corporationstaffEntity.staff_name
                        : ""}
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
                      {"representative_phone_number" in
                      taskList.corporationEntity
                        ? taskList.corporationEntity.representative_phone_number
                        : ""}
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
                  <TableCell align="left">
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
                  <TableCell align="left">
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
          rowsPerPageOptions={[5, 10, 20, 30]}
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
