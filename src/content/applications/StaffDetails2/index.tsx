import { Container, Typography, Box, IconButton, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import StaffDetails2ListData from "./StaffDetails2ListData";
import StaffDetails2ReferenceListData from "./StaffDetails2ReferenceListData";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import Sort from "./Sort";

function Lists() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>リスト詳細</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography
          sx={{
            position: "absolute",
            top: "70px",
            left: "0",
            width: "105%",
            color: "white",
            bgcolor: "#66788A",
            ml: -2,
            py: 1,
            pl: 2,
            fontSize: 20,
          }}
        >
          大友玲菜
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "0",
            color: "white",
          }}
        >
          <IconButton onClick={() => navigate("/salesTask/salesListDetails")}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Sort />
        <StaffDetails2ReferenceListData />
        <StaffDetails2ListData />
        <ActionHistoryListData />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
