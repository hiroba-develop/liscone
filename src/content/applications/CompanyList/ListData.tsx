import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CompanyList } from "src/models/company_list";
import { config } from "src/utility/config/AppConfig";
import CompanyListsTable from "./CompanyListsTable";

function CompanyLists() {
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
      <CompanyListsTable companyLists={companyLists} />
    </Card>
  );
}

export default CompanyLists;
