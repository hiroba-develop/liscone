import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import ListDetailsData from "./ListDetailsData";

function Lists(props) {
  return (
    <>
      <Helmet>
        <title>リスト詳細</title>
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
            <ListDetailsData />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
