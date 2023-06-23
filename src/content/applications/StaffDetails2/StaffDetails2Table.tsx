import { FC } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  StaffDetailsList,
  StaffListStatus,
} from "src/models/staff_details_list";
import Label from "src/components/Label";

interface SalesListsProps {
  className?: string;
  staffDetails2List: StaffDetailsList[];
}

const getStatusLabel = (staffListStatus: StaffListStatus): JSX.Element => {
  const map = {
    listed: {
      text: "上場",
      color: "error",
    },
    unlisted: {
      text: "未上場",
      color: "black",
    },
  };
  const { text, color }: any = map[staffListStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  staffDetails2List: StaffDetailsList[]
): StaffDetailsList[] => {
  return staffDetails2List.filter((staffDetails2List) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  salesLists: StaffDetailsList[],
  page: number,
  limit: number
): StaffDetailsList[] => {
  return salesLists.slice(page * limit, page * limit + limit);
};

const SalesLists: FC<SalesListsProps> = ({
  staffDetails2List: salesDetailsLists,
}) => {
  const page: number = 0;
  const limit: number = 5;

  const filteredSalesList = applyFilters(salesDetailsLists);
  const paginatedSalesLists = applyPagination(filteredSalesList, page, limit);

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Typography
          sx={{
            color: "gray",
            fontSize: 24,
          }}
        >
          会社
        </Typography>
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
                  <TableCell align="center">スコア</TableCell>
                  <TableCell align="center">
                    プライマリーメールアドレス
                  </TableCell>
                  <TableCell align="center">取引ステージ</TableCell>
                  <TableCell align="center">商材</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedSalesLists.map((StaffDetailsList) => {
                  return (
                    <TableRow hover key={StaffDetailsList.id}>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.companyNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.companyName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.industry}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.postNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.headOfficeAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.representativeNumber}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.representativeName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.website}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.earnings}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.numberOfEmployees}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.established}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {StaffDetailsList.capital}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          color="text.primary"
                          gutterBottom
                          noWrap
                        >
                          {getStatusLabel(StaffDetailsList.listing)}
                        </Typography>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </>
  );
};

SalesLists.propTypes = {
  staffDetails2List: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  staffDetails2List: [],
};

export default SalesLists;
