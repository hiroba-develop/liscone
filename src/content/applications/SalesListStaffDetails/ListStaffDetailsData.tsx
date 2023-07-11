import { Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { StaffList } from "src/models/staff_list";
import { config } from "src/utility/config/AppConfig";
import SalesListStaffDetailsTable from "./SalesListStaffDetailsTable";

function ListLists(salesList) {
  const [staffLists, setStaffLists] = useState<StaffList[]>([]);
  useEffect(() => {
    const getSalesDetailLists = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/corporationstaffs/bySalesList`,
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
        console.error(error);
      }
    };

    getSalesDetailLists();
  }, []);

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
