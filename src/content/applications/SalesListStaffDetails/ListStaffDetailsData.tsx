import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { SalesListStaff } from "src/models/sales_list_staff";
import { config } from "src/utility/config/AppConfig";
import SalesListStaffDetailsTable from "./SalesListStaffDetailsTable";
import { commonErrorCallback } from "src/utility/http/ApiService";

function ListLists({ salesList, salesListStatistic }) {
  const [staffLists, setStaffLists] = useState<SalesListStaff[]>([]);

  useEffect(() => {
    const getSalesDetailLists = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/salesliststaffs`,
          {
            params: {
              salesListNumber: salesList.sales_list_number,
            },
          }
        );

        if (response.statusText === "OK") {
          setStaffLists(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getSalesDetailLists();
  }, [salesList.sales_list_number]);

  console.log(staffLists)
  return (
    <Card sx={{ mt: 5 }}>
      <SalesListStaffDetailsTable
        staffList={staffLists}
        selectedSalesList={salesList}
        salesListStatistic={salesListStatistic}
      />
    </Card>
  );
}

export default ListLists;
