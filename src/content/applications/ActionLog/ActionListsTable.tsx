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
import { ChangeEvent, FC, useState } from "react";

import { ActionList } from "src/models/action_list";
import { CODE } from "src/utility/constants/Code";

interface ActionListsProps {
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

const ActionLists: FC<ActionListsProps> = ({ actionLists }) => {
  const [selectedActionLists] = useState<string[]>([]);
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
  const selectedSomeActionLists =
    selectedActionLists.length > 0 &&
    selectedActionLists.length < actionLists.length;

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
                  indeterminate={selectedSomeActionLists}
                />
              </TableCell>
              <TableCell align="center">企業名</TableCell>
              <TableCell align="center">行動日</TableCell>
              <TableCell align="center">リスト</TableCell>
              <TableCell align="center">担当者</TableCell>
              <TableCell align="center">行動結果</TableCell>
              <TableCell align="center">小項目</TableCell>
              <TableCell align="center">コメント</TableCell>
              <TableCell align="center">ユーザー</TableCell>
              <TableCell align="center">タスク</TableCell>
              <TableCell align="center">タスク期限</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedActionLists.map((actionList) => {
              const isActionListSelected = selectedActionLists.includes(
                actionList.task_number
              );
              return (
                <TableRow hover key={actionList.task_number}>
                  <TableCell>
                    <Checkbox color="primary" value={isActionListSelected} />
                  </TableCell>
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
                      {actionList.saleslistEntity.sales_list_name}
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
                      {actionList.execute_big_result !== null &&
                      actionList.execute_big_result !== ""
                        ? CODE.BIG_RESULT.find(
                            (e) => e.key === actionList.execute_big_result
                          ).code
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
                      {actionList.execute_small_result !== null &&
                      actionList.execute_small_result !== ""
                        ? CODE.SMALL_RESULT.find(
                            (e) => e.key === actionList.execute_small_result
                          ).code
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
                      <Box>
                        {actionList.execute_date !== null ? (
                          <img
                            style={{ verticalAlign: "bottom" }}
                            src="/static/images/Comp.svg"
                            alt="comp"
                          />
                        ) : (
                          <img
                            style={{ verticalAlign: "bottom" }}
                            src="/static/images/UnComp.svg"
                            alt="uncomp"
                          />
                        )}
                        　
                        {actionList.task_name !== null &&
                        actionList.task_name !== ""
                          ? CODE.ACTION.find(
                              (e) => e.key === actionList.task_name
                            ).code
                          : ""}
                      </Box>
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
                      {actionList.deadline}
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
  );
};

ActionLists.propTypes = {
  actionLists: PropTypes.array.isRequired,
};

ActionLists.defaultProps = {
  actionLists: [],
};

export default ActionLists;
