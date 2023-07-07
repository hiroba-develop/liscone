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
import { CompanyDetailsList } from "src/models/company_details_list";

interface SalesListsProps {
  className?: string;
  companyDetails1List: CompanyDetailsList[];
}

const applyFilters = (
  companyDetails1List: CompanyDetailsList[]
): CompanyDetailsList[] => {
  return companyDetails1List.filter((companyDetails1List) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  salesLists: CompanyDetailsList[],
  page: number,
  limit: number
): CompanyDetailsList[] => {
  return salesLists.slice(page * limit, page * limit + limit);
};

const SalesLists: FC<SalesListsProps> = ({
  companyDetails1List: salesDetailsLists,
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
              {paginatedSalesLists.map((CompanyDetailsList) => {
                return (
                  <TableRow hover key={CompanyDetailsList.corporation_id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CompanyDetailsList.corporation_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CompanyDetailsList.job_position}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CompanyDetailsList.staff_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CompanyDetailsList.profile_source_type}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {CompanyDetailsList.profile_link}
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
  companyDetails1List: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  companyDetails1List: [],
};

export default SalesLists;
