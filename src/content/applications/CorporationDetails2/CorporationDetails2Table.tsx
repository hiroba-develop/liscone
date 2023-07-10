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
  corporationDetails1List: CorporationDetailsList[];
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
  corporationDetails1List: salesDetailsLists,
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
    <>
      <Typography
        sx={{
          margin: "30px",
          color: "gray",
          fontSize: 24,
          mt: 5,
        }}
      >
        担当者候補
      </Typography>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell align="center">会社名・法人名</TableCell>
                <TableCell align="center">役職</TableCell>
                <TableCell align="center">氏名</TableCell>
                <TableCell align="center">アカウントソース</TableCell>
                <TableCell align="center">プロフィールリンク</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSalesLists.map((CorporationDetailsList) => {
                return (
                  <TableRow hover key={CorporationDetailsList.corporation_id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CorporationDetailsList.corporation_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CorporationDetailsList.job_position}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CorporationDetailsList.staff_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CorporationDetailsList.profile_source_type}
                      </Typography>
                    </TableCell>
                    <TableCell>
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
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  );
};

SalesLists.propTypes = {
  corporationDetails1List: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  corporationDetails1List: [],
};

export default SalesLists;
