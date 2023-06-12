export type CompanyListStatus = 'listed' | 'unlisted';

export interface CompanyList {
  id: string;
  companyNumber: string;
  companyName: string;
  industry: string;
  postNumber: string;
  headOfficeAddress: string;
  representativeNumber: string;
  representativeName: string;
  website: string;
  telephoneNumber: string;
  earnings: string;
  numberOfEmployees: string;
  established: number;
  capital: string;
  listing: CompanyListStatus;
}