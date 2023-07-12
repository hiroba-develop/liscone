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
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import { NavigatePath } from "src/utility/constants/NavigatePath";
import {
  commonErrorCallback,
  post,
  useWrapMuation,
} from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";

const TaskUpdate = ({ taskUpdateOpen, setTaskUpdateOpen, taskList }) => {
  const navigate = useNavigate();
  const members = useRecoilValue(membersAtom);
  const [MemberSelected, setMemberSelected] = useState(taskList.member_id);
  const handleMemberSelect = (e) => {
    setMemberSelected(e.target.value);
  };
  const [ActionSelected, setActionSelected] = useState(taskList.task_name);
  const handleActionSelect = (e) => {
    setActionSelected(e.target.value);
  };

  const [startDate, setStartDate] = useState("");
  const handleDateSelect = (e) => {
    const formated = dayjs(e).format("YYYY-MM-DD");
    setStartDate(formated);
  };
  const { mutate } = useWrapMuation<any, any>(
    ["updateSalesTask"],
    async (data) => {
      const param = {
        task_number: data.task_number,
        task_name: ActionSelected,
        deadline: startDate,
        member_id: MemberSelected,
      };

      await post<any>(`${config().apiUrl}/salesTasks/updateSalesTask`, param);
    },
    {
      onSuccess: (data) => {
        setTaskUpdateOpen(false);
        navigate(`/${NavigatePath.DASHBOARD}`);
      },
      onError: (error) => {
        commonErrorCallback(error);
        alert(error.response.data.message);
      },
    }
  );

  const updateSalesTask = (e: FormEvent) => {
    e.preventDefault();
    mutate(taskList);
  };
  if (taskUpdateOpen) {
    const editTaskUpdateClose = () => setTaskUpdateOpen(false);
    const editModal = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 0,
      p: 20,
      minWidth: 800,
      minHeight: 400,
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
    return (
      <Modal open={taskUpdateOpen} onClose={editTaskUpdateClose}>
        <Box sx={editModal}>
          <Typography sx={editModalTitle}>タスクを更新</Typography>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              textAlign: "right",
              color: "white",
            }}
          >
            <IconButton onClick={editTaskUpdateClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box component={"form"} onSubmit={(e) => updateSalesTask(e)}>
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                right: "5%",
              }}
            >
              <Button type="submit" variant="contained">
                タスクを更新
              </Button>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "30%",
                left: "3%",
                fontWeight: "fontWeightBold",
                fontSize: "20px",
                pt: 1,
              }}
            >
              次回アクション：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "30%",
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
                key={taskList.task_name}
                defaultValue={taskList.task_name}
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
                  top: "30%",
                  left: "45%",
                  p: 0,
                  ml: 3,
                  maxWidth: 200,
                }}
              >
                <DatePicker
                  value={dayjs(new Date(taskList.deadline))}
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
                top: "30%",
                left: "70%",
                minWidth: 150,
                ml: 5,
              }}
            >
              <TextField
                id="members"
                select
                label="営業担当者"
                key={taskList.member_id}
                defaultValue={taskList.member_id}
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
                top: "50%",
                left: "10%",
                fontSize: "20px",
                pt: 0.5,
              }}
            >
              コメント：
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "25%",
                ml: 2,
              }}
            >
              <TextField
                variant="outlined"
                multiline
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

export default TaskUpdate;
