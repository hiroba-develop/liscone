import { ActionHistoryList } from "src/models/action_history_list";
import ActionHistoryTable from "./ActionHistoryTable";

function ListLists() {
  const listLists: ActionHistoryList[] = [
    {
      id: "1",
      corporationName: "エキサイト株式会社",
      actionDate: "2022/01/10",
      staffName: "大友玲奈",
      actionResult: "担当者接触",
      smallItem: "お断り",
      comment: "テストメモ1",
      user: "大友玲奈",
      task: "再架電",
    },
    {
      id: "2",
      corporationName: "エキサイト株式会社",
      actionDate: "2022/01/10",
      staffName: "大友玲奈",
      actionResult: "担当者接触",
      smallItem: "お断り",
      comment: "テストメモ2",
      user: "大友玲奈",
      task: "再架電",
    },
    {
      id: "3",
      corporationName: "インポートリスト",
      actionDate: "2022/01/10",
      staffName: "大友玲奈",
      actionResult: "担当者接触",
      smallItem: "お断り",
      comment: "テストメモ3",
      user: "大友玲奈",
      task: "再架電",
    },
  ];

  return <ActionHistoryTable staffDetails2ActionHistoryLists={listLists} />;
}

export default ListLists;
