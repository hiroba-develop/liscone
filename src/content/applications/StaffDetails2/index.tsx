import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
<<<<<<< Updated upstream
import Search from "./Search";
=======
import Sort from "./Sort";
import StaffDetails1ReferenceListData from "../StaffDetails1/StaffDetails1ReferenceListData";
import StaffDetails1ListData from "../StaffDetails1/StaffDetails1ListData";
>>>>>>> Stashed changes

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();

  type StaffListRoles = "all" | "marketing" | "sales";
  type StaffListPositions = "general" | "sectionManager" | "generalManager";

  const staffList = location.state as {
    staff_id: string;
    corporation_id: string;
    corporation_name: string;
    job_position: StaffListPositions;
    role: StaffListRoles;
    staff_name: string;
    profile_source_type: string;
    profile_link: string;
    other_information: string;
    corporationEntity: {
      corporation_name: string;
      corporation_id: string;
    };
  };
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
<<<<<<< Updated upstream
        <Search />
        <StaffDetails2ReferenceListData />
        <StaffDetails2ListData />
=======
        <Sort />
        <StaffDetails1ReferenceListData staffList={staffList} />
        <StaffDetails1ListData staffList={staffList} />
>>>>>>> Stashed changes
        <ActionHistoryListData />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
