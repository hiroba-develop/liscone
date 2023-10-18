import { Card } from "@mui/material";
import { CorporationDetailsList } from "src/models/corporation_details_list";
import ImportDetailsTable from "./ImportDetailsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";

function ListLists(corporationList) {
  const [staffLists, setStaffs] = useState<CorporationDetailsList[]>([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/corporationstaffs/byCorporation`,
          {
            params: {
              corporationId: corporationList.corporation_id,
            },
          }
        );

        if (response.statusText === "OK") {
          setStaffs(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getStaffs();
  }, []);
  return (
    <Card sx={{ mt: 5 }}>
      <ImportDetailsTable importDetailsList={staffLists} />
    </Card>
  );
}

export default ListLists;
