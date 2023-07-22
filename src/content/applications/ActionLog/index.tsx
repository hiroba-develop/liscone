import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';
import Search from "./Search";

import ListData from "./ActionData";

function Lists() {
  // 企業名
  const [corporationName, setCorporationName] = useState("");
  const corporationNameChange = (corporationName) => {
    setCorporationName(corporationName);
  };
  // リスト
  const [salesListName, setSalesListName] = useState("");
  const salesListNameChange = (salesListName) => {
    setSalesListName(salesListName);
  };
  // 担当者
  const [staffName, setStaffName] = useState("");
  const staffNameChange = (staffName) => {
    setStaffName(staffName);
  };
  // ユーザー
  const [memberName, setMemberName] = useState("");
  const memberNameChange = (memberName) => {
    setMemberName(memberName);
  };
  // 行動種類
  const [executeBigResult, setExecuteBigResult] = useState("");
  const executeBigResultChange = (executeBigResult) => {
    setExecuteBigResult(executeBigResult);
  };
  // 小項目
  const [executeSmallResult, setExecuteSmallResult] = useState("");
  const executeSmallResultChange = (executeSmallResult) => {
    setExecuteSmallResult(executeSmallResult);
  };
  // 日付(から～)
  const [fromDate, setFromDate] = useState("");
  const fromDateChange = (fromDate) => {
    setFromDate(fromDate);
  };
  // 日付(～まで)
  const [toDate, setToDate] = useState("");
  const toDateChange = (toDate) => {
    setToDate(toDate);
  };
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
            <Search
              corporationNameChange={corporationNameChange}
              salesListNameChange={salesListNameChange}
              staffNameChange={staffNameChange}
              memberNameChange={memberNameChange}
              executeBigResultChange={executeBigResultChange}
              executeSmallResultChange={executeSmallResultChange}
              fromDateChange={fromDateChange}
              toDateChange={toDateChange}
            />
            <Box>
              <ListData
                searchCorporationName={corporationName}
                searchSalesListName={salesListName}
                searchStaffName={staffName}
                searchMemberName={memberName}
                searchExecuteBigResult={executeBigResult}
                searchExecuteSmallResult={executeSmallResult}
                searchFromDate={fromDate}
                searchToDate={toDate}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
