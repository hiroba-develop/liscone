import { Card } from "@mui/material";
import { ActionList } from "src/models/action_list";
import ActionListsTable from "./ActionListsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";

function ActionLists() {
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
        console.error(error);
      }
    };

    getActionLogs();
  }, []);

  return (
    <Card>
      <ActionListsTable actionLists={actionLists} />
    </Card>
  );
}

export default ActionLists;
