export interface ActionList {
  task_number: string;
  corporationEntity: {
    corporation_name: string;
  };
  execute_date: string;
  saleslistEntity: {
    sales_list_name: string;
  };
  corporationstaffEntity: {
    staff_name: string;
  };
  execute_result: string;
  comment: string;
  memberEntity: {
    member_name: string;
  };
  task_name: string;
  deadline: string;
}
