import { Card } from "@mui/material";
import { StaffList } from "src/models/staff_list";
import StaffListsTable from "./StaffListsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";

function StaffLists(props) {
  const [staffLists, setStaffs] = useState<StaffList[]>([]);
  const [localeTextValue, setLocaleTextValue] = useState<string>("");

  useEffect(() => {
    if (props.searchSearchClick === 1) {
      setStaffs([]);
      if (
        props.searchCorporationName !== "" ||
        props.searchJobPosition !== "" ||
        props.searchProfileSourceType !== "" ||
        props.searchStaffName !== ""
      ) {
        setLocaleTextValue("検索中です。");
        const getCorporations = async () => {
          try {
            const responseCount = await axios.get(
              `${config().apiUrl}/corporationstaffs/searchChickCount`,
              {
                params: {
                  searchCorporationName: props.searchCorporationName,
                  searchJobPosition: props.searchJobPosition,
                  searchProfileSourceType: props.searchProfileSourceType,
                  searchStaffName: props.searchStaffName,
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
                      searchCorporationName: props.searchCorporationName,
                      searchJobPosition: props.searchJobPosition,
                      searchProfileSourceType: props.searchProfileSourceType,
                      searchStaffName: props.searchStaffName,
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
