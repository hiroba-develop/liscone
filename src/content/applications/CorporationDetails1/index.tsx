import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import CorporationDetails1ListData from "./CorporationDetails1ListData";
import CorporationDetails1ReferenceListData from "./CorporationDetails1ReferenceListData";
import { CorporationList } from "src/models/corporation_list";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();
  const corporationList = location.state as CorporationList;
  return (
    <>
      <Helmet>
        <title>企業詳細①</title>
      </Helmet>
      <Typography
        sx={{
          position: "absolute",
          top: "64px",
          ml: 2,
          width: "100%",
          color: "gray",
          bgcolor: "#F6F6FA",
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
          top: "70px",
          pl: "95%",
          color: "gray",
        }}
      >
        <IconButton onClick={() => navigate("/salesTask/salesList")}>
          <CloseIcon sx={{ color: "gray" }} />
        </IconButton>
      </Box>
      <Container maxWidth="lg">
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
        <Box sx={{ mt: 13 }}>
          <CorporationDetails1ReferenceListData {...corporationList} />
        </Box>
        <Divider />
        <Typography
          sx={{
            position: "flex",
            margin: "10px",
            mt: 3,
            left: "%",
            color: "gray",
            fontSize: 24,
          }}
        >
          担当者候補
        </Typography>
        <Box>
          <CorporationDetails1ListData {...corporationList} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
