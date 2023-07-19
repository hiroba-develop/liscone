import React, { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';

import RecentOrders from "./ListData";
import Search from "./Search";

function DashBoard() {
  // 企業名
  const [corporationName, setCorporationName] = useState("");
  const corporationNameChange = (corporationName) => {
    setCorporationName(corporationName);
  };
  // 法人番号
  const [jobPosition, setJobPosition] = useState("");
  const jobPositionChange = (jobPosition) => {
    setJobPosition(jobPosition);
  };
  // リスト
  const [profileSourceType, setProfileSourceType] = useState("");
  const profileSourceTypeChange = (profileSourceType) => {
    setProfileSourceType(profileSourceType);
  };
  // 担当者
  const [staffName, setStaffName] = useState("");
  const staffNameChange = (staffName) => {
    setStaffName(staffName);
  };
  return (
    <>
      <Helmet>
        <title>担当者リスト作成</title>
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
            <Box sx={{ mb: 3 }}>
              <Search
                corporationNameChange={corporationNameChange}
                jobPositionChange={jobPositionChange}
                profileSourceTypeChange={profileSourceTypeChange}
                staffNameChange={staffNameChange}
              />
            </Box>
            <RecentOrders
              searchCorporationName={corporationName}
              searchJobPosition={jobPosition}
              searchProfileSourceType={profileSourceType}
              searchStaffName={staffName}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
