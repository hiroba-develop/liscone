import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SalesDetailsList } from "src/models/sales_details_list";
import { config } from "src/utility/config/AppConfig";
import SalesListImportDetailsTable from "./SalesListImportDetailsTable";
import { commonErrorCallback } from "src/utility/http/ApiService";

function ListLists({ salesList, salesListStatistic }) {
  const [salesDetailsLists, setSalesDetailLists] = useState<SalesDetailsList[]>(
    []
  );
  useEffect(() => {
    const getSalesDetailLists = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/saleslistimportsDetail`,
          {
            params: {
              salesListNumber: salesList.sales_list_number,
            },
          }
        );

        if (response.statusText === "OK") {
          setSalesDetailLists(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getSalesDetailLists();
  }, [salesList.sales_list_number]);

  return (
    <Card sx={{ mt: 5 }}>
      <SalesListImportDetailsTable
        salesDetailsList={salesDetailsLists}
        salesListStatistic={salesListStatistic}
        selectedSalesList={salesList}
      />
    </Card>
  );
}

export default ListLists;
