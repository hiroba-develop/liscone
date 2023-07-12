import { Card } from "@mui/material";
import { SalesList } from "src/models/sales_list";
import ListListsTable from "./SalesListTable";
import { useEffect, useState } from "react";
import { config } from "src/utility/config/AppConfig";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { SalesListStatistic } from "src/models/sales_list_statistic";

function ListLists() {
  const [salesLists, setSalesLists] = useState<SalesList[]>([]);
  const [salesListStatistics, setSalesListStatistics] = useState<
    SalesListStatistic[]
  >([]);
  const auth = useRecoilValue(authAtom);
  useEffect(() => {
    const getSalesLists = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/memberid`,
          {
            params: { userId: auth.userId },
          }
        );

        if (response.statusText === "OK") {
          setSalesLists(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSalesLists();

    const getSalesListStatistic = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/statistic`,
          {
            params: { userId: auth.userId },
          }
        );

        if (response.statusText === "OK") {
          setSalesListStatistics(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getSalesListStatistic();
  }, []);

  return (
    <Card>
      <ListListsTable
        salesLists={salesLists}
        salesListStatistics={salesListStatistics}
      />
    </Card>
  );
}

export default ListLists;
