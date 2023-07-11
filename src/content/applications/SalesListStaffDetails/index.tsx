import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import Footer from "src/components/Footer";
import ListStaffDetailsData from "./ListStaffDetailsData";
import ListStaffReferenceData from "./ListStaffReferenceData";
import { SalesList } from "src/models/sales_list";

function Lists() {
  const location = useLocation();

  const salesList = location.state as SalesList;
  return (
    <>
      <Helmet>
        <title>担当者リスト詳細</title>
      </Helmet>
      <Container maxWidth="lg">
        <Button
          sx={{
            position: "absolute",
            top: "8%",
            left: "0%",
            color: "black",
          }}
          href="/salesTask/salesList"
        >
          <ArrowBackIosNewIcon />
          　戻る
        </Button>
        <ListStaffReferenceData {...salesList} />
        <ListStaffDetailsData {...salesList} />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;