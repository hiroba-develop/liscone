import {
  Box,
  FormControl,
  InputLabel,
  IconButton,
  Select,
  MenuItem,
  Typography,
  Modal,
  Button,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TaskUpdate = ({ taskUpdateOpen, setTaskUpdateOpen }) => {
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
            <FormControl fullWidth>
              <InputLabel>次回アクション</InputLabel>
              <Select>
                <MenuItem value={"Call"}>架電</MenuItem>
                <MenuItem value={"Mail"}>メール</MenuItem>
                <MenuItem value={"WebinarInformation"}>ウェビナー案内</MenuItem>
                <MenuItem value={"SendDocument"}>資料送付</MenuItem>
                <MenuItem value={"FormSend"}>フォーム送信</MenuItem>
                <MenuItem value={"Meeting"}>ミーティング</MenuItem>
              </Select>
            </FormControl>
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
              <DatePicker label="" />
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
            <FormControl fullWidth>
              <InputLabel>氏名</InputLabel>
              <Select>
                <MenuItem value={"Ootomo"}>大友</MenuItem>
                <MenuItem value={"Sato"}>佐藤</MenuItem>
                <MenuItem value={"Suzuki"}>鈴木</MenuItem>
              </Select>
            </FormControl>
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
      </Modal>
    );
  } else {
    return null;
  }
};

export default TaskUpdate;
