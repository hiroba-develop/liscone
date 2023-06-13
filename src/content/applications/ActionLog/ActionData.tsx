import { Card } from '@mui/material';
import { ActionList } from 'src/models/action_list';
import ActionListsTable from './ActionListsTable';

function ActionLists() {
  const actionLists: ActionList[] = [
    {
      id: '1',
      companyName: 'エキサイト株式会社1',
      actionDate: '2022/01/1',
      list: 'リスト名',
      manager: '大友玲菜1',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/1'
    },
    {
      id: '2',
      companyName: 'エキサイト株式会社2',
      actionDate: '2022/01/2',
      list: 'リスト名',
      manager: '大友玲菜2',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/2'
    },
    {
      id: '3',
      companyName: 'エキサイト株式会社3',
      actionDate: '2022/01/3',
      list: 'リスト名',
      manager: '大友玲菜3',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/3'
    },
    {
      id: '4',
      companyName: 'エキサイト株式会社4',
      actionDate: '2022/01/4',
      list: 'リスト名',
      manager: '大友玲菜4',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/4'
    },
    {
      id: '5',
      companyName: 'エキサイト株式会社5',
      actionDate: '2022/01/5',
      list: 'リスト名',
      manager: '大友玲菜5',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/5'
    },
    {
      id: '6',
      companyName: 'エキサイト株式会社6',
      actionDate: '2022/01/6',
      list: 'リスト名',
      manager: '大友玲菜6',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/6'
    },
    {
      id: '7',
      companyName: 'エキサイト株式会社7',
      actionDate: '2022/01/7',
      list: 'リスト名',
      manager: '大友玲菜7',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/7'
    },
    {
      id: '8',
      companyName: 'エキサイト株式会社8',
      actionDate: '2022/01/8',
      list: 'リスト名',
      manager: '大友玲菜8',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/8'
    },
    {
      id: '9',
      companyName: 'エキサイト株式会社9',
      actionDate: '2022/01/9',
      list: 'リスト名',
      manager: '大友玲菜9',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/9'
    },
    {
      id: '10',
      companyName: 'エキサイト株式会社10',
      actionDate: '2022/01/10',
      list: 'リスト名',
      manager: '大友玲菜10',
      actionResult: '担当者接触',
      minorItem: 'お断り',
      comment: 'テストメモです',
      user: '大友玲菜',
      task: 'recall',
      taskDeadline: '2022/01/10'
    }
  ];

  return (
    <Card>
      <ActionListsTable actionLists={actionLists} />
    </Card>
  );
}

export default ActionLists;
