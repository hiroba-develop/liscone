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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";

const TaskLog = ({
  taskLogOpen,
  setTaskLogOpen,
  staffList,
  corporationList,
}) => {
  const current = new Date();
  const today = `${current.getFullYear()}-${
    current.getMonth() < 10 ? "0" : ""
  }${current.getMonth() + 1}-${
    current.getDate() < 10 ? "0" : ""
  }${current.getDate()}`;
  const members = useRecoilValue(membersAtom);
  const auth = useRecoilValue(authAtom);
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
  const [ActionSelected2, setActionSelected2] = useState("");
  const handleActionSelect2 = (e) => {
    setActionSelected2(e.target.value);
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
    ["createTask"],
    async (data) => {
      // 新規タスク
      const param = {
        task_name: ActionSelected,
        member_id: auth.userId,
        sales_list_number: corporationList.sales_list_number,
        sales_corporation_id: corporationList.corporation_id,
        sales_staff_id: StaffSelected,
        execute_date: BRSelected !== "" || SRSelected !== "" ? today : "",
        execute_big_result: BRSelected,
        execute_small_result: SRSelected,
        comment: comments,
      };

      await post<any>(`${config().apiUrl}/salesTasks/createTask`, param);
      if (ActionSelected2) {
        // 次回タスク
        const param = {
          member_id: MemberSelected,
          task_name: ActionSelected2,
          sales_list_number: corporationList.sales_list_number,
          sales_corporation_id: corporationList.corporation_id,
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
        setTaskLogOpen(false);
      },
      onError: (error) => {
        commonErrorCallback(error);
        alert(error.response.data.message);
      },
    }
  );

  const updateAndCreateTask = (e: FormEvent) => {
    e.preventDefault();
    mutate(corporationList);
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

    // const getTaskName = (taskName) => {
    //   const action = CODE.ACTION.find((e) => e.key === taskName);
    //   return action.code;
    // };

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
                sx={{ my: 5, borderRadius: 0.5, backgroundColor: "#109DBC" }}
                fullWidth
                variant="contained"
                type="submit"
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
                select
                label="アクション"
                value={ActionSelected}
                onChange={handleActionSelect}
              >
                {CODE.ACTION.map((option) => (
                  <MenuItem value={option.key}>{option.code}</MenuItem>
                ))}
              </TextField>
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
                {CODE.BIG_RESULT.map((option) => (
                  <MenuItem value={option.key}>{option.code}</MenuItem>
                ))}
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
                {CODE.SMALL_RESULT.map((option) => (
                  <MenuItem value={option.key}>{option.code}</MenuItem>
                ))}
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
              架電先：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "40%",
                left: "25%",
                minWidth: 300,
                mt: 2,
                ml: 2,
              }}
            >
              <TextField
                id="staff"
                fullWidth
                select
                label="担当者"
                value={StaffSelected}
                onChange={handleStaffSelect}
              >
                {staffList.map((option) => (
                  <MenuItem value={option.staff_id}>
                    {option.staff_name}
                  </MenuItem>
                ))}
              </TextField>
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
                value={ActionSelected2}
                onChange={handleActionSelect2}
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
                <DatePicker
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
                label="営業担当者"
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

export default TaskLog;
