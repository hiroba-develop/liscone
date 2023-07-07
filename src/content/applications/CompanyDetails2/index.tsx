import { Container, Typography, Box, IconButton, Stack } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import CompanyDetails2ListData from "./CompanyDetails2ListData";
import CompanyDetails2ReferenceListData from "./CompanyDetails2ReferenceListData";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import Search from "./Search";

function Lists() {
  const navigate = useNavigate();
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
          株式会社AAAAA(法人番号：0000000000000)
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: "70px",
            right: "0",
            color: "white",
          }}
        >
          <IconButton onClick={() => navigate("/company/companyList")}>
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
            03-1234-5678
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
            https://www.example.co.jp/
          </Typography>
        </Box>
        <Search />
        <CompanyDetails2ReferenceListData />
        <CompanyDetails2ListData />
        <ActionHistoryListData />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
