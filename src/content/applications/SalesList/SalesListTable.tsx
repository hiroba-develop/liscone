import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Checkbox,
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

import Label from "src/components/Label";
import { SalesList, SalesListStatus } from "src/models/sales_list";

interface SalesListsProps {
  className?: string;
  salesList: SalesList[];
}

interface Filters {
  status?: SalesListStatus;
}

const getStatusLabel = (salesListStatus: SalesListStatus): JSX.Element => {
  const map = {
    contactlist: {
      text: "contactlist",
      color: "error",
    },
    companylist: {
      text: "companylist",
      color: "warn",
    },
  };

  const { text, color }: any = map[salesListStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  salesList: SalesList[],
  filters: Filters
): SalesList[] => {
  return salesList.filter((salesList) => {
    let matches = true;

    if (filters.status && salesList.listType !== filters.status) {
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

const SalesLists: FC<SalesListsProps> = ({ salesList: salesLists }) => {
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
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selectedSomeSalesLists}
                />
              </TableCell>
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
                salesList.id
              );
              return (
                <TableRow hover key={salesList.id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" value={isSalesListSelected} />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() => navigate("/salesTask/salesListDetails")}
                      sx={{ textDecoration: "underline" }}
                    >
                      {salesList.listName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.createdDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.counter}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.digestionNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.negotiation}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.project}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.orderDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
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
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {salesList.user}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(salesList.listType)}
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
  salesList: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  salesList: [],
};

export default SalesLists;