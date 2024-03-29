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
  average_age: string;
  business_detail: string;
  human_capital_running_evaluation: string;
  human_capital_running_evidence: string;
  human_capital_running_url: string;
  human_resources_educational_evaluation: string;
  human_resources_educational_evidence: string;
  human_resources_educational_url: string;
  legacy_company_evaluation: string;
  legacy_company_evidence: string;
  legacy_company_url: string;
  new_business_evaluation: string;
  new_business_evidence: string;
  new_business_url: string;
  digital_marketing_evaluation: string;
  digital_marketing_evidence: string;
  digital_marketing_url: string;
  sns_evaluation: string;
  sns_evidence: string;
  sns_url: string;
  sns_line_account: string;
  sns_twitter: string;
  sns_instagram: string;
  sns_tiktok: string;
  sns_youtube: string;
  sns_facebook: string;
  source_code: string;
}
