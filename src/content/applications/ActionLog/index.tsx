import { Box, Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';
import Search from "./Search";

import ListData from "./ActionData";

function Lists() {
  return (
    <>
      <Helmet>
        <title>行動ログ</title>
      </Helmet>
      <Container maxWidth="lg">
        <Search />
        <Box sx={{ mt: 3 }}>
          <ListData />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
