import { Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';

import TaskLists from "./ListData";

function DashBoard() {
  return (
    <>
      <Helmet>
        <title>ダッシュボード</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{ mt: 1 }}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={16}>
            <TaskLists />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
