import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import { SalesList } from "src/models/sales_list";
import { StaffDetails2List } from "src/models/staff_details2_list";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import SalesCorpInfo from "./SalesStaffInfo";
import StaffDetails2ListData from "./StaffDetails2ListData";
import StaffDetails2ReferenceListData from "./StaffDetails2ReferenceListData";
import { SalesListStatistic } from "src/models/sales_list_statistic";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();

  const [staffList, salesList, salesListStatistic] = location.state as [
    StaffDetails2List,
    SalesList,
    SalesListStatistic
  ];

  return (
    <>
      <Helmet>
        <title>担当者詳細②</title>
      </Helmet>
      <Typography
        sx={{
          position: "absolute",
          top: "64px",
          left: "0",
          width: "100%",
          color: "white",
          bgcolor: "#66788A",
          py: 1,
          fontSize: 20,
        }}
      >
        　{staffList.staff.staff_name}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "64px",
          pl: "95%",
          color: "white",
        }}
      >
        <IconButton
          onClick={() =>
            navigate("/salesTask/salesListStaffDetails", {
              state: [salesList, salesListStatistic],
            })
          }
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <Container maxWidth="lg">
        <SalesCorpInfo staffList={staffList} salesList={salesList} />
        <Box
          sx={{
            position: "relative",
            top: "100px",
            color: "gray",
          }}
        >
          <StaffDetails2ReferenceListData staffList={staffList} />
        </Box>
        <Box sx={{ mt: 15 }}>
          <StaffDetails2ListData staffList={staffList} />
        </Box>
        <ActionHistoryListData salesList={salesList} listDetails={staffList} />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
