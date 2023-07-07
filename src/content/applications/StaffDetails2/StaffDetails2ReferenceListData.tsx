import { Card } from "@mui/material";
import { StaffList } from "src/models/staff_list";
import StaffDetails1ReferenceTable from "./StaffDetails2ReferenceTable";

function StaffLists() {
  const staffLists: StaffList[] = [
    // {
    //   staff_id: "1",
    //   corporation_name: "AAAA01",
    //   job_position: "general",
    //   role: "marketing",
    //   staff_name: "大友玲菜",
    //   profile_source_type: "Linkedin",
    //   profile_link: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
    //   other_information: "自己紹介文",
    // },
  ];

  return <StaffDetails1ReferenceTable staffLists={staffLists} />;
}

export default StaffLists;
