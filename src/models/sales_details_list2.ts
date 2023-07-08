export type CorporationListStatus = "Y" | "N";
export interface SalesDetailsList {
  corporation_id: string;
  corporate_number: string;
  corporation_name: string;
  business_category: string;
  zip_code: string;
  address: string;
  representative_phone_number: string;
  representative_name: string;
  home_page: string;
  sales_amount: string;
  employee_number: string;
  establishment_year: number;
  capital_stock: string;
  listing_status: CorporationListStatus;
  transaction_status: string;
  action_log: string;
  sales_list_type: string;
}
