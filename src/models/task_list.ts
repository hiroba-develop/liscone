export type TaskStatus = 'pending' | 'completed' | 'failed';

export interface TaskList {
  id: string;
  status: TaskStatus;
  task: string;
  dueDate: number;
  companyToCall: string;
  chargeOfCalling: string;
  phoneNumber: string;
  comment: string;
}