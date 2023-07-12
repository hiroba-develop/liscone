import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CorporationList } from "src/models/corporation_list";
import { config } from "src/utility/config/AppConfig";
import CorporationListsTable from "./CorporationListsTable";

function CorporationLists(props) {
  const [corporationLists, setCorporations] = useState<CorporationList[]>([]);

  useEffect(() => {
    const getCorporations = async () => {
      try {
        const response = await axios.get(`${config().apiUrl}/corporations`);

        if (response.statusText === "OK") {
          setCorporations(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCorporations();
  }, []);

  return (
    <Card>
      <CorporationListsTable corporationLists={corporationLists} />
    </Card>
  );
}

export default CorporationLists;
