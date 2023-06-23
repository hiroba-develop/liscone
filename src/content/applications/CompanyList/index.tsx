import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import RecentOrders from "./ListData";
import Sort from "./Sort";

function DashBoard() {
  return (
    <>
      <Helmet>
        <title>企業リスト作成</title>
      </Helmet>
      <Container>
        <Box sx={{ mx: -8 }}>
          <Sort />
        </Box>
        <Box sx={{ mt: 5, mx: -8 }}>
          <RecentOrders />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
