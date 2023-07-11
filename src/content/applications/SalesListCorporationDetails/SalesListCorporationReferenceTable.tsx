import {
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

import dayjs from "dayjs";
import Label from "src/components/Label";
import { SalesListStatus } from "src/models/sales_list";

const getStatusLabel = (salesListStatus: SalesListStatus): JSX.Element => {
  const map = {
    "01": {
      text: "企業リスト",
      color: "primary",
    },
    "02": {
      text: "担当者リスト",
      color: "info",
    },
  };

  const { text, color }: any = map[salesListStatus];

  return <Label color={color}>{text}</Label>;
};

const SalesLists = ({ salesList }) => {
  return (
    <Card>
      <CardHeader title="リスト一覧" />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">リスト名</TableCell>
              <TableCell align="center">作成日</TableCell>
              <TableCell align="center">件数</TableCell>
              <TableCell align="center">消化数</TableCell>
              <TableCell align="center">商談化</TableCell>
              <TableCell align="center">案件化</TableCell>
              <TableCell align="center">受注率</TableCell>
              <TableCell align="center">ヨミ</TableCell>
              <TableCell align="center">ユーザー</TableCell>
              <TableCell align="center">リスト種類</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={salesList.sales_list_number}>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.sales_list_name}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {dayjs(salesList.created).format("YYYY-MM-DD")}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.listsNum}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.proceedNum}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.meetNum}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.negoNum}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.contractNum}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.yomi}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {salesList.memberEntity.member_name}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {getStatusLabel(salesList.sales_list_type)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

SalesLists.propTypes = {
  salesList: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  salesList: [],
};

export default SalesLists;
