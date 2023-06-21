export type StaffListStatus = "listed" | "unlisted";

export interface StaffDetails1List {
  id: string;
  companyNumber: string;
  companyName: string;
  industry: string;
  postNumber: string;
  headOfficeAddress: string;
  representativeNumber: string;
  representativeName: string;
  website: string;
  earnings: string;
  numberOfEmployees: string;
  established: number;
  capital: string;
  listing: StaffListStatus;
  score: string;
  primaryMailAddress: string;
  dealingsStage: string;
  productName: string;
}
