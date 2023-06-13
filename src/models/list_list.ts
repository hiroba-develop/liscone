export type ListListStatus = 'contactlist' | 'companylist';

export interface ListList {
  id: string;
  listName: string;
  createdDate: string;
  counter: number;
  digestionNumber: number;
  negotiation: string;
  project: string;
  orderDate: string;
  yomi: string;
  user: string;
  listType: ListListStatus;
}