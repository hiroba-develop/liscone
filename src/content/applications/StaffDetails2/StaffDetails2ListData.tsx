import { StaffDetailsList } from "src/models/staff_details_list";
import StaffDetails2Table from "./StaffDetails2Table";

function ListLists() {
  const listLists: StaffDetailsList[] = [
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
      listing_status: "Y",
    },
  ];

  return <StaffDetails2Table staffDetails2List={listLists} />;
}

export default ListLists;
