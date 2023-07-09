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
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={16}>
            <Sort />
          </Grid>
        </Grid>
        <Grid item xs={16}>
          <Box sx={{ mt: 3 }}>
            <RecentOrders />
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
