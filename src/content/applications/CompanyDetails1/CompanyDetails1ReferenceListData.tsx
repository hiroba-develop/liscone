import { Card } from "@mui/material";
import { SalesDetailsList } from "src/models/salesdetails_list";
import CompanyDetails1ReferenceTable from "./CompanyDetails1ReferenceTable";

function ListLists() {
  const listLists: SalesDetailsList[] = [
    {
      id: "1",
      corporateNumber: "C0000000001",
      corporationName: "エキサイト株式会社",
      businessCategory: "IT・情報通信",
      zipCode: "1234567",
      address: "東京都港区南麻布3丁目20‐1 Daiwa麻布テラス4F",
      representativePhoneNumber: "1-(618)312-3065",
      representativeName: "田中太郎",
      homePage: "excite.co.jp",
      salesAmount: "100万円",
      employeeNumber: "100名",
      establishmentYear: "1997",
      capitalStock: "100万円",
      listingStatus: "未上場",
      actionLog: "行動ログA",
      transactionStatus: "取引ステータスA",
    },
  ];

  return (
    <Card sx={{ mt: 5 }}>
      <CompanyDetails1ReferenceTable companydetails1referenceList={listLists} />
    </Card>
  );
}

export default ListLists;
