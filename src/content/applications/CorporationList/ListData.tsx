import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CorporationList } from "src/models/corporation_list";
import { StaffList } from "src/models/staff_list";
import { config } from "src/utility/config/AppConfig";
import CorporationListsTable from "./CorporationListsTable";

function CorporationLists(props) {
  const [corporationLists, setCorporations] = useState<CorporationList[]>([]);
  const [localeTextValue, setLocaleTextValue] = useState<string>("");
  const searchSearchClick = props.searchSearchClick;

  let searchCorporationListStatus;
  if (props.searchCorporationListStatus === "上場") {
    searchCorporationListStatus = "Y";
  } else if (props.searchCorporationListStatus === "未上場") {
    searchCorporationListStatus = "N";
  } else if (props.searchCorporationListStatus === "未確認") {
    searchCorporationListStatus = "U";
  } else {
    searchCorporationListStatus = "";
  }
  let searchIndustry;
  if (props.searchIndustry === undefined) {
    searchIndustry = "";
  } else {
    searchIndustry = props.searchIndustry;
  }
  let searchPrefectures;
  if (props.searchPrefectures === undefined) {
    searchPrefectures = "";
  } else {
    searchPrefectures = props.searchPrefectures;
  }
  function convertToNumber(amount) {
    const units = {
      万円: 10000,
      億円: 100000000,
      兆円: 1000000000000,
    };
    const unitPattern = /(\d+)\s*([万億兆]円)/;
    const match = unitPattern.exec(amount);
    if (match && match[2] && units.hasOwnProperty(match[2])) {
      const value = parseInt(match[1]);
      const unit = match[2];
      return value * units[unit];
    }
    return "";
  }
  const searchMinSalesAmount = convertToNumber(props.searchMinSalesAmount);
  const searchMaxSalesAmount = convertToNumber(props.searchMaxSalesAmount);
  const searchMinCapitalStock = convertToNumber(props.searchMinCapitalStock);
  const searchMaxCapitalStock = convertToNumber(props.searchMaxCapitalStock);

  const [staffLists, setStaffs] = useState<StaffList[]>([]);
  // 正規表現でスペースまたは全角スペースで分割して配列に変換
  const searchJobPositionArray = props.searchJobPosition.split(/\s+/);
  let searchJobPosition1 = "";
  let searchJobPosition2 = "";
  let searchJobPosition3 = "";
  let searchJobPosition4 = "";
  let searchJobPosition5 = "";
  if (searchJobPositionArray[0] !== undefined) {
    searchJobPosition1 = searchJobPositionArray[0];
  }
  if (searchJobPositionArray[1] !== undefined) {
    searchJobPosition2 = searchJobPositionArray[1];
  }
  if (searchJobPositionArray[2] !== undefined) {
    searchJobPosition3 = searchJobPositionArray[2];
  }
  if (searchJobPositionArray[3] !== undefined) {
    searchJobPosition4 = searchJobPositionArray[3];
  }
  if (searchJobPositionArray[4] !== undefined) {
    searchJobPosition5 = searchJobPositionArray[4];
  }

  const searchDepartmentArray = props.searchDepartment.split(/\s+/);
  let searchDepartment1 = "";
  let searchDepartment2 = "";
  let searchDepartment3 = "";
  let searchDepartment4 = "";
  let searchDepartment5 = "";
  if (searchDepartmentArray[0] !== undefined) {
    searchDepartment1 = searchDepartmentArray[0];
  }
  if (searchJobPositionArray[1] !== undefined) {
    searchDepartment2 = searchDepartmentArray[1];
  }
  if (searchJobPositionArray[2] !== undefined) {
    searchDepartment3 = searchDepartmentArray[2];
  }
  if (searchJobPositionArray[3] !== undefined) {
    searchDepartment4 = searchDepartmentArray[3];
  }
  if (searchJobPositionArray[4] !== undefined) {
    searchDepartment5 = searchDepartmentArray[4];
  }

  const searchJobPosition =
    props.searchJobPosition.trim() === "" ? "" : props.searchJobPosition;
  const searchDepartment =
    props.searchDepartment.trim() === "" ? "" : props.searchDepartment;
  const searchStaffName =
    props.searchStaffName.trim() === "" ? "" : props.searchStaffName;

  useEffect(() => {
    if (props.searchSearchClick === 1) {
      setCorporations([]);
      if (
        props.searchCorporateNumber !== "" ||
        props.searchCorporationName !== "" ||
        searchIndustry !== "" ||
        searchPrefectures !== "" ||
        props.searchRepresentativePhoneNumber !== "" ||
        props.searchCorporationListStatus !== "" ||
        props.searchMinSalesAmount !== "" ||
        props.searchMaxSalesAmount !== "" ||
        props.searchMinEmployeeNumber !== "" ||
        props.searchMaxEmployeeNumber !== "" ||
        props.searchMinEstablishmentYear !== "" ||
        props.searchMaxEstablishmentYear !== "" ||
        props.searchMinCapitalStock !== "" ||
        props.searchMaxCapitalStock !== ""
      ) {
        setLocaleTextValue("検索中です。");
        const getCorporations = async () => {
          try {
            const responseCount = await axios.get(
              `${config().apiUrl}/corporations/searchCount`,
              {
                params: {
                  searchCorporateNumber: props.searchCorporateNumber,
                  searchCorporationName: props.searchCorporationName,
                  searchIndustry: searchIndustry,
                  searchPrefectures: searchPrefectures,
                  searchRepresentativePhoneNumber:
                    props.searchRepresentativePhoneNumber,
                  searchCorporationListStatus: searchCorporationListStatus,
                  searchMinSalesAmount: searchMinSalesAmount,
                  searchMaxSalesAmount: searchMaxSalesAmount,
                  searchMinEmployeeNumber: props.searchMinEmployeeNumber,
                  searchMaxEmployeeNumber: props.searchMaxEmployeeNumber,
                  searchMinEstablishmentYear: props.searchMinEstablishmentYear,
                  searchMaxEstablishmentYear: props.searchMaxEstablishmentYear,
                  searchMinCapitalStock: searchMinCapitalStock,
                  searchMaxCapitalStock: searchMaxCapitalStock,
                },
              }
            );
            if (responseCount.statusText === "OK") {
              if (responseCount.data >= 1 && responseCount.data <= 10000) {
                setLocaleTextValue(
                  ` ${responseCount.data}件ヒットしました。データを表示しています。`
                );
                const response = await axios.get(
                  `${config().apiUrl}/corporations/search`,
                  {
                    params: {
                      searchCorporateNumber: props.searchCorporateNumber,
                      searchCorporationName: props.searchCorporationName,
                      searchIndustry: searchIndustry,
                      searchPrefectures: searchPrefectures,
                      searchRepresentativePhoneNumber:
                        props.searchRepresentativePhoneNumber,
                      searchCorporationListStatus: searchCorporationListStatus,
                      searchMinSalesAmount: searchMinSalesAmount,
                      searchMaxSalesAmount: searchMaxSalesAmount,
                      searchMinEmployeeNumber: props.searchMinEmployeeNumber,
                      searchMaxEmployeeNumber: props.searchMaxEmployeeNumber,
                      searchMinEstablishmentYear:
                        props.searchMinEstablishmentYear,
                      searchMaxEstablishmentYear:
                        props.searchMaxEstablishmentYear,
                      searchMinCapitalStock: searchMinCapitalStock,
                      searchMaxCapitalStock: searchMaxCapitalStock,
                    },
                  }
                );

                if (response.statusText === "OK") {
                  setCorporations(response.data);
                }
              } else if (responseCount.data > 10000) {
                setLocaleTextValue(
                  `検索結果は ${responseCount.data}件です。　検索条件を追加してください`
                );
              } else if (responseCount.data === 0) {
                setLocaleTextValue(
                  "検索結果は 0件です。　検索条件を変更してください"
                );
              }
            }
          } catch (error) {
            console.error(error);
          }
        };

        getCorporations();
      } else {
        setLocaleTextValue("データ件数が多すぎるため、条件を絞り込んで下さい");
      }
    } else if (props.searchSearchClick === 3) {
      setStaffs([]);
      if (
        searchJobPosition !== "" ||
        searchDepartment !== "" ||
        props.searchProfileSourceType !== undefined ||
        searchStaffName !== ""
      ) {
        const getStaffs = async () => {
          try {
            const response = await axios.get(
              `${config().apiUrl}/corporationstaffs/searchChick`,
              {
                params: {
                  searchJobPosition1: searchJobPosition1,
                  searchJobPosition2: searchJobPosition2,
                  searchJobPosition3: searchJobPosition3,
                  searchJobPosition4: searchJobPosition4,
                  searchJobPosition5: searchJobPosition5,
                  searchDepartment1: searchDepartment1,
                  searchDepartment2: searchDepartment2,
                  searchDepartment3: searchDepartment3,
                  searchDepartment4: searchDepartment4,
                  searchDepartment5: searchDepartment5,
                  searchProfileSourceType: props.searchProfileSourceType,
                  searchStaffName: searchStaffName,
                },
              }
            );

            if (response.statusText === "OK") {
              setStaffs(response.data);
              // alert("担当者検索を行いました。");
            }
          } catch (error) {
            console.error(error);
          }
        };
        getStaffs();
      }
      alert("担当者検索を行いました。");
    } else {
      setLocaleTextValue(
        "絞り込み条件を選択または入力して「検索」ボタンを押下してください"
      );
    }
  }, [props.searchSearchClick]);

  return (
    <Card>
      <CorporationListsTable
        corporationLists={corporationLists}
        staffLists={staffLists}
        localeTextValue={localeTextValue}
        searchSearchClick={searchSearchClick}
      />
    </Card>
  );
}

export default CorporationLists;
