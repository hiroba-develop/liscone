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
  // 法人番号
  const [corporateNumber, setCorporateNumber] = useState("");
  const corporateNumberChange = (comparyNumber) => {
    setCorporateNumber(comparyNumber);
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
  const [actionType, setActionType] = useState("");
  const actionTypeChange = (actionType) => {
    setActionType(actionType);
  };
  // 大項目
  const [majorItem, setMajorItem] = useState("");
  const majorItemChange = (majorItem) => {
    setMajorItem(majorItem);
  };
  // 小項目
  const [minorItem, setMinorItem] = useState("");
  const minorItemChange = (minorItem) => {
    setMinorItem(minorItem);
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
              corporateNumberChange={corporateNumberChange}
              salesListNameChange={salesListNameChange}
              staffNameChange={staffNameChange}
              memberNameChange={memberNameChange}
              actionTypeChange={actionTypeChange}
              majorItemChange={majorItemChange}
              minorItemChange={minorItemChange}
            />
            <Box>
              <ListData
                searchCorporationName={corporationName}
                searchCorporateNumber={corporateNumber}
                searchSalesListName={salesListName}
                searchStaffName={staffName}
                searchMemberName={memberName}
                searchActionType={actionType}
                searchMajorItem={majorItem}
                searchMinorItem={minorItem}
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
