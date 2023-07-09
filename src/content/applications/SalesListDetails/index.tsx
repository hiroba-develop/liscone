import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import Footer from "src/components/Footer";
import ListDetailsData from "./ListDetailsData";
import ListReferenceData from "./ListReferenceData";

function Lists() {
  const location = useLocation();

  type SalesListStatus = "01" | "02";
  const salesList = location.state as {
    sales_list_number: string;
    sales_list_name: string;
    member_id: string;
    sales_list_type: SalesListStatus;
    sales_product_number: number;
    listsNum: string;
    proceedNum: string;
    meetNum: string;
    negoNum: string;
    contractNum: string;
    yomi: string;
    created: Date;
    memberEntity: {
      member_id: string;
      member_name: string;
    };
  };
  return (
    <>
      <Helmet>
        <title>リスト詳細</title>
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
        <ListReferenceData {...salesList} />
        <ListDetailsData {...salesList} />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
