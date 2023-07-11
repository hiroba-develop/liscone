import {
  Box,
  Card,
  Stack,
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
import { ActionList } from "src/models/action_list";

interface ActionListProps {
  className?: string;
  actionLists: ActionList[];
}

const applyFilters = (actionList: ActionList[]): ActionList[] => {
  return actionList.filter((actionList) => {
    let matches = true;

    return matches;
  });
};

const applyPagination = (
  actionLists: ActionList[],
  page: number,
  limit: number
): ActionList[] => {
  return actionLists.slice(page * limit, page * limit + limit);
};

const ActionLists: FC<ActionListProps> = ({ actionLists }) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredActionLists = applyFilters(actionLists);
  const paginatedActionLists = applyPagination(
    filteredActionLists,
    page,
    limit
  );

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
              {paginatedActionLists.map((actionList) => {
                return (
                  <TableRow hover key={actionList.task_number}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {actionList.corporationEntity.corporation_name}
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
                        {actionList.execute_date}
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
                        {actionList.corporationstaffEntity !== null
                          ? actionList.corporationstaffEntity.staff_name
                          : ""}
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
                        {actionList.execute_result}
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
                        {actionList.execute_result}
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
                        {actionList.comment}
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
                        {actionList.memberEntity.member_name}
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
                        {actionList.task_name}
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
            count={filteredActionLists.length}
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

ActionLists.propTypes = {
  actionLists: PropTypes.array.isRequired,
};

ActionLists.defaultProps = {
  actionLists: [],
};

export default ActionLists;
