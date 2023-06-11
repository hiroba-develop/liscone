import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";

import RecentOrders from "./RecentOrders";

function ApplicationsTransactions() {
  return (
    <>
      <Helmet>
        <title>ダッシュボード</title>
      </Helmet>
      <Container maxWidth="xl">
        <RecentOrders />
      </Container>
    </>
  );
}

export default ApplicationsTransactions;
