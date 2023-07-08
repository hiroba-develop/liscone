import { Card } from "@mui/material";
import { SalesList } from "src/models/sales_list";
import ListListsTable from "./SalesListTable";
import { useEffect, useState } from "react";
import { config } from "src/utility/config/AppConfig";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";

function ListLists() {
  const [salesLists, setSalesLists] = useState<SalesList[]>([]);
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
  }, []);

  return (
    <Card>
      <ListListsTable salesLists={salesLists} />
    </Card>
  );
}

export default ListLists;
