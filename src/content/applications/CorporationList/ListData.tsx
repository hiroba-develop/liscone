import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CorporationList } from "src/models/corporation_list";
import { StaffList } from "src/models/staff_list";
import { RecruitList } from "src/models/recruit_list";
import { config } from "src/utility/config/AppConfig";
import CorporationListsTable from "./CorporationListsTable";

function CorporationLists(props) {
  const [corporationLists, setCorporations] = useState<CorporationList[]>([]);
  const [localeTextValue, setLocaleTextValue] = useState<string>("");
  const searchSearchClick = props.searchSearchClick;

  // 上場入力値の整形
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

  // 業種入力値の整形
  let searchIndustry;
  if (props.searchIndustry === undefined) {
    searchIndustry = "";
  } else {
    searchIndustry = props.searchIndustry;
  }

  // 都道府県入力値の整形
  let searchPrefectures;
  if (props.searchPrefectures === undefined) {
    searchPrefectures = "";
  } else {
    searchPrefectures = props.searchPrefectures;
  }

  // 売上、資本金の桁合わせ
  function convertToNumber(amount) {
    if (amount === "") {
      return "";
    } else {
      return amount * 1000000;
    }
  }

  // 売上、従業員数、設立、資本金の数字チェック
  function NumberCheck(value) {
    if (isNaN(value)) {
      alert("半角数字で入力してください。");
    }
  }

  // サイトPV数入力値の整形
  function convertToInteger(value) {
    if (value !== "" && value !== undefined && value !== null) {
      // 値が千（K）を表す場合
      if (value.endsWith("K")) {
        const intValue = parseInt(value) * 1000;
        return intValue;
      }
      // 値が百万（M）を表す場合
      if (value.endsWith("M")) {
        const intValue = parseInt(value) * 1000000;
        return intValue;
      }
      // 上記の条件に該当しない場合は、単純に整数に変換
      const intValue = parseInt(value);
      return intValue;
    }
  }

  // 平均年齢入力値の整形
  let searchMinAverageAge;
  if (props.searchMinAverageAge === undefined) {
    searchMinAverageAge = "";
  } else {
    searchMinAverageAge = props.searchMinAverageAge;
  }
  let searchMaxAverageAge;
  if (props.searchMaxAverageAge === undefined) {
    searchMaxAverageAge = "";
  } else {
    searchMaxAverageAge = props.searchMaxAverageAge;
  }

  // SNSアカウント入力値の整形
  let searchSNS;
  if (props.searchSNS === undefined) {
    searchSNS = "";
  } else {
    searchSNS = props.searchSNS;
  }

  // 広告出稿入力値の整形
  let searchAdvertising;
  if (props.searchAdvertising === "有り") {
    searchAdvertising = "Y";
  } else {
    searchAdvertising = "";
  }

  // 正規表現でスペースまたは全角スペースで分割して配列に変換
  // フリーテキスト
  const searchFreeTextArray = props.searchFreeText.split(/\s+/);
  let searchFreeText1 = "";
  let searchFreeText2 = "";
  let searchFreeText3 = "";
  let searchFreeText4 = "";
  let searchFreeText5 = "";
  if (searchFreeTextArray[0] !== undefined) {
    searchFreeText1 = searchFreeTextArray[0];
  }
  if (searchFreeTextArray[1] !== undefined) {
    searchFreeText2 = searchFreeTextArray[1];
  }
  if (searchFreeTextArray[2] !== undefined) {
    searchFreeText3 = searchFreeTextArray[2];
  }
  if (searchFreeTextArray[3] !== undefined) {
    searchFreeText4 = searchFreeTextArray[3];
  }
  if (searchFreeTextArray[4] !== undefined) {
    searchFreeText5 = searchFreeTextArray[4];
  }
  // 除外フリーテキスト
  const searchExclusionFreeTextArray =
    props.searchExclusionFreeText.split(/\s+/);
  let searchExclusionFreeText1 = "";
  let searchExclusionFreeText2 = "";
  let searchExclusionFreeText3 = "";
  let searchExclusionFreeText4 = "";
  let searchExclusionFreeText5 = "";
  if (searchExclusionFreeTextArray[0] !== undefined) {
    searchExclusionFreeText1 = searchExclusionFreeTextArray[0];
  }
  if (searchExclusionFreeTextArray[1] !== undefined) {
    searchExclusionFreeText2 = searchExclusionFreeTextArray[1];
  }
  if (searchExclusionFreeTextArray[2] !== undefined) {
    searchExclusionFreeText3 = searchExclusionFreeTextArray[2];
  }
  if (searchExclusionFreeTextArray[3] !== undefined) {
    searchExclusionFreeText4 = searchExclusionFreeTextArray[3];
  }
  if (searchExclusionFreeTextArray[4] !== undefined) {
    searchExclusionFreeText5 = searchExclusionFreeTextArray[4];
  }

  //検索ボタン(企業検索)
  const corporationCount = (corporationListsCount) => {
    props.corporateListCountChange(corporationListsCount);
  };

  const searchMinSalesAmount = convertToNumber(props.searchMinSalesAmount);
  const searchMaxSalesAmount = convertToNumber(props.searchMaxSalesAmount);
  const searchMinCapitalStock = convertToNumber(props.searchMinCapitalStock);
  const searchMaxCapitalStock = convertToNumber(props.searchMaxCapitalStock);
  const searchMinSitePV = convertToInteger(props.searchMinSitePV);
  const searchMaxSitePV = convertToInteger(props.searchMaxSitePV);
  NumberCheck(props.searchMinSalesAmount);
  NumberCheck(props.searchMaxSalesAmount);
  NumberCheck(props.searchMinEmployeeNumber);
  NumberCheck(props.searchMaxEmployeeNumber);
  NumberCheck(props.searchMinEstablishmentYear);
  NumberCheck(props.searchMaxEstablishmentYear);
  NumberCheck(props.searchMinCapitalStock);
  NumberCheck(props.searchMaxCapitalStock);

  const [staffLists, setStaffs] = useState<StaffList[]>([]);

  // 正規表現でスペースまたは全角スペースで分割して配列に変換
  // 役職
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

  // 部署
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

  const [recruitLists, setRecruits] = useState<RecruitList[]>([]);

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
        props.searchMaxCapitalStock !== "" ||
        props.searchMinSitePV !== "" ||
        props.searchMaxSitePV !== "" ||
        searchMinAverageAge !== "" ||
        searchMaxAverageAge !== "" ||
        searchSNS !== "" ||
        searchAdvertising !== "" ||
        searchFreeText1 !== "" ||
        searchExclusionFreeText1 !== ""
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
                  searchMinSitePV: searchMinSitePV,
                  searchMaxSitePV: searchMaxSitePV,
                  searchMinAverageAge: searchMinAverageAge,
                  searchMaxAverageAge: searchMaxAverageAge,
                  searchSNS: searchSNS,
                  searchAdvertising: searchAdvertising,
                  searchFreeText1: searchFreeText1,
                  searchFreeText2: searchFreeText2,
                  searchFreeText3: searchFreeText3,
                  searchFreeText4: searchFreeText4,
                  searchFreeText5: searchFreeText5,
                  searchExclusionFreeText1: searchExclusionFreeText1,
                  searchExclusionFreeText2: searchExclusionFreeText2,
                  searchExclusionFreeText3: searchExclusionFreeText3,
                  searchExclusionFreeText4: searchExclusionFreeText4,
                  searchExclusionFreeText5: searchExclusionFreeText5,
                },
              }
            );
            if (responseCount.statusText === "OK") {
              corporationCount(responseCount.data);
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
                      searchMinSitePV: searchMinSitePV,
                      searchMaxSitePV: searchMaxSitePV,
                      searchMinAverageAge: searchMinAverageAge,
                      searchMaxAverageAge: searchMaxAverageAge,
                      searchSNS: searchSNS,
                      searchAdvertising: searchAdvertising,
                      searchFreeText1: searchFreeText1,
                      searchFreeText2: searchFreeText2,
                      searchFreeText3: searchFreeText3,
                      searchFreeText4: searchFreeText4,
                      searchFreeText5: searchFreeText5,
                      searchExclusionFreeText1: searchExclusionFreeText1,
                      searchExclusionFreeText2: searchExclusionFreeText2,
                      searchExclusionFreeText3: searchExclusionFreeText3,
                      searchExclusionFreeText4: searchExclusionFreeText4,
                      searchExclusionFreeText5: searchExclusionFreeText5,
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
        setLocaleTextValue("担当者検索中です。");
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
              setTimeout(() => {
                setLocaleTextValue(
                  "検索結果は 0件です。　検索条件を変更してください"
                );
              }, 2000);
            }
          } catch (error) {
            console.error(error);
          }
        };
        getStaffs();
      }
    } else if (props.searchSearchClick === 5) {
      setRecruits([]);
      if (
        props.searchRecruitBigResult !== undefined ||
        props.searchRecruitMiddleResult !== undefined ||
        props.searchRecruitSmallResult !== undefined
      ) {
        setLocaleTextValue("検索中です。");
        const getRecruits = async () => {
          try {
            const responseCount = await axios.get(
              `${config().apiUrl}/recruit/searchRecruitResultCount`,
              {
                params: {
                  searchRecruitBigResult: props.searchRecruitBigResult,
                  searchRecruitMiddleResult: props.searchRecruitMiddleResult,
                  searchRecruitSmallResult: props.searchRecruitSmallResult,
                },
              }
            );
            if (responseCount.statusText === "OK") {
              const corporationIds = [...new Set(responseCount.data.map(item => item.corporation_id))];
              if (corporationIds.length >= 1 && corporationIds.length <= 10000) {
                setLocaleTextValue(
                  ` ${corporationIds.length}件ヒットしました。データを表示しています。`
                );
                const response = await axios.get(
                  `${config().apiUrl}/recruit/searchRecruitResult`,
                  {
                    params: {
                      searchRecruitBigResult: props.searchRecruitBigResult,
                      searchRecruitMiddleResult:
                        props.searchRecruitMiddleResult,
                      searchRecruitSmallResult: props.searchRecruitSmallResult,
                    },
                  }
                );

                if (response.statusText === "OK") {
                  setRecruits(response.data);
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

        getRecruits();
      } else {
        setLocaleTextValue("データ件数が多すぎるため、条件を絞り込んで下さい");
      }
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
        recruitLists={recruitLists}
        localeTextValue={localeTextValue}
        searchSearchClick={searchSearchClick}
        searchJobPosition={searchJobPosition}
        searchDepartment={searchDepartment}
        searchProfileSourceType={props.searchProfileSourceType}
        searchStaffName={searchStaffName}
      />
    </Card>
  );
}

export default CorporationLists;
