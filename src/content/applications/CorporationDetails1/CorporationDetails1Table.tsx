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

  const handleWebpage = (event, params) => {
    window.open(params, "_blank");
  };



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
              <TableCell align="left">その他</TableCell>
              <TableCell align="left">在籍状況</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSalesLists.map((CorporationDetailsList) => {
                let employee_status;
                if (CorporationDetailsList.employee_status === 0) {
                  employee_status="現職";
                } else if (CorporationDetailsList.employee_status === 1) {
                  employee_status="休職中";
                } else if (CorporationDetailsList.employee_status === 2) {
                  employee_status="離職済み";
                } else {
                  employee_status="不明なステータス";
                }
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
                      sx={{ textDecoration: "underline" }}
                      onClick={(event) => {
                        handleWebpage(
                          event,
                          CorporationDetailsList.profile_link
                        );
                      }}
                    >
                      {CorporationDetailsList.profile_link}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {CorporationDetailsList.other_information}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {employee_status}
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
  corporationDetails1List: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  corporationDetails1List: [],
};

export default SalesLists;
