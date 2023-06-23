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

const ListCreate = ({ listCreateOpen, setListCreateOpen }) => {
  if (listCreateOpen) {
    const editListCreateClose = () => setListCreateOpen(false);
    const editModal = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 0,
      p: 20,
      minWidth: 600,
      minHeight: 300,
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
      <Modal open={listCreateOpen} onClose={editListCreateClose}>
        <Box sx={editModal}>
          <Typography sx={editModalTitle}>リストを作成</Typography>
          <Box
            sx={{
              position: "absolute",
              top: "0",
              right: "0",
              textAlign: "right",
              color: "white",
            }}
          >
            <IconButton onClick={editListCreateClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "3%",
              fontSize: "20px",
              pt: 1,
            }}
          >
            リスト名：
          </Box>
          <TextField
            variant="outlined"
            size="small"
            inputProps={{
              style: {
                width: 400,
              },
            }}
            sx={{
              position: "absolute",
              top: "20%",
              left: "25%",
              ml: 1,
              mt: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "3%",
              fontSize: "20px",
              pt: 1,
            }}
          >
            ユーザー：
          </Box>
          <FormControl
            size="small"
            sx={{
              position: "absolute",
              top: "40%",
              left: "25%",
              minWidth: "200px",
              ml: 1,
              mt: 1,
            }}
          >
            <Select>
              <MenuItem value={"UserA"}>ユーザーA</MenuItem>
              <MenuItem value={"UserB"}>ユーザーB</MenuItem>
              <MenuItem value={"UserC"}>ユーザーC</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              left: "3%",
              fontSize: "20px",
              pt: 1,
            }}
          >
            商材：
          </Box>
          <FormControl
            size="small"
            sx={{
              position: "absolute",
              top: "60%",
              left: "25%",
              minWidth: "200px",
              ml: 1,
              mt: 1,
            }}
          >
            <Select>
              <MenuItem value={"CommodityA"}>商材A</MenuItem>
              <MenuItem value={"CommodityB"}>商材B</MenuItem>
              <MenuItem value={"CommodityC"}>商材C</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{
              position: "absolute",
              top: "80%",
              left: "25%",
              ml: 1,
              mt: 1,
              minWidth: "300px",
            }}
          >
            リストを作成
          </Button>
        </Box>
      </Modal>
    );
  } else {
    return null;
  }
};

export default ListCreate;
