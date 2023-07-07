import { Container, Grid, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';

import RecentOrders from "./ListData";
import Search from "./Search";

function DashBoard() {
  return (
    <>
      <Helmet>
        <title>担当者リスト作成</title>
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
            <Box sx={{ mb: 3 }}>
              <Search />
            </Box>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
