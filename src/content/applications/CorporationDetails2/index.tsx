import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import { CorporationList } from "src/models/corporation_details2_list";
import { SalesList } from "src/models/sales_list";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import CorporationDetails1ListData from "../CorporationDetails1/CorporationDetails1ListData";
import CorporationDetails1ReferenceListData from "../CorporationDetails1/CorporationDetails1ReferenceListData";
import SalesCorpInfo from "./SalesCorpInfo";

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
        <title>企業詳細②</title>
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
          　{corporationList.corporation_name}(法人番号:
          {corporationList.corporate_number})
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
              navigate("/salesTask/salesListCorporationDetails", {
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
            ml: 3,
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
            {corporationList.representative_phone_number}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "125px",
            left: "25%",
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
            {corporationList.home_page}
          </Typography>
        </Box>
        <SalesCorpInfo
          corporationList={corporationList}
          salesList={salesList}
        />
        <Box sx={{ mt: 12 }}>
          <CorporationDetails1ReferenceListData {...corporationList} />
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
