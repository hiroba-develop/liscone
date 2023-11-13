import { Card } from "@mui/material";
import { StaffList } from "src/models/staff_list";
import StaffListsTable from "./StaffListsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";

function StaffLists(props) {
  const [staffLists, setStaffs] = useState<StaffList[]>([]);
  const [localeTextValue, setLocaleTextValue] = useState<string>("");
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
  const searchCorporationName =
    props.searchCorporationName.trim() === ""
      ? ""
      : props.searchCorporationName;
  const searchJobPosition =
    props.searchJobPosition.trim() === "" ? "" : props.searchJobPosition;
  const searchDepartment =
    props.searchDepartment.trim() === "" ? "" : props.searchDepartment;
  const searchStaffName =
    props.searchStaffName.trim() === "" ? "" : props.searchStaffName;

  useEffect(() => {
    if (props.searchSearchClick === 1) {
      setStaffs([]);
      if (
        searchCorporationName !== "" ||
        searchJobPosition !== "" ||
        searchDepartment !== "" ||
        props.searchProfileSourceType !== undefined ||
        searchStaffName !== ""
      ) {
        setLocaleTextValue("検索中です。");

        const getCorporations = async () => {
          try {
            const responseCount = await axios.get(
              `${config().apiUrl}/corporationstaffs/searchChickCount`,
              {
                params: {
                  searchCorporationName: searchCorporationName,
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
            if (responseCount.statusText === "OK") {
              if (responseCount.data >= 1 && responseCount.data <= 10000) {
                setLocaleTextValue(
                  ` ${responseCount.data}件ヒットしました。データを表示しています。`
                );
                const response = await axios.get(
                  `${config().apiUrl}/corporationstaffs/searchChick`,
                  {
                    params: {
                      searchCorporationName: searchCorporationName,
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
      <StaffListsTable
        localeTextValue={localeTextValue}
        staffLists={staffLists}
      />
    </Card>
  );
}

export default StaffLists;
