import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FormEvent, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import axios from "axios";
const DashboardTaskLog = ({
  taskLogOpen,
  setTaskLogOpen,
  taskList,
  staffList,
}) => {
  interface TasklogStaffList {
    saleslist_created: string;
    saleslist_created_by: string;
    saleslist_member_id: string;
    saleslist_modified: string;
    saleslist_modified_by: string;
    saleslist_sales_list_name: string;
    saleslist_sales_list_number: string;
    saleslist_sales_list_type: string;
    saleslist_sales_product_number: string;
  }
  const [salesList, setSalesList] = useState<TasklogStaffList>();
  useEffect(() => {
    const getSaleslist = async () => {
      try {
        const responseSalesList = await axios.get(
          `${config().apiUrl}/saleslists/saleslistnumber`,
          {
            params: {
              salesListNumber: taskList.sales_list_number,
            },
          }
        );
        if (responseSalesList.statusText === "OK") {
          setSalesList(responseSalesList.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };
    getSaleslist();
  }, [taskList.sales_list_number]);

  const current = new Date();
  const today = `${current.getFullYear()}-${
    current.getMonth() < 10 ? "0" : ""
  }${current.getMonth() + 1}-${
    current.getDate() < 10 ? "0" : ""
  }${current.getDate()}`;
  const members = useRecoilValue(membersAtom);
  const [MemberSelected, setMemberSelected] = useState("");
  const handleMemberSelect = (e) => {
    setMemberSelected(e.target.value);
  };

  const [BRSelected, setBRSelected] = useState("");
  const handleBRSelect = (e) => {
    setBRSelected(e.target.value);
  };

  const [SRSelected, setSRSelected] = useState("");
  const handleSRSelect = (e) => {
    setSRSelected(e.target.value);
  };

  const [StaffSelected, setStaffSelected] = useState("");
  const handleStaffSelect = (e) => {
    setStaffSelected(e.target.value);
  };

  const [ActionSelected, setActionSelected] = useState("");
  const handleActionSelect = (e) => {
    setActionSelected(e.target.value);
  };
  const [startDate, setStartDate] = useState("");
  const handleDateSelect = (e) => {
    const formated = dayjs(e).format("YYYY-MM-DD");
    setStartDate(formated);
  };
  const [comments, setComments] = useState("");
  const handleComments = (e) => {
    setComments(e.target.value);
  };
  const { mutate } = useWrapMuation<any, any>(
    ["updateAndCreateTask"],
    async (data) => {
      const param = {
        task_number: data.task_number,
        execute_date: today,
        execute_big_result: BRSelected,
        execute_small_result: SRSelected,
        sales_staff_id:
          salesList.saleslist_sales_list_type === "01"
            ? StaffSelected
            : taskList.corporationstaffEntity.staff_id,
      };
      await post<any>(`${config().apiUrl}/salesTasks/updateTask`, param);
      if (ActionSelected) {
        const param = {
          member_id: MemberSelected,
          task_name: ActionSelected,
          sales_list_number: taskList.sales_list_number,
          sales_corporation_id:
            taskList.corporationEntity !== null
              ? taskList.corporationEntity.corporation_id
              : "",
          deadline: startDate,
          comment: comments,
        };
        return await post<any>(
          `${config().apiUrl}/salesTasks/createTask`,
          param
        );
      }
    },
    {
      onSuccess: (data) => {
        alert("登録完了しました");
        setTaskLogOpen(false);
        window.location.reload();
      },
      onError: (error) => {
        alert("エラーが発生しました");
        commonErrorCallback(error);
        alert(error.response.data.message);
      },
    }
  );

  const updateAndCreateTask = (e: FormEvent) => {
    e.preventDefault();
    mutate(taskList);
  };

  if (taskLogOpen) {
    const taskLogClose = () => setTaskLogOpen(false);
    const editModal = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 0,
      p: 20,
      minWidth: 800,
      minHeight: 600,
      width: "auto",
    };
    const editModalTitle = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      color: "white",
      bgcolor: "#66788A",
      py: 1,
      pl: 2,
      fontSize: 20,
    };

    const getTaskName = (taskName) => {
      const action = CODE.ACTION.find((e) => e.key === taskName);
      return action.code;
    };

    const getStaffName = (salesList, taskList) => {
      if (salesList.saleslist_sales_list_type === "01") {
        return (
          <TextField
            id="staff"
            fullWidth
            select
            label="担当者"
            value={StaffSelected}
            onChange={handleStaffSelect}
          >
            {staffList.map((option) => (
              <MenuItem value={option.staff_id}>{option.staff_name}</MenuItem>
            ))}
          </TextField>
        );
      } else {
        return (
          <TextField
            fullWidth
            disabled
            defaultValue={
              taskList.corporationstaffEntity === null
                ? ""
                : taskList.corporationstaffEntity.staff_name
            }
          />
        );
      }
    };

    return (
      <Modal open={taskLogOpen} onClose={taskLogClose}>
        <Box sx={editModal}>
          <Typography sx={editModalTitle}>行動ログを記録</Typography>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              textAlign: "right",
              color: "white",
            }}
          >
            <IconButton onClick={taskLogClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box component={"form"} onSubmit={(e) => updateAndCreateTask(e)}>
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                right: "5%",
              }}
            >
              <Button
                type="submit"
                sx={{ my: 5, borderRadius: 0.5, backgroundColor: "#109DBC" }}
                fullWidth
                variant="contained"
              >
                行動ログを記録
              </Button>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "3%",
                fontWeight: "fontWeightBold",
                fontSize: "20px",
                pt: 1,
              }}
            >
              行動：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "20%",
                left: "25%",
                minWidth: 150,
                ml: 2,
              }}
            >
              <TextField
                fullWidth
                disabled
                value={getTaskName(taskList.task_name)}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                left: "3%",
                fontSize: "20px",
                mt: 1,
                pt: 1,
              }}
            >
              結果：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                left: "25%",
                minWidth: 150,
                mt: 1,
                ml: 2,
              }}
            >
              <TextField
                fullWidth
                id="bigResult"
                select
                label="大項目"
                value={BRSelected}
                onChange={handleBRSelect}
              >
                {taskList.task_name === "AC01"
                  ? CODE.BIG_RESULT_AC01.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : taskList.task_name === "AC02"
                  ? CODE.BIG_RESULT_AC02.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : taskList.task_name === "AC03"
                  ? CODE.BIG_RESULT_AC03.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : taskList.task_name === "AC04"
                  ? CODE.BIG_RESULT_AC04.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : ""}
              </TextField>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                left: "45%",
                minWidth: 150,
                mt: 1,
                ml: 2,
              }}
            >
              <TextField
                fullWidth
                id="smallResult"
                select
                label="小項目"
                value={SRSelected}
                onChange={handleSRSelect}
              >
                {BRSelected === "BR01"
                  ? CODE.SMALL_RESULT_BR01.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR02"
                  ? CODE.SMALL_RESULT_BR02.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR03"
                  ? CODE.SMALL_RESULT_BR03.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR04"
                  ? CODE.SMALL_RESULT_BR04.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR05"
                  ? CODE.SMALL_RESULT_BR05.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR06"
                  ? CODE.SMALL_RESULT_BR06.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR07"
                  ? CODE.SMALL_RESULT_BR07.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR08"
                  ? CODE.SMALL_RESULT_BR08.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : BRSelected === "BR09"
                  ? CODE.SMALL_RESULT_BR09.map((option) => (
                      <MenuItem value={option.key}>{option.code}</MenuItem>
                    ))
                  : ""}
              </TextField>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "40%",
                left: "3%",
                fontSize: "20px",
                mt: 2,
                pt: 1,
              }}
            >
              営業先：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "40%",
                left: "25%",
                minWidth: 250,
                mt: 2,
                ml: 2,
              }}
            >
              {getStaffName(salesList, taskList)}
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "55%",
                left: "3%",
                fontSize: "20px",
                pt: 1,
              }}
            >
              次回アクション：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "55%",
                left: "25%",
                minWidth: 150,
                ml: 2,
              }}
            >
              <TextField
                id="nextaction"
                fullWidth
                select
                label="次回アクション"
                value={ActionSelected}
                onChange={handleActionSelect}
              >
                {CODE.ACTION.map((option) => (
                  <MenuItem value={option.key}>{option.code}</MenuItem>
                ))}
              </TextField>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{
                  position: "absolute",
                  top: "55%",
                  left: "45%",
                  p: 0,
                  ml: 3,
                  maxWidth: 200,
                }}
              >
                <DesktopDatePicker
                  value={startDate}
                  format={"YYYY-MM-DD"}
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  onChange={(e) => {
                    handleDateSelect(e);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Box
              sx={{
                position: "absolute",
                top: "55%",
                left: "70%",
                minWidth: 150,
                ml: 5,
              }}
            >
              <TextField
                id="members"
                select
                label="ユーザー"
                value={MemberSelected}
                style={{ width: 150 }}
                onChange={handleMemberSelect}
              >
                {members.map((option) => (
                  <MenuItem value={option.member_id}>
                    {option.member_name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "65%",
                left: "3%",
                fontSize: "20px",
                mt: 2,
                pt: 0.5,
              }}
            >
              コメント：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "65%",
                left: "25%",
                mt: 2,
                ml: 2,
              }}
            >
              <TextField
                id="comments"
                variant="outlined"
                multiline
                value={comments}
                onChange={handleComments}
                inputProps={{
                  style: {
                    width: 500,
                    height: 100,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  } else {
    return null;
  }
};

export default DashboardTaskLog;
