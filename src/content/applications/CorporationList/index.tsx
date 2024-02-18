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

  //SNS
  const [SNS, setSNS] = useState("");
  const SNSChange = (SNS) => {
    setSNS(SNS);
  };

  //レガシー企業レベル
  const [legacyCompany, setLegacyCompany] = useState("");
  const legacyCompanyChange = (legacyCompany) => {
    setLegacyCompany(legacyCompany);
  };

  //人的資本経営レベル
  const [humanCapitalRunning, setHumanCapitalRunning] = useState("");
  const humanCapitalRunningChange = (humanCapitalRunning) => {
    setHumanCapitalRunning(humanCapitalRunning);
  };

  //研修強化レベル
  const [humanResourcesEducational, setHumanResourcesEducational] =
    useState("");
  const humanResourcesEducationalChange = (humanResourcesEducational) => {
    setHumanResourcesEducational(humanResourcesEducational);
  };

  //新規事業推進レベル
  const [newBusiness, setNewBusiness] = useState("");
  const newBusinessChange = (newBusiness) => {
    setNewBusiness(newBusiness);
  };

  //広告出稿
  const [advertising, setAdvertising] = useState("");
  const advertisingChange = (advertising) => {
    setAdvertising(advertising);
  };

  //サイトPV数
  const [minSitePV, setMinSitePV] = useState("");
  const minSitePVChange = (minSitePV) => {
    setMinSitePV(minSitePV);
  };
  const [maxSitePV, setMaxSitePV] = useState("");
  const maxSitePVChange = (maxSitePV) => {
    setMaxSitePV(maxSitePV);
  };

  //資料掲載
  const [documentPublish, setDocumentPublish] = useState("");
  const documentPublishChange = (documentPublish) => {
    setDocumentPublish(documentPublish);
  };

  //平均年齢
  const [minAverageAge, setMinAverageAge] = useState("");
  const minAverageAgeChange = (minAverageAge) => {
    setMinAverageAge(minAverageAge);
  };
  const [maxAverageAge, setMaxAverageAge] = useState("");
  const maxAverageAgeChange = (maxAverageAge) => {
    setMaxAverageAge(maxAverageAge);
  };

  //フリーテキスト
  const [freeText, setFreeText] = useState("");
  const freeTextChange = (freeText) => {
    setFreeText(freeText);
  };

  //除外フリーテキスト
  const [exclusionFreeText, setExclusionFreeText] = useState("");
  const exclusionFreeTextChange = (exclusionFreeText) => {
    setExclusionFreeText(exclusionFreeText);
  };

  //検索ボタン
  const [searchClick, setSearchClick] = useState("");
  const setSearchClickChange = (searchClick) => {
    setSearchClick(searchClick);
  };

  // 大項目(採用)
  const [recruitBigResult, setRecruitBigResult] = useState("");
  const recruitBigResultChange = (recruitBigResult) => {
    setRecruitBigResult(recruitBigResult);
  };

  // 中項目(採用)
  const [recruitMiddleResult, setRecruitMiddleResult] = useState("");
  const recruitMiddleResultChange = (recruitMiddleResult) => {
    setRecruitMiddleResult(recruitMiddleResult);
  };

  // 小項目
  const [recruitSmallResult, setRecruitSmallResult] = useState("");
  const recruitSmallResultChange = (recruitSmallResult) => {
    setRecruitSmallResult(recruitSmallResult);
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
  // 企業リスト件数
  const [corporateListCount, setCorporateListCount] = useState("");
  const corporateListCountChange = (corporateListCount) => {
    setCorporateListCount(corporateListCount);
  };

  return (
    <>
      <Helmet>
        <title>企業リスト作成</title>
      </Helmet>
      <Container maxWidth="lg" fixed={true}>
        <Grid
          container
          sx={{ mt: 1 }}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={16}>
            <Search
              corporateNumberChange={corporateNumberChange}
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
              SNSChange={SNSChange}
              legacyCompanyChange={legacyCompanyChange}
              humanCapitalRunningChange={humanCapitalRunningChange}
              humanResourcesEducationalChange={humanResourcesEducationalChange}
              newBusinessChange={newBusinessChange}
              advertisingChange={advertisingChange}
              minSitePVChange={minSitePVChange}
              maxSitePVChange={maxSitePVChange}
              documentPublishChange={documentPublishChange}
              minAverageAgeChange={minAverageAgeChange}
              maxAverageAgeChange={maxAverageAgeChange}
              freeTextChange={freeTextChange}
              exclusionFreeTextChange={exclusionFreeTextChange}
              searchClickChange={setSearchClickChange}
              jobPositionChange={jobPositionChange}
              departmentChange={departmentChange}
              profileSourceTypeChange={profileSourceTypeChange}
              staffNameChange={staffNameChange}
              corporateListCount={corporateListCount}
              recruitBigResultChange={recruitBigResultChange}
              recruitMiddleResultChange={recruitMiddleResultChange}
              recruitSmallResultChange={recruitSmallResultChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={16}>
          <Box sx={{ mt: 3 }}>
            <RecentOrders
              searchCorporateNumber={corporateNumber}
              searchCorporationName={corporationName}
              searchIndustry={businessCategory}
              searchPrefectures={prefectures}
              searchRepresentativePhoneNumber={representativePhoneNumber}
              searchCorporationListStatus={corporationListStatus}
              searchMinSalesAmount={minSalesAmount}
              searchMaxSalesAmount={maxSalesAmount}
              searchMinEmployeeNumber={minEmployeeNumber}
              searchMaxEmployeeNumber={maxEmployeeNumber}
              searchMinEstablishmentYear={minEstablishmentYear}
              searchMaxEstablishmentYear={maxEstablishmentYear}
              searchMinCapitalStock={minCapitalStock}
              searchMaxCapitalStock={maxCapitalStock}
              searchSNS={SNS}
              searchLegacyCompany={legacyCompany}
              searchHumanCapitalRunning={humanCapitalRunning}
              searchHumanResourcesEducational={humanResourcesEducational}
              searchNewBusiness={newBusiness}
              searchAdvertising={advertising}
              searchMinSitePV={minSitePV}
              searchMaxSitePV={maxSitePV}
              searchDocumentPublish={documentPublish}
              searchMinAverageAge={minAverageAge}
              searchMaxAverageAge={maxAverageAge}
              searchFreeText={freeText}
              searchExclusionFreeText={exclusionFreeText}
              searchSearchClick={searchClick}
              searchJobPosition={jobPosition}
              searchDepartment={department}
              searchProfileSourceType={profileSourceType}
              searchStaffName={staffName}
              corporateListCountChange={corporateListCountChange}
              searchRecruitBigResult={recruitBigResult}
              searchRecruitMiddleResult={recruitMiddleResult}
              searchRecruitSmallResult={recruitSmallResult}
            />
          </Box>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashBoard;
