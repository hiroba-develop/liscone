import { Card } from '@mui/material';
import { ContactList } from 'src/models/contact_list';
import ContactListsTable from './ContactListsTable';


function ContactLists() {
  const contactLists: ContactList[] = [
    {
      id: '1',
      companyName: 'AAAA01', 
      role: 'marketing',
      familyName: '大友玲菜',
      accountSource: 'Linkedin',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '2',
      companyName: 'AAAA02', 
      role: 'sales',
      familyName: '山田太郎',
      accountSource: 'Wantedly',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '3',
      companyName: 'AAAA03', 
      role: 'marketing',
      familyName: '大友玲菜',
      accountSource: 'Linkedin',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '4',
      companyName: 'AAAA04', 
      role: 'sales',
      familyName: '山田太郎',
      accountSource: 'Wantedly',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '5',
      companyName: 'AAAA05', 
      role: 'marketing',
      familyName: '大友玲菜',
      accountSource: 'Linkedin',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '6',
      companyName: 'AAAA06', 
      role: 'sales',
      familyName: '山田太郎',
      accountSource: 'Wantedly',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '7',
      companyName: 'AAAA07', 
      role: 'marketing',
      familyName: '大友玲菜',
      accountSource: 'Linkedin',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '8',
      companyName: 'AAAA08', 
      role: 'sales',
      familyName: '山田太郎',
      accountSource: 'Wantedly',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '9',
      companyName: 'AAAA09', 
      role: 'marketing',
      familyName: '大友玲菜',
      accountSource: 'Linkedin',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    },
    {
      id: '10',
      companyName: 'AAAA10', 
      role: 'marketing',
      familyName: '大友玲菜',
      accountSource: 'Linkedin',
      profileLink: 'https://www.linkedin.com/in/shuji-kinoshita-23b4835/',
    }
  ];

  return (
    <Card>
      <ContactListsTable contactLists={contactLists} />
    </Card>
  );
}

export default ContactLists;
