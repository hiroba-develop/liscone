import { Card } from "@mui/material";
import { SalesDetailsList } from "src/models/salesdetails_list";
import ListListsTable from "./SalesListDetailsTable";

function ListLists() {
  const listLists: SalesDetailsList[] = [
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
    {
      id: "2",
      listName: "2023011_リスト名",
      createdDate: "2022/01/2",
      counter: 100,
      digestionNumber: 100,
      negotiation: "10%",
      project: "10%",
      orderDate: "10%",
      yomi: "120,000円",
      user: "山田太郎,田中花子",
      listType: "companylist",
    },
  ];

  return (
    <Card>
      <ListListsTable salesList={listLists} />
    </Card>
  );
}

export default ListLists;
