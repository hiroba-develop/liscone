import { Container, Button } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import ListDetailsData from "./ListDetailsData";
import ListReferenceData from "./ListReferenceData";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Lists() {
  return (
    <>
      <Helmet>
        <title>リスト詳細</title>
      </Helmet>
      <Container maxWidth="lg">
        <Button
          sx={{
            position: "absolute",
            top: "10%",
            left: "0%",
            color: "black",
          }}
          href="/salesTask/salesList"
        >
          <ArrowBackIosNewIcon />
          　戻る
        </Button>
        <ListReferenceData />
        <ListDetailsData />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
