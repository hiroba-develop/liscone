export type CorporationListStatus = "Y" | "N";
export type StaffListRoles = "all" | "marketing" | "sales";
export type StaffListPositions =
  | "general"
  | "sectionManager"
  | "generalManager";
export interface StaffDetails2List {
  sales_list_number: string;
  corporation_id: string;
  staff_id: string;
  transaction_status: string;
  memo: string;
  staff: {
    staff_id: string;
    corporation_id: string;
    job_position: StaffListPositions;
    role: StaffListRoles;
    staff_name: string;
    profile_source_type: string;
    profile_link: string;
    other_information: string;
  };
  corporation: {
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
  };
}
