import {
  Box,
  Button,
  Card,
  CardContent,
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
import Label from "src/components/Label";
import {
  CorporationList,
  CorporationListStatus,
} from "src/models/corporation_list";
import ListCreate from "../PopUp/ListCreate";

interface CorporationListsProps {
  className?: string;
  corporationLists: CorporationList[];
}

interface Filters {
  status?: CorporationListStatus;
}

const getStatusLabel = (
  corporationListStatus: CorporationListStatus
): JSX.Element => {
  if (corporationListStatus === null || corporationListStatus === "") {
    return <Label />;
  }
  const map = {
    Y: {
      text: "上場",
      color: "black",
    },
    N: {
      text: "未上場",
      color: "error",
    },
  };

  const { text, color }: any = map[corporationListStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  corporationLists: CorporationList[],
  filters: Filters
): CorporationList[] => {
  return corporationLists.filter((corporationLists) => {
    let matches = true;

    if (filters.status && corporationLists.listing_status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  corporationLists: CorporationList[],
  page: number,
  limit: number
): CorporationList[] => {
  return corporationLists.slice(page * limit, page * limit + limit);
};

const CorporationLists: FC<CorporationListsProps> = ({ corporationLists }) => {
  const selectedCorporationLists: string[] = [];
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

  const filteredCorporationLists = applyFilters(corporationLists, filters);
  const paginatedCorporationLists = applyPagination(
    filteredCorporationLists,
    page,
    limit
  );
  const selectedSomeCorporationLists =
    selectedCorporationLists.length > 0 &&
    selectedCorporationLists.length < corporationLists.length;

  const [checkItems, setCheckItems] = useState([]);
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  // 체크된 아이템을 담을 배열
  const navigate = useNavigate();

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, row) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, row]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(
        checkItems.filter((el) => el.corporation_id !== row.corporation_id)
      );
    }
  };
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      corporationLists.forEach((el) => idArray.push(el));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const isChecked = checkItems.length > 0;
  const disabled = !isChecked;

  const editListCreateOpen = (checkItems) => {
    setsalesListType("01");
    setListCreateOpen(true);
  };

  const corporationDetails1 = (corporationList) => {
    navigate("/corporation/corporationDetails1", {
      state: corporationList,
    });
  };

  return (
    <CardContent style={{ textOverflow: "ellipsis" }}>
      <CardHeader
        action={
          <Box>
            <Button
              disabled={disabled}
              variant="contained"
              onClick={(checkItems) => editListCreateOpen(checkItems)}
            >
              <AddIcon />
              　企業リストを作成
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
                  // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
                  checked={
                    checkItems.length === corporationLists.length ? true : false
                  }
                />
              </TableCell>
              <TableCell align="center">法人番号</TableCell>
              <TableCell align="center">会社名・法人名</TableCell>
              <TableCell align="center">業種</TableCell>
              <TableCell align="center">郵便番号</TableCell>
              <TableCell align="center">本社住所</TableCell>
              <TableCell align="center">代表電話番号</TableCell>
              <TableCell align="center">代表者名</TableCell>
              <TableCell align="center">Webサイト</TableCell>
              <TableCell align="center">売上</TableCell>
              <TableCell align="center">従業員数</TableCell>
              <TableCell align="center">設立</TableCell>
              <TableCell align="center">資本金</TableCell>
              <TableCell align="center">上場</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCorporationLists.map((corporationList) => {
              const isCorporationListSelected =
                selectedCorporationLists.includes(
                  corporationList.corporation_id
                );
              return (
                <TableRow hover key={corporationList.corporation_id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      name={`select-${corporationList.corporation_id}`}
                      onChange={(e) =>
                        handleSingleCheck(
                          e.target.checked,
                          corporationList.corporation_id
                        )
                      }
                      checked={
                        checkItems.includes(corporationList.corporation_id)
                          ? true
                          : false
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {corporationList.corporate_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() => corporationDetails1(corporationList)}
                      sx={{ textDecoration: "underline" }}
                    >
                      {corporationList.corporation_name}
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
                      {corporationList.business_category}
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
                      {corporationList.zip_code}
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
                      {corporationList.address}
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
                      {corporationList.representative_phone_number}
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
                      {corporationList.representative_name}
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
                      {corporationList.home_page}
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
                      {corporationList.sales_amount}
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
                      {corporationList.employee_number}
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
                      {corporationList.establishment_year}
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
                      {corporationList.capital_stock}
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
                      {getStatusLabel(corporationList.listing_status)}
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
          count={filteredCorporationLists.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </CardContent>
  );
};

CorporationLists.propTypes = {
  corporationLists: PropTypes.array.isRequired,
};

CorporationLists.defaultProps = {
  corporationLists: [],
};

export default CorporationLists;
