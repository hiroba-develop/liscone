import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import Footer from "src/components/Footer";
import ListImportDetailsData from "./ListImportDetailsData";
import ListImportReferenceData from "./ListImportReferenceData";
import { SalesList } from "src/models/sales_list";
import { SalesListStatistic } from "src/models/sales_list_statistic";

function Lists() {
  const location = useLocation();

  const [salesList, salesListStatistic] = location.state as [
    SalesList,
    SalesListStatistic
  ];
  return (
    <>
      <Helmet>
        <title>インポートリスト詳細</title>
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
        <ListImportReferenceData {...salesListStatistic} />
        <ListImportDetailsData {...{ salesList, salesListStatistic }} />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
