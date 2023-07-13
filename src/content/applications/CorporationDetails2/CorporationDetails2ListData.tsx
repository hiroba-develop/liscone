import axios from "axios";
import { useEffect, useState } from "react";
import { CorporationDetailsList } from "src/models/corporation_details_list";
import { config } from "src/utility/config/AppConfig";
import CorporationDetails1Table from "./CorporationDetails2Table";
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
  }, [corporationList.corporation_id]);

  return <CorporationDetails1Table corporationDetails1List={staffLists} />;
}

export default ListLists;
