import { Card } from "@mui/material";
import { StaffList } from "src/models/staff_list";
import StaffListsTable from "./StaffListsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";

function StaffLists() {
  const [staffLists, setStaffs] = useState<StaffList[]>([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(`${config().apiUrl}/companystaffs`);

        if (response.statusText === "OK") {
          setStaffs(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getStaffs();
  }, []);

  return (
    <Card>
      <StaffListsTable staffLists={staffLists} />
    </Card>
  );
}

export default StaffLists;
