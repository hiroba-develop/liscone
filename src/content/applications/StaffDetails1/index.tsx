import { Container, Typography, Box, IconButton, Grid } from "@mui/material";
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
        <Grid container spacing={2}>
          <Grid item lg={2}>
            <Typography
              sx={{
                position: "flex",
                top: "40px",
                color: "gray",
                bgcolor: "#F6F6FA",
                py: 1,
                fontSize: 20,
              }}
            >
              {staffList.staff_name}
            </Typography>
          </Grid>
          <Grid item lg={2}>
            <Box
              sx={{
                position: "flex",
                top: "40px",
                pl: 100,
              }}
            >
              <IconButton onClick={() => navigate("/staff/staffList")}>
                <CloseIcon
                  sx={{
                    color: "gray",
                  }}
                />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <StaffDetails1ReferenceListData staffList={staffList} />
        </Box>
        <Typography
          sx={{
            position: "flex",
            mt: 10,
            left: "2%",
            color: "gray",
            fontSize: 24,
          }}
        >
          会社候補
        </Typography>
        <Box>
          <StaffDetails1ListData staffList={staffList} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
