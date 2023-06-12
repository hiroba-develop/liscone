export type CryptoOrderStatus = "completed" | "pending" | "failed";
export type CurrentStatus = "本日期限" | "完了" | "未完了";

export interface CryptoOrder {
  id: string;
  tradingStatus: CurrentStatus;
  task: string;
  deadline: string;
  comName: string;
  comManager: string;
  comTelephone: string;
}
