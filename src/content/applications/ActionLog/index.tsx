import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { useRecoilValue } from "recoil";
import { lsAuthAtom } from "src/utility/recoil/auth/Auth.atom";
import { ActionList } from "src/models/action_list";
// import PageHeader from './PageHeader';
import Search from "./Search";

import ListData from "./ActionData";

function Lists() {
  const [actionLists, setActionLogs] = useState<ActionList[]>([]);
  const authState = useRecoilValue(lsAuthAtom);

  useEffect(() => {
    const fetchUserAndActionLogs = async () => {
      try {
        const responseUser = await axios.get(
          `${config().apiUrl}/members/allMemberId`,
          {
            params: {
              memberId: authState.userId,
            },
          }
        );

        if (responseUser.status === 200) {
          const newUserLogs = responseUser.data;
          if (newUserLogs.length > 0 && newUserLogs[0].company_code !== "") {
            const responseAction = await axios.get(
              `${config().apiUrl}/actionlogs/search`,
              {
                params: {
                  companyCode: newUserLogs[0].company_code,
                },
              }
            );

            if (responseAction.status === 200) {
              setActionLogs(responseAction.data);
            }
          }
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };
    fetchUserAndActionLogs();
  }, [authState.userId]);
  //リスト項目
  const salesListNames = [];
  for (const actionList of actionLists) {
    salesListNames.push(actionList.saleslistEntity.sales_list_name);
  }
  const selectSalesListNames = [...new Set(salesListNames)];

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
          sx={{ mt: 1 }}
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
              selectSalesListNames={selectSalesListNames}
            />
            <Box sx={{ mt: 3 }}>
              <ListData
                actionLists={actionLists}
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
