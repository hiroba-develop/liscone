import { Container, Grid } from "@mui/material";
import { ArcElement, Chart } from "chart.js";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import SalesListChart1 from "./SalesListChart1";
import SalesListChart2 from "./SalesListChart2";
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
          spacing={1}
        >
          <Grid item xs={18}>
            <SalesListChart1 />
          </Grid>
          <Grid item xs={18}>
            <SalesListChart2 />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Reports;
