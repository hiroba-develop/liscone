export type SalesListStatus = "contactlist" | "companylist";

export interface SalesList {
  id: string;
  listName: string;
  createdDate: string;
  counter: number;
  digestionNumber: number;
  negotiation: string;
  project: string;
  orderDate: string;
  yomi: string;
  user: string;
  listType: SalesListStatus;
}
