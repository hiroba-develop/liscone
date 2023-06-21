import { Card } from "@mui/material";
import { StaffList } from "src/models/staff_list";
import StaffListsTable from "./StaffListsTable";

function StaffLists() {
  const staffLists: StaffList[] = [
    {
      id: "1",
      companyName: "AAAA01",
      positions: "general",
      role: "marketing",
      familyName: "大友玲菜",
      accountSource: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "2",
      companyName: "AAAA02",
      positions: "general",
      role: "sales",
      familyName: "山田太郎",
      accountSource: "Wantedly",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "3",
      companyName: "AAAA03",
      positions: "general",
      role: "marketing",
      familyName: "大友玲菜",
      accountSource: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "4",
      companyName: "AAAA04",
      positions: "general",
      role: "sales",
      familyName: "山田太郎",
      accountSource: "Wantedly",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "5",
      companyName: "AAAA05",
      positions: "general",
      role: "marketing",
      familyName: "大友玲菜",
      accountSource: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "6",
      companyName: "AAAA06",
      positions: "general",
      role: "sales",
      familyName: "山田太郎",
      accountSource: "Wantedly",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "7",
      companyName: "AAAA07",
      positions: "general",
      role: "marketing",
      familyName: "大友玲菜",
      accountSource: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "8",
      companyName: "AAAA08",
      positions: "general",
      role: "sales",
      familyName: "山田太郎",
      accountSource: "Wantedly",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "9",
      companyName: "AAAA09",
      positions: "general",
      role: "marketing",
      familyName: "大友玲菜",
      accountSource: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
    {
      id: "10",
      companyName: "AAAA10",
      positions: "general",
      role: "marketing",
      familyName: "大友玲菜",
      accountSource: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      otherInformation: "",
    },
  ];

  return (
    <Card>
      <StaffListsTable staffLists={staffLists} />
    </Card>
  );
}

export default StaffLists;
