import { ChangeEvent, FC, useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import PropTypes from "prop-types";
import { ActionHistoryList } from "src/models/action_history_list";
import { useNavigate } from "react-router-dom";

interface StaffListsProps {
  className?: string;
  staffDetails2ActionHistoryLists: ActionHistoryList[];
}

const applyFilters = (staffList: ActionHistoryList[]): ActionHistoryList[] => {
  return staffList.filter((staffList) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  companyLists: ActionHistoryList[],
  page: number,
  limit: number
): ActionHistoryList[] => {
  return companyLists.slice(page * limit, page * limit + limit);
};

const StaffLists: FC<StaffListsProps> = ({
  staffDetails2ActionHistoryLists,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredStaffLists = applyFilters(staffDetails2ActionHistoryLists);
  const paginatedStaffLists = applyPagination(filteredStaffLists, page, limit);

  const navigate = useNavigate();
  return (
    <>
      <Stack
        sx={{
          mt: 5,
        }}
        direction="row"
      >
        <Typography
          sx={{
            color: "gray",
            fontSize: 24,
          }}
        >
          行動履歴
        </Typography>
        <Typography
          sx={{
            ml: 10,
            mt: 1,
            color: "black",
            fontSize: 16,
          }}
        >
          他のリストでの行動結果を確認するには
        </Typography>
        <Typography
          sx={{
            mt: 1,
            color: "blue",
            fontSize: 16,
            textDecoration: "underline",
          }}
          onClick={() => navigate("/action/actionLog")}
        >
          こちら
        </Typography>
      </Stack>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">企業名</TableCell>
                <TableCell align="center">行動日</TableCell>
                <TableCell align="center">担当者</TableCell>
                <TableCell align="center">行動結果</TableCell>
                <TableCell align="center">小項目</TableCell>
                <TableCell align="center">コメント</TableCell>
                <TableCell align="center">ユーザー</TableCell>
                <TableCell align="center">タスク</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStaffLists.map((staffList) => {
                return (
                  <TableRow hover key={staffList.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {staffList.corporationName}
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
                        {staffList.actionDate}
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
                        {staffList.staffName}
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
                        {staffList.actionResult}
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
                        {staffList.smallItem}
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
                        {staffList.comment}
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
                        {staffList.user}
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
                        {staffList.task}
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
            count={filteredStaffLists.length}
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

StaffLists.propTypes = {
  staffDetails2ActionHistoryLists: PropTypes.array.isRequired,
};

StaffLists.defaultProps = {
  staffDetails2ActionHistoryLists: [],
};

export default StaffLists;
