import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CompanyList } from "src/models/company_list";
import { config } from "src/utility/config/AppConfig";
import CompanyListsTable from "./CompanyListsTable";

function CompanyLists(props) {
  const [companyLists, setCorporations] = useState<CompanyList[]>([]);

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
      <CompanyListsTable
        companyLists={companyLists}
        searchComparyNumber={props.searchComparyNumber}
        searchCompanyName={props.searchCompanyName}
        searchIndustry={props.searchIndustry}
        searchPrefectures={props.searchPrefectures}
        searchRepresentativePhoneNumber={props.searchRepresentativePhoneNumber}
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

export default CompanyLists;
