import { StaffDetailsList } from "src/models/staff_details_list";
import StaffDetails2Table from "./StaffDetails2Table";

function ListLists() {
  const listLists: StaffDetailsList[] = [
    {
      id: "1",
      companyNumber: "C0000000001",
      companyName: "エキサイト株式会社",
      industry: "IT・情報通信",
      postNumber: "1234567",
      headOfficeAddress: "東京都港区南麻布3丁目20‐1 Daiwa麻布テラス4F",
      representativeNumber: "1-(618)312-3065",
      representativeName: "田中太郎",
      website: "excite.co.jp",
      earnings: "100万円",
      numberOfEmployees: "100名",
      established: 1997,
      capital: "100万円",
      listing: "listed",
      score: "10",
      primaryMailAddress: "info@example",
      dealingsStage: "商談化",
      productName: "商材A",
    },
  ];

  return <StaffDetails2Table staffDetails2List={listLists} />;
}

export default ListLists;
