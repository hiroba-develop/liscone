import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import { ImportDetailsList } from "src/models/import_details_list";
import { SalesList } from "src/models/sales_list";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import ImportDetailsListData from "./ImportDetailsListData";
import ImportDetailsReferenceListData from "./ImportDetailsReferenceListData";
import SalesCorpInfo from "./SalesCorpInfo";
import { SalesListStatistic } from "src/models/sales_list_statistic";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();
  const [importDetailsList, salesList, salesListStatistic] = location.state as [
    ImportDetailsList,
    SalesList,
    SalesListStatistic
  ];

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
        　{importDetailsList.corporation_name}(法人番号:
        {importDetailsList.corporation_id})
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
            navigate("/salesTask/salesListImportDetails", {
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
            {importDetailsList.representative_phone_number}
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
            {importDetailsList.home_page}
          </Typography>
        </Box>
        <SalesCorpInfo
          corporationList={importDetailsList}
          saleslistEntity={importDetailsList}
          salesList={salesList}
        />
        <Box sx={{ mt: 12 }}>
          <ImportDetailsReferenceListData {...importDetailsList} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <ImportDetailsListData {...importDetailsList} />
        </Box>
        <ActionHistoryListData
          salesList={salesList}
          listDetails={importDetailsList}
        />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
