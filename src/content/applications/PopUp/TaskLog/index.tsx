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

const TaskLog = ({ taskLogOpen, setTaskLogOpen }) => {
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
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              right: "5%",
            }}
          >
            <Button type="submit" variant="contained">
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
            <FormControl fullWidth>
              <InputLabel>大項目</InputLabel>
              <Select>
                <MenuItem value={"BigItemA"}>大項目A</MenuItem>
                <MenuItem value={"BigItemB"}>大項目B</MenuItem>
                <MenuItem value={"BigItemC"}>大項目C</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel>小項目</InputLabel>
              <Select>
                <MenuItem value={"SmallItemA"}>小項目A</MenuItem>
                <MenuItem value={"SmallItemB"}>小項目B</MenuItem>
                <MenuItem value={"SmallItemC"}>小項目C</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel>担当者</InputLabel>
              <Select>
                <MenuItem value={"ManagerA"}>担当者A</MenuItem>
                <MenuItem value={"ManagerB"}>担当者B</MenuItem>
                <MenuItem value={"ManagerC"}>担当者C</MenuItem>
              </Select>
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel>次回アクション</InputLabel>
              <Select>
                <MenuItem value={"ActionA"}>アクションA</MenuItem>
                <MenuItem value={"ActionB"}>アクションB</MenuItem>
                <MenuItem value={"ActionC"}>アクションC</MenuItem>
              </Select>
            </FormControl>
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
              <DatePicker label="" />
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

export default TaskLog;
