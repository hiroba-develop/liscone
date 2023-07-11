import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import { SalesDetailsList } from "src/models/sales_details_list";
import { SalesList } from "src/models/sales_list";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import StaffDetails1ListData from "../StaffDetails1/StaffDetails1ListData";
import StaffDetails1ReferenceListData from "../StaffDetails1/StaffDetails1ReferenceListData";
import Search from "./Search";
import { StaffList } from "src/models/staff_list";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();

  const [staffList, salesList] = location.state as [StaffList, SalesList];

  return (
    <>
      <Helmet>
        <title>担当者詳細②</title>
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
          <IconButton
            onClick={() =>
              navigate("/salesTask/salesListDetails", {
                state: salesList,
              })
            }
          >
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Search
          corporationList={staffList.corporationEntity}
          salesList={salesList}
        />
        <Box
          sx={{
            position: "relative",
            top: "100px",
            color: "gray",
          }}
        >
          <StaffDetails1ReferenceListData staffList={staffList} />
        </Box>
        <Box sx={{ mt: 15 }}>
          <StaffDetails1ListData staffList={staffList} />
        </Box>
        <ActionHistoryListData />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
