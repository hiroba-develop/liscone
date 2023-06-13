import { Card } from '@mui/material';
import { ListList } from 'src/models/list_list';
import ListListsTable from './ListListsTable';

function ListLists() {
  const listLists: ListList[] = [
    {
      id: '1',
      listName: '2023011_リスト名',
      createdDate: '2022/01/1',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '100,000円',
      user: '山田太郎,田中花子',
      listType: 'contactlist'
    },
    {
      id: '2',
      listName: '2023011_リスト名',
      createdDate: '2022/01/2',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '120,000円',
      user: '山田太郎,田中花子',
      listType: 'companylist'
    },
    {
      id: '3',
      listName: '2023011_リスト名',
      createdDate: '2022/01/3',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '130,000円',
      user: '山田太郎,田中花子',
      listType: 'contactlist'
    },
    {
      id: '4',
      listName: '2023011_リスト名',
      createdDate: '2022/01/4',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '140,000円',
      user: '山田太郎,田中花子',
      listType: 'companylist'
    },
    {
      id: '5',
      listName: '2023011_リスト名',
      createdDate: '2022/01/5',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '150,000円',
      user: '山田太郎,田中花子',
      listType: 'contactlist'
    },
    {
      id: '6',
      listName: '2023011_リスト名',
      createdDate: '2022/01/6',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '150,000円',
      user: '山田太郎,田中花子',
      listType: 'companylist'
    },
    {
      id: '7',
      listName: '2023011_リスト名',
      createdDate: '2022/01/7',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '170,000円',
      user: '山田太郎,田中花子',
      listType: 'companylist'
    },
    {
      id: '8',
      listName: '2023011_リスト名',
      createdDate: '2022/01/8',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '180,000円',
      user: '山田太郎,田中花子',
      listType: 'contactlist'
    },
    {
      id: '9',
      listName: '2023011_リスト名',
      createdDate: '2022/01/9',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '190,000円',
      user: '山田太郎,田中花子',
      listType: 'companylist'
    },
    {
      id: '10',
      listName: '2023011_リスト名',
      createdDate: '2022/01/10',
      counter: 100,
      digestionNumber: 100,
      negotiation: '10%',
      project: '10%',
      orderDate: '10%',
      yomi: '100,000円',
      user: '山田太郎,田中花子',
      listType: 'contactlist'
    }
  ];

  return (
    <Card>
      <ListListsTable listLists={listLists} />
    </Card>
  );
}

export default ListLists;