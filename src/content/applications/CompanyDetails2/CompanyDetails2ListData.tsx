import { Card } from "@mui/material";
import { CompanyDetailsList } from "src/models/company_details_list";
import CompanyDetails1Table from "./CompanyDetails2Table";

function ListLists() {
  const listLists: CompanyDetailsList[] = [
    {
      id: "1",
      corporateNumber: "エキサイト株式会社",
      jobPostion: "マーケティング",
      staffName: "大友玲菜",
      profileSourceType: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
    },
    {
      id: "2",
      corporateNumber: "エキサイト株式会社",
      jobPostion: "営業",
      staffName: "山田太郎",
      profileSourceType: "Wantedly",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
    },
  ];

  return <CompanyDetails1Table companyDetails1List={listLists} />;
}

export default ListLists;
