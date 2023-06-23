import { Card } from "@mui/material";
import { StaffDetailsList } from "src/models/staff_details_list";
import StaffDetails1Table from "./StaffDetails1Table";

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
    {
      id: "2",
      companyNumber: "C0000000002",
      companyName: "エキサイト株式会社",
      industry: "飲食",
      postNumber: "1234567",
      headOfficeAddress: "東京都港区南麻布3丁目20‐1 Daiwa麻布テラス4F",
      representativeNumber: "7-(648)993-5934",
      representativeName: "田中太郎",
      website: "excite.co.jp",
      earnings: "100万円",
      numberOfEmployees: "100名",
      established: 1997,
      capital: "100万円",
      listing: "listed",
      score: "20",
      primaryMailAddress: "info@example",
      dealingsStage: "03",
      productName: "商材A",
    },
  ];

  return (
    <Card sx={{ mt: 5 }}>
      <StaffDetails1Table staffDetails1List={listLists} />
    </Card>
  );
}

export default ListLists;
