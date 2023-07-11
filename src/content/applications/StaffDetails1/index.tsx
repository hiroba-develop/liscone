import { Container, Typography, Box, IconButton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import StaffDetails1ListData from "./StaffDetails1ListData";
import StaffDetails1ReferenceListData from "./StaffDetails1ReferenceListData";
import { StaffList } from "src/models/staff_list";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();

  const staffList = location.state as StaffList;

  return (
    <>
      <Helmet>
        <title>担当者詳細①</title>
      </Helmet>
      <Container maxWidth="lg">
        <Typography
          sx={{
            position: "absolute",
            top: "70px",
            left: "0",
            width: "99%",
            color: "white",
            bgcolor: "#66788A",
            py: 1,
            fontSize: 20,
          }}
        >
          {staffList.staff_name}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "75px",
            pl: "93%",
            color: "white",
          }}
        >
          <IconButton onClick={() => navigate("/staff/staffList")}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box sx={{ mt: 7.5 }}>
          <StaffDetails1ReferenceListData staffList={staffList} />
        </Box>
        <Typography
          sx={{
            position: "absolute",
            top: "320px",
            left: "2%",
            color: "gray",
            fontSize: 24,
          }}
        >
          会社候補
        </Typography>
        <Box sx={{ mt: 10 }}>
          <StaffDetails1ListData staffList={staffList} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
