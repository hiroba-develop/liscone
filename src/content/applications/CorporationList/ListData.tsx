import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CorporationList } from "src/models/corporation_list";
import { config } from "src/utility/config/AppConfig";
import CorporationListsTable from "./CorporationListsTable";

function CorporationLists(props) {
  const [corporationLists, setCorporations] = useState<CorporationList[]>([]);
  const [corporationListsCount, setCorporationsCount] = useState<number>(0);
  const [localeTextValue, setLocaleTextValue] = useState<string>("");

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

  useEffect(() => {
    if (props.searchSearchClick === 1) {
      setCorporations([]);
      if (
        props.searchCorporateNumber !== "" ||
        props.searchCorporationName !== "" ||
        props.searchIndustry !== "" ||
        props.searchPrefectures !== "" ||
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
                  searchIndustry: props.searchIndustry,
                  searchPrefectures: props.searchPrefectures,
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
              setCorporationsCount(responseCount.data);
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
                      searchIndustry: props.searchIndustry,
                      searchPrefectures: props.searchPrefectures,
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
        corporationListsCount={corporationListsCount}
        localeTextValue={localeTextValue}
        searchCorporateNumber={props.searchCorporateNumber}
        searchCorporationName={props.searchCorporationName}
        searchIndustry={props.searchIndustry}
        searchPrefectures={props.searchPrefectures}
        searchRepresentativePhoneNumber={props.searchRepresentativePhoneNumber}
        searchCorporationListStatus={props.searchCorporationListStatus}
        searchMinSalesAmount={props.searchMinSalesAmount}
        searchMaxSalesAmount={props.searchMaxSalesAmount}
        searchMinEmployeeNumber={props.searchMinEmployeeNumber}
        searchMaxEmployeeNumber={props.searchMaxEmployeeNumber}
        searchMinEstablishmentYear={props.searchMinEstablishmentYear}
        searchMaxEstablishmentYear={props.searchMaxEstablishmentYear}
        searchMinCapitalStock={props.searchMinCapitalStock}
        searchMaxCapitalStock={props.searchMaxCapitalStock}
        searchSearchClick={props.searchSearchClick}
      />
    </Card>
  );
}

export default CorporationLists;
