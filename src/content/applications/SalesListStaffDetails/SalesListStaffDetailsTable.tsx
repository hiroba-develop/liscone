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
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalesList } from "src/models/sales_list";
import { StaffDetails2List } from "src/models/staff_details2_list";

interface StaffDetails2ListProps {
  className?: string;
  staffList: StaffDetails2List[];
  selectedSalesList: SalesList;
}

const applyFilters = (staffLists: StaffDetails2List[]): StaffDetails2List[] => {
  return staffLists.filter((staffList) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  staffLists: StaffDetails2List[],
  page: number,
  limit: number
): StaffDetails2List[] => {
  return staffLists.slice(page * limit, page * limit + limit);
};
const StaffLists: FC<StaffDetails2ListProps> = ({
  staffList: staffLists,
  selectedSalesList: salesList,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredSalesList = applyFilters(staffLists);
  const paginatedSalesLists = applyPagination(staffLists, page, limit);

  const navigate = useNavigate();

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">会社名・法人名</TableCell>
              <TableCell align="center">役職</TableCell>
              <TableCell align="center">氏名</TableCell>
              <TableCell align="center">アカウントソース</TableCell>
              <TableCell align="center">プロフィールリンク</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSalesLists.map((staffList) => {
              return (
                <TableRow hover key={staffList.staff_id}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() =>
                        navigate("/salesTask/staffDetails2", {
                          state: [staffList, salesList],
                        })
                      }
                      sx={{ textDecoration: "underline" }}
                    >
                      {staffList.corporation.corporation_name}
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
                      {staffList.staff.job_position}
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
                      {staffList.staff.staff_name}
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
                      {staffList.staff.profile_source_type}
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
                      {staffList.staff.profile_link}
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

StaffLists.propTypes = {
  staffList: PropTypes.array.isRequired,
};

StaffLists.defaultProps = {
  staffList: [],
};

export default StaffLists;
