import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SalesDetailsList } from "src/models/sales_details_list";
import { config } from "src/utility/config/AppConfig";
import ListListsTable from "./SalesListDetailsTable";

function ListLists(salesList) {
  const [corporationLists, setCorporationLists] = useState<SalesDetailsList[]>(
    []
  );
  useEffect(() => {
    const getCorporationLists = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/saleslistcorporations`,
          {
            params: {
              salesListNumber: salesList.sales_list_number,
              salesListType: salesList.sales_list_type,
            },
          }
        );

        if (response.statusText === "OK") {
          if (response.data.sales_list_type === "01") {
            setCorporationLists(response.data.salesCorporations);
          } else {
            setCorporationLists(response.data.salesStaffs);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCorporationLists();
  }, []);

  return (
    <Card sx={{ mt: 5 }}>
      <ListListsTable
        salesDetailsList={corporationLists}
        selectedSalesList={salesList}
      />
    </Card>
  );
}

export default ListLists;
