import { ChangeEvent, FC, useState } from "react";
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

import Label from "src/components/Label";
import { ActionList, ActionListStatus } from "src/models/action_list";

interface ActionListsProps {
  className?: string;
  actionLists: ActionList[];
}

interface Filters {
  status?: ActionListStatus;
}

const getStatusLabel = (actionListStatus: ActionListStatus): JSX.Element => {
  const map = {
    recall: {
      text: "recall",
      color: "error",
    },
  };

  const { text, color }: any = map[actionListStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  actionList: ActionList[],
  filters: Filters
): ActionList[] => {
  return actionList.filter((actionList) => {
    let matches = true;

    if (filters.status && actionList.task !== filters.status) {
      matches = false;
    }

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
  const [selectedActionLists, setSelectedActionLists] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null,
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredActionLists = applyFilters(actionLists, filters);
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
                actionList.id
              );
              return (
                <TableRow hover key={actionList.id}>
                  <TableCell padding="checkbox">
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
                      {actionList.companyName}
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
                      {actionList.actionDate}
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
                      {actionList.list}
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
                      {actionList.manager}
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
                      {actionList.actionResult}
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
                      {actionList.minorItem}
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
                      {actionList.user}
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
                      {getStatusLabel(actionList.task)}
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
                      {actionList.taskDeadline}
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
