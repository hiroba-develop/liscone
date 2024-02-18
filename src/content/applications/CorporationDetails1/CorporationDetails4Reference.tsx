import Label from "src/components/Label";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { RecruitList } from "src/models/recruit_list";
function CorporationDetails4Reference(corporationList) {
  const [recruitLists, setRecruits] = useState<RecruitList[]>([]);

  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/recruit/corporationId`,
          {
            params: {
              corporationId: corporationList.corporate_number,
            },
          }
        );

        if (response.statusText === "OK") {
          setRecruits(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getStaffs();
  }, []);
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell align="left">募集要項(大項目)</TableCell>
              <TableCell align="left">募集要項(中項目)</TableCell>
              <TableCell align="left">募集要項(小項目)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruitLists.map((recruitList) => {
              return (
                <TableRow hover key={recruitList.corporation_id}>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {recruitList.recruit_large_category}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {recruitList.recruit_middle_category}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {recruitList.recruit_small_category}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default CorporationDetails4Reference;
