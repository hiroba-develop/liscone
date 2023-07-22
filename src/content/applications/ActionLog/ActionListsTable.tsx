import {
  Box,
  Card,
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
  searchCorporationName: string;
  searchSalesListName: string;
  searchStaffName: string;
  searchMemberName: string;
  searchExecuteBigResult: string;
  searchExecuteSmallResult: string;
  searchFromDate: string;
  searchToDate: string;
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

const ActionLists: FC<ActionListsProps> = ({
  actionLists,
  searchCorporationName,
  searchSalesListName,
  searchStaffName,
  searchMemberName,
  searchExecuteBigResult,
  searchExecuteSmallResult,
  searchFromDate,
  searchToDate,
}) => {
  const blank = "";
  // 担当者絞り込み
  function matchStaffName(entity, searchvalue) {
    const result =
      entity !== null
        ? entity.staff_name.match(searchvalue)
        : searchvalue !== ""
        ? ""
        : blank.match("");
    return result;
  }
  // 行動種類絞り込み
  function matchExecuteBigResult(entity, searchvalue) {
    const result =
      entity !== null && entity !== ""
        ? CODE.BIG_RESULT.find((e) => e.key === entity).code.match(searchvalue)
        : searchvalue !== "" && searchvalue !== undefined
        ? ""
        : blank.match("");
    return result;
  }
  // 小項目絞り込み
  function matchExecuteSmallResult(entity, searchvalue) {
    const result =
      entity !== null && entity !== ""
        ? CODE.SMALL_RESULT.find((e) => e.key === entity).code.match(
            searchvalue
          )
        : searchvalue !== "" && searchvalue !== undefined
        ? ""
        : blank.match("");
    return result;
  }
  // 日付フォーマット
  function formatDateToISO(dateString) {
    if (!dateString) {
      return null;
    }
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return null;
    }
    const isoDate = dateObj.toISOString().split("T")[0];
    return isoDate;
  }
  // 行動日絞り込み
  function filterDateInRange(date, startDate, endDate) {
    const currentDate = new Date(date);
    var formatStartDate = null;
    var formatEndDate = null;
    if (startDate !== null) {
      formatStartDate = new Date(startDate);
      formatStartDate.setDate(formatStartDate.getDate() + 1);
    }
    if (endDate !== null) {
      formatEndDate = new Date(endDate);
      formatEndDate.setDate(formatEndDate.getDate() + 1);
    }
    if (
      (formatStartDate && currentDate < formatStartDate) ||
      (formatEndDate && currentDate > formatEndDate)
    ) {
      return null;
    } else {
      return blank.match("");
    }
  }
  // 絞り込み
  let searchactionLists = actionLists.filter(
    (actionList) =>
      actionList.corporationEntity.corporation_name.match(
        searchCorporationName
      ) &&
      actionList.saleslistEntity.sales_list_name.match(searchSalesListName) &&
      actionList.memberEntity.member_name.match(searchMemberName) &&
      matchStaffName(actionList.corporationstaffEntity, searchStaffName) &&
      matchExecuteBigResult(
        actionList.execute_big_result,
        searchExecuteBigResult
      ) &&
      matchExecuteSmallResult(
        actionList.execute_small_result,
        searchExecuteSmallResult
      ) &&
      filterDateInRange(
        actionList.execute_date,
        formatDateToISO(searchFromDate),
        formatDateToISO(searchToDate)
      )
  );

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredActionLists = applyFilters(searchactionLists);
  const paginatedActionLists = applyPagination(
    filteredActionLists,
    page,
    limit
  );

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">企業名</TableCell>
              <TableCell align="left">行動日</TableCell>
              <TableCell align="left">リスト</TableCell>
              <TableCell align="left">担当者</TableCell>
              <TableCell align="left">行動種類</TableCell>
              <TableCell align="left">小項目</TableCell>
              <TableCell align="left">コメント</TableCell>
              <TableCell align="left">ユーザー</TableCell>
              <TableCell align="left">タスク</TableCell>
              <TableCell align="left">タスク期限</TableCell>
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
                      {actionList.memberEntity !== null
                        ? actionList.memberEntity.member_name
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
          rowsPerPageOptions={[5, 10, 20, 30]}
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
