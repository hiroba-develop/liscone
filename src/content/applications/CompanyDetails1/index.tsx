import CloseIcon from "@mui/icons-material/Close";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import CompanyDetails1ListData from "./CompanyDetails1ListData";
import CompanyDetails1ReferenceListData from "./CompanyDetails1ReferenceListData";

function Lists() {
  const navigate = useNavigate();
  const location = useLocation();
  type CompanyListStatus = "Y" | "N";
  const companyList = location.state as {
    corporation_id: string;
    corporate_number: string;
    corporation_name: string;
    business_category: string;
    zip_code: string;
    address: string;
    representative_phone_number: string;
    representative_name: string;
    home_page: string;
    telephoneNumber: string;
    sales_amount: string;
    employee_number: string;
    establishment_year: number;
    capital_stock: string;
    listing_status: CompanyListStatus;
  };
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
          {companyList.corporation_name}(法人番号:
          {companyList.corporate_number})
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
            {companyList.representative_phone_number}
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
            {companyList.home_page}
          </Typography>
        </Box>
        <Box sx={{ mt: 12 }}>
          <CompanyDetails1ReferenceListData {...companyList} />
        </Box>
        <Typography
          sx={{
            position: "absolute",
            top: "350px",
            left: "1%",
            color: "gray",
            fontSize: 24,
          }}
        >
          担当者候補
        </Typography>
        <Box sx={{ mt: 10 }}>
          <CompanyDetails1ListData {...companyList} />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
