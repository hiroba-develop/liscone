import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, Divider, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import CorporationDetails1ListData from "./CorporationDetails1ListData";
import CorporationDetails1Reference from "./CorporationDetails1Reference";
import CorporationDetails2Reference from "./CorporationDetails2Reference";
import CorporationDetails3Reference from "./CorporationDetails3Reference";
import CorporationDetails4Reference from "./CorporationDetails4Reference";
import { useState, useEffect } from "react";

function Lists() {
  const navigate = useNavigate();
  const [corporationList, setCorporationList] = useState(undefined);
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data[0]) {
        setCorporationList(event.data[0]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // コンポーネントがアンマウントされる際にイベントリスナーをクリーンアップ
      window.removeEventListener("message", handleMessage);
    };
  }, [corporationList]);

  const handleWebpage = (event, params) => {
    window.open(params, "_blank");
  };

  if (!corporationList) {
    return null;
  }
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
              textDecoration: "underline",
            }}
            onClick={(event) => {
              handleWebpage(event, corporationList.home_page);
            }}
          >
            {corporationList.home_page}
          </Typography>
        </Box>
        <Box sx={{ mt: 13 }}>
          {/* 会社情報 */}
          <CorporationDetails1Reference {...corporationList} />
        </Box>
        <Box>
          {/* 会社概要・平均年齢 */}
          <CorporationDetails2Reference {...corporationList} />
        </Box>
        <Box sx={{ mt: 5 }}>
          {/* サイトPV・Publishers・Ad Networks・SNS情報 */}
          <CorporationDetails3Reference {...corporationList} />
        </Box>
        <Box sx={{ mt: 5 }}>
          {/* 採用内容 */}
          <CorporationDetails4Reference {...corporationList} />
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
        <Box sx={{ mt: -4 }}>
          <CorporationDetails1ListData {...corporationList} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
