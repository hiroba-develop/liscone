export type ActionListStatus = 'recall';

export interface ActionList {
  id: string;
  companyName: string;
  actionDate: string;
  list: string;
  manager: string;
  actionResult: string;
  minorItem: string;
  comment: string;
  user: string;
  task: ActionListStatus;
  taskDeadline: string;
}