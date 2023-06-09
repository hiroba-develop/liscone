export type CorporationListStatus = "Y" | "N";
export type StaffListRoles = "all" | "marketing" | "sales";
export type StaffListPositions =
  | "general"
  | "sectionManager"
  | "generalManager";

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
  taskCount: string;
  memo: string;
  action_log: string;
  sales_list_type: string;

  staff_id: string;
  job_position: StaffListPositions;
  role: StaffListRoles;
  staff_name: string;
  profile_source_type: string;
  profile_link: string;
  other_information: string;
}
