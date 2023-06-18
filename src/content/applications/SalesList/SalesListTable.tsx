import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import BulkActions from "./BulkActions";

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
  const [selectedSalesLists, setSelectedListLists] = useState<string[]>([]);
  const selectedBulkActions = selectedSalesLists.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "contactlist",
      name: "contactlist",
    },
    {
      id: "companylist",
      name: "companylist",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllListLists = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedListLists(
      event.target.checked ? salesLists.map((salesList) => salesList.id) : []
    );
  };

  const handleSelectOneListList = (
    event: ChangeEvent<HTMLInputElement>,
    salesListId: string
  ): void => {
    if (!selectedSalesLists.includes(salesListId)) {
      setSelectedListLists((prevSelected) => [...prevSelected, salesListId]);
    } else {
      setSelectedListLists((prevSelected) =>
        prevSelected.filter((id) => id !== salesListId)
      );
    }
  };

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
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>リスト種類</InputLabel>
                <Select
                  value={filters.status || "all"}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="リスト一覧"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  //checked={selectedAllCompanyLists}
                  indeterminate={selectedSomeSalesLists}
                  //onChange={handleSelectAllCompanyLists}
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
                <TableRow
                  hover
                  key={salesList.id}
                  //selected={isListListSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      //checked={isListListSelected}
                      // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      //   handleSelectOneListtList(event, listList.id)
                      // }
                      value={isSalesListSelected}
                    />
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
                  {/* 
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                   */}
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
