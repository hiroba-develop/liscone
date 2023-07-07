import axios from "axios";
import { useEffect, useState } from "react";
import { CompanyDetailsList } from "src/models/company_details_list";
import { config } from "src/utility/config/AppConfig";
import CompanyDetails1Table from "./CompanyDetails2Table";

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

  return <CompanyDetails1Table companyDetails1List={staffLists} />;
}

export default ListLists;
