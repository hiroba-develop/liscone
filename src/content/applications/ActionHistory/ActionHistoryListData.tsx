import axios from "axios";
import { useEffect, useState } from "react";
import { ActionList } from "src/models/action_list";
import { config } from "src/utility/config/AppConfig";
import ActionHistoryTable from "./ActionHistoryTable";

function ListLists(salesList) {
  const [actionLists, setActionLogs] = useState<ActionList[]>([]);

  useEffect(() => {
    const getActionLogs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/actionlogs/salesListActions`,
          {
            params: {
              salesListNumber: salesList.sales_list_number,
            },
          }
        );

        if (response.statusText === "OK") {
          setActionLogs(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getActionLogs();
  }, []);

  return <ActionHistoryTable actionLists={actionLists} />;
}

export default ListLists;
