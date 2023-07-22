import { Card } from "@mui/material";
import { ActionList } from "src/models/action_list";
import ActionListsTable from "./ActionListsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";

function ActionLists(props) {
  const [actionLists, setActionLogs] = useState<ActionList[]>([]);

  useEffect(() => {
    const getActionLogs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/actionlogs/search`
        );

        if (response.statusText === "OK") {
          setActionLogs(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getActionLogs();
  }, []);
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
