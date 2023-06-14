import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';

import ListData from "./ActionData";

function Lists() {
  return (
    <>
      <Helmet>
        <title>行動ログ</title>
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
