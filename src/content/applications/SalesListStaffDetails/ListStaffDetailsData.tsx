import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { StaffDetails2List } from "src/models/staff_details2_list";
import { config } from "src/utility/config/AppConfig";
import SalesListStaffDetailsTable from "./SalesListStaffDetailsTable";

function ListLists(salesList) {
  const [staffLists, setStaffLists] = useState<StaffDetails2List[]>([]);

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
          setStaffLists(response.data.salesStaffs);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSalesDetailLists();
  }, [salesList.sales_list_number]);

  return (
    <Card sx={{ mt: 5 }}>
      <SalesListStaffDetailsTable
        staffList={staffLists}
        selectedSalesList={salesList}
      />
    </Card>
  );
}

export default ListLists;
