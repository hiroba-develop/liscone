import React, { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import RecentOrders from "./ListData";
import Search from "./Search";

function DashBoard() {
  // 法人番号
  const [corporateNumber, setCorporateNumber] = useState("");
  const corporateNumberChange = (comparyNumber) => {
    setCorporateNumber(comparyNumber);
  };

  // 会社名・法人名
  const [corporationName, setCorporationName] = useState("");
  const corporationNameChange = (corporationName) => {
    setCorporationName(corporationName);
  };

  // 業種
  const [businessCategory, setBusinessCategory] = useState("");
  const businessCategoryChange = (businessCategory) => {
    setBusinessCategory(businessCategory);
  };

  //都道府県
  const [prefectures, setPrefectures] = useState("");
  const setPrefecturesChange = (prefectures) => {
    setPrefectures(prefectures);
  };

  //代表電話番号
  const [representativePhoneNumber, setRepresentativePhoneNumber] =
    useState("");
  const setRepresentativePhoneNumberChange = (representativePhoneNumber) => {
    setRepresentativePhoneNumber(representativePhoneNumber);
  };

  //上場
  const [corporationListStatus, setCorporationListStatus] = useState("");
  const setCorporationListStatusChange = (corporationListStatus) => {
    setCorporationListStatus(corporationListStatus);
  };

  //売上
  const [minSalesAmount, setMinSalesAmount] = useState("");
  const setMinSalesAmountChange = (minSalesAmount) => {
    setMinSalesAmount(minSalesAmount);
  };
  const [maxSalesAmount, setMaxSalesAmount] = useState("");
  const setMaxSalesAmountChange = (maxSalesAmount) => {
    setMaxSalesAmount(maxSalesAmount);
  };

  //従業員数
  const [minEmployeeNumber, setMinEmployeeNumber] = useState("");
  const setMinEmployeeNumberChange = (minEmployeeNumber) => {
    setMinEmployeeNumber(minEmployeeNumber);
  };
  const [maxEmployeeNumber, setMaxEmployeeNumber] = useState("");
  const setMaxEmployeeNumberChange = (maxEmployeeNumber) => {
    setMaxEmployeeNumber(maxEmployeeNumber);
  };

  //設立
  const [minEstablishmentYear, setMinEstablishmentYear] = useState("");
  const setMinEstablishmentYearChange = (minEstablishmentYear) => {
    setMinEstablishmentYear(minEstablishmentYear);
  };
  const [maxEstablishmentYear, setMaxEstablishmentYear] = useState("");
  const setMaxEstablishmentYearChange = (maxEmployeeNumber) => {
    setMaxEstablishmentYear(maxEmployeeNumber);
  };

  //資本金
  const [minCapitalStock, setMinCapitalStock] = useState("");
  const setMinCapitalStockChange = (minCapitalStock) => {
    setMinCapitalStock(minCapitalStock);
  };
  const [maxCapitalStock, setMaxCapitalStock] = useState("");
  const setMaxCapitalStockChange = (maxCapitalStock) => {
    setMaxCapitalStock(maxCapitalStock);
  };

  return (
    <>
      <Helmet>
        <title>企業リスト作成</title>
      </Helmet>
      <Container maxWidth="lg" fixed={true}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={16}>
            <Search
              comparyNumberChange={corporateNumberChange}
              corporationNameChange={corporationNameChange}
              businessCategoryChange={businessCategoryChange}
              prefecturesChange={setPrefecturesChange}
              representativePhoneNumberChange={
                setRepresentativePhoneNumberChange
              }
              corporationListStatusChange={setCorporationListStatusChange}
              minSalesAmountChange={setMinSalesAmountChange}
              maxSalesAmountChange={setMaxSalesAmountChange}
              minEmployeeNumberChange={setMinEmployeeNumberChange}
              maxEmployeeNumberChange={setMaxEmployeeNumberChange}
              minEstablishmentYearChange={setMinEstablishmentYearChange}
              maxEstablishmentYearChange={setMaxEstablishmentYearChange}
              minCapitalStockChange={setMinCapitalStockChange}
              maxCapitalStockChange={setMaxCapitalStockChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={16}>
          <Box sx={{ mt: 3 }}>
            <RecentOrders
            // searchCorporateNumber={corporateNumber}
            // searchCorporationName={corporationName}
            // searchIndustry={businessCategory}
            // searchPrefectures={prefectures}
            // searchRepresentativePhoneNumber={representativePhoneNumber}
            // searchCorporationListStatus={corporationListStatus}
            // searchMinSalesAmount={minSalesAmount}
            // searchMaxSalesAmount={maxSalesAmount}
            // searchMinEmployeeNumber={minEmployeeNumber}
            // searchMaxEmployeeNumber={maxEmployeeNumber}
            // searchMinEstablishmentYear={minEstablishmentYear}
            // searchMaxEstablishmentYear={maxEstablishmentYear}
            // searchMinCapitalStock={minCapitalStock}
            // searchMaxCapitalStock={maxCapitalStock}
            />
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
