export type SalesListStatus = "01" | "02";

export interface SalesList {
  sales_list_number: string;
  sales_list_name: string;
  member_id: string;
  sales_list_type: SalesListStatus;
  sales_product_number: number;
  listsNum: string;
  proceedNum: string;
  meetNum: string;
  negoNum: string;
  contractNum: string;
  yomi: string;
  created: Date;
  memberEntity: {
    member_id: string;
    member_name: string;
  };
}
