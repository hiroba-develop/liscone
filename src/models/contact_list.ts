export type ContactListRoles = 'all' | 'marketing' | 'sales';

export interface ContactList {
  id: string;
  companyName: string;
  role: ContactListRoles;
  familyName: string;
  accountSource: string;
  profileLink: string;
}