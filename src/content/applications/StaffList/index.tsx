import React, { useState } from "react";
import { Container, Grid, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
// import PageHeader from './PageHeader';

import RecentOrders from "./ListData";
import Search from "./Search";

function DashBoard() {
  // 法人名
  const [corporationName, setCorporationName] = useState("");
  const corporationNameChange = (corporationName) => {
    setCorporationName(corporationName);
  };
  // 役職
  const [jobPosition, setJobPosition] = useState("");
  const jobPositionChange = (jobPosition) => {
    setJobPosition(jobPosition);
  };
  // 部署
  const [department, setDepartment] = useState("");
  const departmentChange = (department) => {
    setDepartment(department);
  };
  // ソース
  const [profileSourceType, setProfileSourceType] = useState("");
  const profileSourceTypeChange = (profileSourceType) => {
    setProfileSourceType(profileSourceType);
  };
  // 担当者名
  const [staffName, setStaffName] = useState("");
  const staffNameChange = (staffName) => {
    setStaffName(staffName);
  };
  //検索ボタン
  const [searchClick, setSearchClick] = useState("");
  const setSearchClickChange = (searchClick) => {
    setSearchClick(searchClick);
  };
  return (
    <>
      <Helmet>
        <title>担当者リスト作成</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          sx={{ mt: 1 }}
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
                departmentChange={departmentChange}
                profileSourceTypeChange={profileSourceTypeChange}
                staffNameChange={staffNameChange}
                searchClickChange={setSearchClickChange}
              />
            </Box>
            <RecentOrders
              searchCorporationName={corporationName}
              searchJobPosition={jobPosition}
              searchDepartment={department}
              searchProfileSourceType={profileSourceType}
              searchStaffName={staffName}
              searchSearchClick={searchClick}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
