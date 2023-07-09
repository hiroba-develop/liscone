export type TaskStatus = "overdueday" | "pending" | "completed" | "dueday";

export interface TaskList {
  task_number: string;
  status: TaskStatus;
  task_name: string;
  deadline: string;
  execute_date: string;
  comment: string;
  corporationstaffEntity: {
    staff_name: string;
  };
  corporationEntity: {
    representative_phone_number: string;
    corporation_name: string;
  };
}
