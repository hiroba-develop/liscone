import { Card } from "@mui/material";
import { StaffList } from "src/models/staff_list";
import StaffDetails1ReferenceTable from "./StaffDetails1ReferenceTable";

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
      otherInformation: "自己紹介文",
    },
  ];

  return (
    <Card>
      <StaffDetails1ReferenceTable staffLists={staffLists} />
    </Card>
  );
}

export default StaffLists;
