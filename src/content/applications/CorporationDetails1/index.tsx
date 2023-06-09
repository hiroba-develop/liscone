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
          <IconButton onClick={() => navigate("/corporation/corporationList")}>
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
            {corporationList.representative_phone_number}
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
            {corporationList.home_page}
          </Typography>
        </Box>
        <Box sx={{ mt: 10 }}>
          <CorporationDetails1ReferenceListData {...corporationList} />
        </Box>
        <Divider />
        <Typography
          sx={{
            position: "absolute",
            margin: "10px",
            top: "350px",
            left: "%",
            color: "gray",
            fontSize: 24,
          }}
        >
          担当者候補
        </Typography>
        <Box sx={{ mt: 15 }}>
          <CorporationDetails1ListData {...corporationList} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
