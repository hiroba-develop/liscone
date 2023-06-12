import { Card } from '@mui/material';
import { TaskList } from 'src/models/task_list';
import TaskListsTable from './TaskListsTable';


function TaskLists() {
  const taskLists: TaskList[] = [
    {
      id: '1',
      status: 'completed',
      task: 'task001',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-111-1111',
      comment: 'comment',
    },
    {
      id: '2',
      status: 'completed',
      task: 'task002',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-222-2222',
      comment: 'comment',
    },
    {
      id: '3',
      status: 'failed',
      task: 'task003',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-333-3333',
      comment: 'comment',
    },
    {
      id: '4',
      status: 'failed',
      task: 'task004',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-444-4444',
      comment: 'comment',
    },
    {
      id: '5',
      status: 'pending',
      task: 'task005',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-555-5555',
      comment: 'comment',
    },
    {
      id: '6',
      status: 'failed',
      task: 'task006',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-666-6666',
      comment: 'comment',
    },
    {
      id: '7',
      status: 'failed',
      task: 'task007',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-777-7777',
      comment: 'comment',
    },
    {
      id: '8',
      status: 'failed',
      task: 'task008',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-888-8888',
      comment: 'comment',
    },
    {
      id: '9',
      status: 'completed',
      task: 'task009',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-999-9999',
      comment: 'comment',
    },
    {
      id: '10',
      status: 'completed',
      task: 'task010',      
      dueDate: new Date().getTime(),      
      companyToCall: 'company to call',
      chargeOfCalling: 'in charge of calling',
      phoneNumber: '02-000-0010',
      comment: 'comment',
    }
  ];

  return (
    <Card>
      <TaskListsTable taskLists={taskLists} />
    </Card>
  );
}

export default TaskLists;
