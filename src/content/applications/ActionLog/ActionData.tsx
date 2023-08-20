import { Card } from "@mui/material";
import { ActionList } from "src/models/action_list";
import ActionListsTable from "./ActionListsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { useRecoilValue } from "recoil";
import { lsAuthAtom } from "src/utility/recoil/auth/Auth.atom";

function ActionLists(props) {
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

  return (
    <Card>
      <ActionListsTable
        actionLists={actionLists}
        searchCorporationName={props.searchCorporationName}
        searchSalesListName={props.searchSalesListName}
        searchStaffName={props.searchStaffName}
        searchMemberName={props.searchMemberName}
        searchExecuteBigResult={props.searchExecuteBigResult}
        searchExecuteSmallResult={props.searchExecuteSmallResult}
        searchFromDate={props.searchFromDate}
        searchToDate={props.searchToDate}
      />
    </Card>
  );
}

export default ActionLists;
