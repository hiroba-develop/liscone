import { Card } from "@mui/material";
import { SalesList } from "src/models/sales_list";
import ListListsTable from "./SalesListReferenceTable";

function ListLists() {
  const listLists: SalesList[] = [
    {
      id: "1",
      listName: "2023011_リスト名",
      createdDate: "2022/01/1",
      counter: 100,
      digestionNumber: 100,
      negotiation: "10%",
      project: "10%",
      orderDate: "10%",
      yomi: "100,000円",
      user: "山田太郎,田中花子",
      listType: "contactlist",
    },
  ];

  return (
    <Card sx={{ mt: 5 }}>
      <ListListsTable salesList={listLists} />
    </Card>
  );
}

export default ListLists;
