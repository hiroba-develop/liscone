import {
  Box,
  Card,
  Divider,
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
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import Label from "src/components/Label";
import { SalesList, SalesListStatus } from "src/models/sales_list";

interface SalesListsProps {
  className?: string;
  salesLists: SalesList[];
}

interface Filters {
  status?: SalesListStatus;
}

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

const applyFilters = (
  salesLists: SalesList[],
  filters: Filters
): SalesList[] => {
  return salesLists.filter((salesLists) => {
    let matches = true;

    if (filters.status && salesLists.sales_list_type !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  salesLists: SalesList[],
  page: number,
  limit: number
): SalesList[] => {
  return salesLists.slice(page * limit, page * limit + limit);
};

const SalesLists: FC<SalesListsProps> = ({ salesLists }) => {
  const selectedSalesLists: string[] = [];
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredSalesList = applyFilters(salesLists, filters);
  const paginatedSalesLists = applyPagination(filteredSalesList, page, limit);
  const selectedSomeSalesLists =
    selectedSalesLists.length > 0 &&
    selectedSalesLists.length < salesLists.length;
  const navigate = useNavigate();

  return (
    <Card>
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
            {paginatedSalesLists.map((salesList) => {
              const isSalesListSelected = selectedSalesLists.includes(
                salesList.sales_list_number
              );
              return (
                <TableRow hover key={salesList.sales_list_number}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() => {
                        if (salesList.sales_list_type === "01") {
                          navigate("/salesTask/salesListCorporationDetails", {
                            state: salesList,
                          });
                        } else {
                          navigate("/salesTask/salesListStaffDetails", {
                            state: salesList,
                          });
                        }
                      }}
                      sx={{ textDecoration: "underline" }}
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
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredSalesList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

SalesLists.propTypes = {
  salesLists: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  salesLists: [],
};

export default SalesLists;
