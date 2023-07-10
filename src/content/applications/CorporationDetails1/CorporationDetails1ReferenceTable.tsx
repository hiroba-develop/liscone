import { Label } from "@mui/icons-material";
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
import { CorporationListStatus } from "src/models/corporation_list";

const SalesLists = ({ corporationList }) => {
  const getStatusLabel = (
    corporationListStatus: CorporationListStatus
  ): JSX.Element => {
    const map = {
      Y: {
        text: "上場",
        color: "black",
      },
      N: {
        text: "未上場",
        color: "warn",
      },
      "": {
        text: "未確認",
        color: "error",
      },
    };

    const { text, color }: any = map[corporationListStatus];

    return <Label color={color}>{text}</Label>;
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell align="center">法人番号</TableCell>
              <TableCell align="center">業種</TableCell>
              <TableCell align="center">郵便番号</TableCell>
              <TableCell align="center">本社住所</TableCell>
              <TableCell align="center">代表者名</TableCell>
              <TableCell align="center">売上</TableCell>
              <TableCell align="center">従業員数</TableCell>
              <TableCell align="center">設立</TableCell>
              <TableCell align="center">資本金</TableCell>
              <TableCell align="center">上場</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={corporationList.corporation_id}>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.corporate_number}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.business_category}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.zip_code}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.address}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.representative_name}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.sales_amount}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.employee_number}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.establishment_year}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {corporationList.capital_stock}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {getStatusLabel(corporationList.listing_status)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SalesLists;
