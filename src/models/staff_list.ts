export type StaffListRoles = "all" | "marketing" | "sales";
export type StaffListPositions =
  | "general"
  | "sectionManager"
  | "generalManager";

export interface StaffList {
  id: string;
  companyName: string;
  positions: StaffListPositions;
  role: StaffListRoles;
  familyName: string;
  accountSource: string;
  profileLink: string;
  otherInformation: string;
}
