export type SalesListStatus = "01" | "02";
export interface SalesListStatistic {
  sales_list_number: number;
  sales_list_name: string;
  created: Date;
  listCount: number;
  proceedCount: number;
  projectCount: number;
  contractCount: number;
  expectSales: number;
  member_name: string;
  sales_list_type: SalesListStatus;
}
