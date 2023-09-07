export type CorporationListStatus = "Y" | "N" | "U";
export type StaffListRoles = "all" | "marketing" | "sales";
export type StaffListPositions =
  | "general"
  | "sectionManager"
  | "generalManager";
export interface SalesListStaff {
  salesStaffs_sales_list_number: string;
  corporation_corporation_id: string;
  staff_staff_id: string;
  salesStaffs_transaction_status: string;
  salesStaffs_memo: string;
  staff_job_position: StaffListPositions;
  role: StaffListRoles;
  staff_staff_name: string;
  staff_profile_source_type: string;
  staff_profile_link: string;
  staff_other_information: string;
  corporation_corporate_number: string;
  corporation_corporation_name: string;
  corporation_business_category: string;
  corporation_zip_code: string;
  corporation_address: string;
  corporation_representative_phone_number: string;
  corporation_representative_name: string;
  corporation_home_page: string;
  corporation_sales_amount: string;
  corporation_employee_number: string;
  corporation_establishment_year: number;
  corporation_capital_stock: string;
  corporation_listing_status: CorporationListStatus;
}
