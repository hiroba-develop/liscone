export type CompanyListStatus = "Y" | "N";

export interface StaffDetailsList {
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
  listing_status: CompanyListStatus;
}
