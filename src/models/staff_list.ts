export type StaffListRoles = "all" | "marketing" | "sales";

export interface StaffList {
  id: string;
  companyName: string;
  role: StaffListRoles;
  familyName: string;
  accountSource: string;
  profileLink: string;
}
