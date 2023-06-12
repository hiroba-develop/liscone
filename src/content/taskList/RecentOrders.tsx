import { Card } from "@mui/material";
import { CryptoOrder } from "src/models/crypto_order";
import RecentOrdersTable from "./RecentOrdersTable";
import { subDays } from "date-fns";

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      id: "1",
      tradingStatus: "本日期限",
      task: "アクションA",
      deadline: "2023/01/25",
      comName: "株式会社AAAAA",
      comManager: "大友玲奈",
      comTelephone: "123-4567",
    },
    {
      id: "2",
      tradingStatus: "完了",
      task: "アクションA",
      deadline: "2023/01/25",
      comName: "株式会社AAAAA",
      comManager: "大友玲奈",
      comTelephone: "123-4567",
    },
    {
      id: "3",
      tradingStatus: "未完了",
      task: "アクションB",
      deadline: "2023/01/25",
      comName: "株式会社AAAAA",
      comManager: "大友玲奈",
      comTelephone: "123-4567",
    },
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
