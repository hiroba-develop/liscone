import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import CorporationDetails1ListData from "../CorporationDetails1/CorporationDetails1ListData";
import CorporationDetails1ReferenceListData from "../CorporationDetails1/CorporationDetails1ReferenceListData";
import SalesCorpInfo from "./SalesCorpInfo";
import { useState, useEffect } from "react";

function Lists() {
  const [corporationList, setCorporationList] = useState(undefined);
  const [salesList, setSalesList] = useState(undefined);
  const [salesListStatistic, setSalesListStatistic] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data[0]) {
        setCorporationList(event.data[0]);
      }
      if (event.data[1]) {
        setSalesList(event.data[1]);
      }
      if (event.data[2]) {
        setSalesListStatistic(event.data[2]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // コンポーネントがアンマウントされる際にイベントリスナーをクリーンアップ
      window.removeEventListener("message", handleMessage);
    };
  }, [corporationList, salesList, salesListStatistic]);

  if (!corporationList || !salesList || !salesListStatistic) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>企業詳細②</title>
      </Helmet>
      <Typography
        sx={{
          position: "absolute",
          top: "64px",
          left: "",
          width: "100%",
          color: "white",
          bgcolor: "#66788A",
          py: 1,
          fontSize: 20,
        }}
      >
        　{corporationList.corporationEntity.corporation_name}(法人番号:
        {corporationList.corporationEntity.corporate_number})
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
            navigate("/salesTask/salesListCorporationDetails", {
              state: [salesList, salesListStatistic],
            })
          }
        >
          <CloseIcon sx={{ color: "white" }} />
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
            {corporationList.corporationEntity.representative_phone_number}
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
            {corporationList.corporationEntity.home_page}
          </Typography>
        </Box>
        <SalesCorpInfo
          corporationList={corporationList.corporationEntity}
          saleslistEntity={corporationList.saleslistEntity}
          salesList={salesList}
        />
        <Box sx={{ mt: 12 }}>
          <CorporationDetails1ReferenceListData
            {...corporationList.corporationEntity}
          />
        </Box>
        <Box sx={{ mt: 5 }}>
          <CorporationDetails1ListData {...corporationList.corporationEntity} />
        </Box>
        <ActionHistoryListData
          salesList={salesList}
          listDetails={corporationList.corporationEntity}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
