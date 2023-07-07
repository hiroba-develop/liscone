import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  StaffDetailsList,
  CompanyListStatus,
} from "src/models/staff_details_list";
import Label from "src/components/Label";

interface SalesListsProps {
  className?: string;
  staffDetails1List: StaffDetailsList[];
}

const getStatusLabel = (staffListStatus: CompanyListStatus): JSX.Element => {
  const map = {
    Y: {
      text: "上場",
      color: "error",
    },
    N: {
      text: "未上場",
      color: "black",
    },
  };
  const { text, color }: any = map[staffListStatus];

  return <Label color={color}>{text}</Label>;
};

const SalesLists = ({ staffDetails1List }) => {
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell align="center">法人番号</TableCell>
              <TableCell align="center">会社名・法人名</TableCell>
              <TableCell align="center">業種</TableCell>
              <TableCell align="center">郵便番号</TableCell>
              <TableCell align="center">本社住所</TableCell>
              <TableCell align="center">代表電話番号</TableCell>
              <TableCell align="center">代表者名</TableCell>
              <TableCell align="center">Webサイト</TableCell>
              <TableCell align="center">売上</TableCell>
              <TableCell align="center">従業員数</TableCell>
              <TableCell align="center">設立</TableCell>
              <TableCell align="center">資本金</TableCell>
              <TableCell align="center">上場</TableCell>
              {/* <TableCell align="center">スコア</TableCell>
              <TableCell align="center">プライマリーメールアドレス</TableCell>
              <TableCell align="center">取引ステージ</TableCell>
              <TableCell align="center">商材</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover key={staffDetails1List.corporation_id}>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.corporate_number}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.corporation_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.business_category}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.zip_code}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.address}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.representative_phone_number}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.representative_name}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.home_page}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.sales_amount}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.employee_number}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.establishment_year}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {staffDetails1List.capital_stock}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {getStatusLabel(staffDetails1List.listing_status)}
                </Typography>
              </TableCell>
              {/* <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {StaffDetailsList.score}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {StaffDetailsList.primaryMailAddress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {StaffDetailsList.dealingsStage}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {StaffDetailsList.productName}
                    </Typography>
                  </TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SalesLists;
