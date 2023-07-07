import { Card } from "@mui/material";
import { CompanyDetailsList } from "src/models/company_details_list";
import CompanyDetails1Table from "./CompanyDetails1Table";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";

function ListLists(companyList) {
  const [staffLists, setStaffs] = useState<CompanyDetailsList[]>([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/companystaffs/byCompany`,
          {
            params: {
              corporationId: companyList.corporation_id,
            },
          }
        );

        if (response.statusText === "OK") {
          setStaffs(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getStaffs();
  }, []);
  return (
    <Card sx={{ mt: 5 }}>
      <CompanyDetails1Table companyDetails1List={staffLists} />
    </Card>
  );
}

export default ListLists;
