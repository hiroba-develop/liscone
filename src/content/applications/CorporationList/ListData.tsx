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
      <CorporationListsTable
        corporationLists={corporationLists}
        searchCorporateNumber={props.searchCorporateNumber}
        searchCorporationName={props.searchCorporationName}
        searchIndustry={props.searchIndustry}
        searchPrefectures={props.searchPrefectures}
        searchRepresentativePhoneNumber={props.searchRepresentativePhoneNumber}
        searchCorporationListStatus={props.searchCorporationListStatus}
        searchMinSalesAmount={props.searchMinSalesAmount}
        searchMaxSalesAmount={props.searchMaxSalesAmount}
        searchMinEmployeeNumber={props.searchMinEmployeeNumber}
        searchMaxEmployeeNumber={props.searchMaxEmployeeNumber}
        searchMinEstablishmentYear={props.searchMinEstablishmentYear}
        searchMaxEstablishmentYear={props.searchMaxEstablishmentYear}
        searchMinCapitalStock={props.searchMinCapitalStock}
        searchMaxCapitalStock={props.searchMaxCapitalStock}
      />
    </Card>
  );
}

export default CorporationLists;
