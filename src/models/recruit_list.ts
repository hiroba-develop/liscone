export type CorporationListStatus = "Y" | "N" | "";

export interface RecruitList {
  corporation_id: string;
  recruit_large_category: string;
  recruit_middle_category: string;
  recruit_small_category: string;
  corporationEntity: {
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
  };
}
