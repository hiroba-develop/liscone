export type CorporationListStatus = "Y" | "N" | "";

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
  sales_amount: number;
  employee_number: number;
  establishment_year: number;
  capital_stock: number;
  listing_status: CorporationListStatus;
}
