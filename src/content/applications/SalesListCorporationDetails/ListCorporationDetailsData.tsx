import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SalesDetailsList } from "src/models/sales_details_list";
import { config } from "src/utility/config/AppConfig";
import ListListsTable from "./SalesListCorporationDetailsTable";

function ListLists(salesList) {
  const [salesDetailsLists, setSalesDetailLists] = useState<SalesDetailsList[]>(
    []
  );
  useEffect(() => {
    const getSalesDetailLists = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/saleslistcorporations`,
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
        console.error(error);
      }
    };

    getSalesDetailLists();
  }, [salesList.sales_list_number, salesList.sales_list_type]);

  return (
    <Card sx={{ mt: 5 }}>
      <ListListsTable
        salesDetailsList={salesDetailsLists}
        selectedSalesList={salesList}
      />
    </Card>
  );
}

export default ListLists;
