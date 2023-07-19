import {
  Box,
  Button,
  Card,
  CardHeader,
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

import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { StaffList, StaffListRoles } from "src/models/staff_list";
import ListCreate from "../PopUp/ListCreate";

interface StaffListsProps {
  className?: string;
  staffLists: StaffList[];
  searchCorporationName: string;
  searchJobPosition: string;
  searchProfileSourceType: string;
  searchStaffName: string;
}

interface Filters {
  status?: StaffListRoles;
}

// const getStatusLabel = (staffListRoles: StaffListRoles): JSX.Element => {
//   const map = {
//     marketing: {
//       text: "マーケティング",
//       color: "error",
//     },
//     sales: {
//       text: "営業",
//       color: "warn",
//     },
//   };

//   const { text, color }: any = map[staffListRoles];

//   return <Label color={color}>{text}</Label>;
// };

const applyFilters = (
  staffList: StaffList[],
  filters: Filters
): StaffList[] => {
  return staffList.filter((staffList) => {
    let matches = true;

    if (filters.status && staffList.role !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  staffLists: StaffList[],
  page: number,
  limit: number
): StaffList[] => {
  return staffLists.slice(page * limit, page * limit + limit);
};

const StaffLists: FC<StaffListsProps> = ({
  staffLists,
  searchCorporationName,
  searchJobPosition,
  searchProfileSourceType,
  searchStaffName,
}) => {
  let searchStaffLists = staffLists.filter(
    (staffList) =>
      staffList.corporationEntity.corporation_name.match(
        searchCorporationName
      ) &&
      staffList.job_position.match(searchJobPosition) &&
      staffList.profile_source_type.match(searchProfileSourceType) &&
      staffList.staff_name.match(searchStaffName)
  );

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters] = useState<Filters>({
    status: null,
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredStaffLists = applyFilters(searchStaffLists, filters);
  const paginatedStaffLists = applyPagination(filteredStaffLists, page, limit);

  const [checkItems, setCheckItems] = useState([]);
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  const editListCreateOpen = (checkItems) => {
    setsalesListType("02");
    setListCreateOpen(true);
  };

  const navigate = useNavigate();

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, row) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, row]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el.staff_id !== row.staff_id));
    }
  };
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const stfArray = [];
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      searchStaffLists.forEach((el) => {
        stfArray.push(el);
      });
      setCheckItems(stfArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const isChecked = checkItems.length > 0;
  const disabled = !isChecked;

  return (
    <Card>
      <CardHeader
        action={
          <Box>
            <Button
              disabled={disabled}
              sx={{ borderRadius: 0.5, backgroundColor: "#109DBC" }}
              fullWidth
              variant="contained"
              onClick={(checkItems) => editListCreateOpen(checkItems)}
            >
              <AddIcon />
              　担当者リストを作成
            </Button>
          </Box>
        }
      />
      <ListCreate
        listCreateOpen={listCreateOpen}
        checkItems={checkItems}
        setListCreateOpen={setListCreateOpen}
        salesListType={salesListType}
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkItems.length === staffLists.length ? true : false
                  }
                />
              </TableCell>
              <TableCell align="center">会社名・法人名</TableCell>
              <TableCell align="center">役職</TableCell>
              <TableCell align="center">氏名</TableCell>
              <TableCell align="center">アカウントソース</TableCell>
              <TableCell align="center">プロフィールリンク</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffLists.map((staffList) => {
              const isStaffListSelected = checkItems.includes(staffList);
              return (
                <TableRow hover key={staffList.staff_id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      name={`select-${staffList.staff_id}`}
                      onChange={(e) =>
                        handleSingleCheck(e.target.checked, staffList)
                      }
                      checked={isStaffListSelected}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() =>
                        navigate("/staff/staffDetails1", {
                          state: staffList,
                        })
                      }
                      sx={{ textDecoration: "underline" }}
                    >
                      {staffList.corporationEntity.corporation_name}
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
                      {staffList.job_position}
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
                      {staffList.staff_name}
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
                      {staffList.profile_source_type}
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
                      {staffList.profile_link}
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
  );
};

StaffLists.propTypes = {
  staffLists: PropTypes.array.isRequired,
};

StaffLists.defaultProps = {
  staffLists: [],
};

export default StaffLists;
