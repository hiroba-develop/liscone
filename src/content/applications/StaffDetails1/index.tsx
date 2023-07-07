import { Container, Typography, Box, IconButton } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import StaffDetails1ListData from "./StaffDetails1ListData";
import StaffDetails1ReferenceListData from "./StaffDetails1ReferenceListData";

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
          {staffList.staff_name}
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "0",
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
