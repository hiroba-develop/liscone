import { Card } from "@mui/material";
import { CompanyDetails1List } from "src/models/companydetails1_list";
import CompanyDetails1Table from "./CompanyDetails1Table";

function ListLists() {
  const listLists: CompanyDetails1List[] = [
    {
      id: "1",
      corporateNumber: "エキサイト株式会社",
      jobPostion: "マーケティング",
      staffName: "大友玲菜",
      profileSourceType: "Linkedin",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      score: "",
      otherInformation: "",
    },
    {
      id: "2",
      corporateNumber: "エキサイト株式会社",
      jobPostion: "営業",
      staffName: "山田太郎",
      profileSourceType: "Wantedly",
      profileLink: "https://www.linkedin.com/in/shuji-kinoshita-23b4835/",
      score: "10",
      otherInformation: "自己紹介文",
    },
  ];

  return (
    <Card sx={{ mt: 5 }}>
      <CompanyDetails1Table companyDetails1List={listLists} />
    </Card>
  );
}

export default ListLists;
