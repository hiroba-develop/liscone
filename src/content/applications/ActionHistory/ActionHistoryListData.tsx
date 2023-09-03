import axios from "axios";
import { useEffect, useState } from "react";
import { ActionList } from "src/models/action_list";
import { config } from "src/utility/config/AppConfig";
import ActionHistoryTable from "./ActionHistoryTable";
import { commonErrorCallback } from "src/utility/http/ApiService";

function ListLists({ salesList, listDetails }) {
  const [actionLists, setActionLogs] = useState<ActionList[]>([]);

  useEffect(() => {
    const getActionLogs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/actionlogs/salesListActions`,
          {
            params: {
              salesList: salesList,
              listDetails: listDetails,
            },
          }
        );

        if (response.statusText === "OK") {
          setActionLogs(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getActionLogs();
  }, [listDetails, salesList]);

  return <ActionHistoryTable actionLists={actionLists} />;
}

export default ListLists;
