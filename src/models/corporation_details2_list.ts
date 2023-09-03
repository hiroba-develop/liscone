export type CorporationListStatus = "Y" | "N";
export type SalesListStatus = "01" | "02";

export interface corporationEntity {
  corporation_id: string;
  corporate_number: string;
  corporation_name: string;
  business_category: string;
  zip_code: string;
  address: string;
  representative_phone_number: string;
  representative_name: string;
  home_page: string;
  telephoneNumber: string;
  sales_amount: number;
  employee_number: number;
  establishment_year: number;
  capital_stock: number;
}

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

export interface CorporationList {
  corporation_id: string;
  corporate_number: string;
  corporation_name: string;
  business_category: string;
  zip_code: string;
  address: string;
  representative_phone_number: string;
  representative_name: string;
  home_page: string;
  telephoneNumber: string;
  sales_amount: string;
  employee_number: string;
  establishment_year: number;
  capital_stock: string;
  listing_status: CorporationListStatus;
  transaction_status: string;
  memo: string;
  corporationEntity: corporationEntity;
  saleslistEntity: SalesList;
}
