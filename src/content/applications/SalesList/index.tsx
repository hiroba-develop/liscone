import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";

import ListData from "./ListData";

function Lists() {
  return (
    <>
      <Helmet>
        <title>リスト一覧</title>
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
            <ListData />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
