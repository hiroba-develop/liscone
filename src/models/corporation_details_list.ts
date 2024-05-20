export type StaffListRoles = "all" | "marketing" | "sales";
export type StaffListPositions =
  | "general"
  | "sectionManager"
  | "generalManager";

export interface CorporationDetailsList {
  staff_id: string;
  corporation_id: string;
  corporation_name: string;
  job_position: StaffListPositions;
  role: StaffListRoles;
  staff_name: string;
  profile_source_type: string;
  profile_link: string;
  other_information: string;
  employee_status:number;
  corporationEntity: {
    corporation_name: string;
    corporation_id: string;
  };
}
