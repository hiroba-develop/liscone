import { Container, Grid } from "@mui/material";
import { ArcElement, Chart } from "chart.js";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import ChartData1 from "./ChartData1";
import ChartData2 from "./ChartData2";
Chart.register(ArcElement);
function Reports() {
  return (
    <>
      <Helmet>
        <title>Reports</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          sx={{ mt: 1 }}
          spacing={3}
        >
          <Grid item xs={18}>
            <ChartData1 />
          </Grid>
          <Grid item xs={18}>
            <ChartData2 />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Reports;
