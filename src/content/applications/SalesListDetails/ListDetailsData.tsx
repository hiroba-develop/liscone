import { Card } from "@mui/material";
import { SalesDetailsList } from "src/models/sales_details_list";
import ListListsTable from "./SalesListDetailsTable";

function ListLists() {
  const listLists: SalesDetailsList[] = [
    {
      corporation_id: "1",
      corporate_number: "C0000000001",
      corporation_name: "エキサイト株式会社",
      business_category: "IT・情報通信",
      zip_code: "1234567",
      address: "東京都港区南麻布3丁目20‐1 Daiwa麻布テラス4F",
      representative_phone_number: "1-(618)312-3065",
      representative_name: "田中太郎",
      home_page: "excite.co.jp",
      sales_amount: "100万円",
      employee_number: "100名",
      establishment_year: 1997,
      capital_stock: "100万円",
      listing_status: "N",
      action_log: "行動ログA",
      transaction_status: "取引ステータスA",
    },
    {
      corporation_id: "2",
      corporate_number: "C0000000002",
      corporation_name: "エキサイト株式会社",
      business_category: "飲食",
      zip_code: "1234567",
      address: "東京都港区南麻布3丁目20‐1 Daiwa麻布テラス4F",
      representative_phone_number: "7-(648)993-5934",
      representative_name: "田中太郎",
      home_page: "excite.co.jp",
      sales_amount: "100万円",
      employee_number: "100名",
      establishment_year: 1997,
      capital_stock: "100万円",
      listing_status: "Y",
      action_log: "行動ログB",
      transaction_status: "取引ステータスB",
    },
  ];

  return (
    <Card sx={{ mt: 5 }}>
      <ListListsTable salesDetailsList={listLists} />
    </Card>
  );
}

export default ListLists;
