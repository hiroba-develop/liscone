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
import { CorporationDetailsList } from "src/models/corporation_details_list";

interface SalesListsProps {
  className?: string;
  importDetailsList: CorporationDetailsList[];
}

const applyFilters = (
  corporationDetails1List: CorporationDetailsList[]
): CorporationDetailsList[] => {
  return corporationDetails1List.filter((corporationDetails1List) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  salesLists: CorporationDetailsList[],
  page: number,
  limit: number
): CorporationDetailsList[] => {
  return salesLists.slice(page * limit, page * limit + limit);
};

const SalesLists: FC<SalesListsProps> = ({
  importDetailsList: salesDetailsLists,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredSalesList = applyFilters(salesDetailsLists);
  const paginatedSalesLists = applyPagination(filteredSalesList, page, limit);

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "background.paper" }}>
              <TableCell align="left">会社名・法人名</TableCell>
              <TableCell align="left">役職</TableCell>
              <TableCell align="left">氏名</TableCell>
              <TableCell align="left">アカウントソース</TableCell>
              <TableCell align="left">プロフィールリンク</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSalesLists.map((CorporationDetailsList) => {
              return (
                <TableRow hover key={CorporationDetailsList.corporation_id}>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {
                        CorporationDetailsList.corporationEntity
                          .corporation_name
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {CorporationDetailsList.job_position}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {CorporationDetailsList.staff_name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {CorporationDetailsList.profile_source_type}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {CorporationDetailsList.profile_link}
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
          rowsPerPageOptions={[5, 10, 20, 30]}
        />
      </Box>
    </Card>
  );
};

SalesLists.propTypes = {
  importDetailsList: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  importDetailsList: [],
};

export default SalesLists;
