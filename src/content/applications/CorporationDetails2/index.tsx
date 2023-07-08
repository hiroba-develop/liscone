import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import CorporationDetails1ListData from "../CorporationDetails1/CorporationDetails1ListData";
import CorporationDetails1ReferenceListData from "../CorporationDetails1/CorporationDetails1ReferenceListData";
import Sort from "./Sort";
import { CorporationList } from "src/models/corporation_details2_list";
import { SalesList } from "src/models/sales_list";
import { Label } from "@mui/icons-material";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);
  const [corporationList, salesList] = location.state as [
    CorporationList,
    SalesList
  ];
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
          {corporationList.corporation.corporation_name}(法人番号:
          {corporationList.corporation.corporate_number})
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "0",
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
        <Box
          sx={{
            position: "absolute",
            top: "125px",
            left: "0",
            color: "gray",
            mt: 1,
            ml: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <PhoneInTalkIcon />
          <Typography
            sx={{
              fontSize: 16,
              ml: 1,
            }}
          >
            {corporationList.corporation.representative_phone_number}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "125px",
            left: "15%",
            color: "gray",
            mt: 1,
            ml: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <WebAssetIcon />
          <Typography
            sx={{
              fontSize: 16,
              ml: 1,
            }}
          >
            {corporationList.corporation.home_page}
          </Typography>
        </Box>
        <Sort {...corporationList.corporation} {...salesList} />
        <Box sx={{ mt: 25 }}>
          <CorporationDetails1ReferenceListData
            {...corporationList.corporation}
          />
        </Box>
        <Box sx={{ mt: 5 }}>
          <CorporationDetails1ListData {...corporationList} />
        </Box>
        <ActionHistoryListData />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
