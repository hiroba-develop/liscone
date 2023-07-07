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
import Label from "src/components/Label";
import { CompanyList, CompanyListStatus } from "src/models/company_list";
import ListCreate from "../PopUp/ListCreate";

interface CompanyListsProps {
  className?: string;
  companyLists: CompanyList[];
  searchComparyNumber: string;
  searchCompanyName: string;
  searchIndustry: string;
  searchPrefectures: string;
  searchRepresentativePhoneNumber: string;
  searchMinSalesAmount: string;
  searchMaxSalesAmount: string;
  searchMinEmployeeNumber: string;
  searchMaxEmployeeNumber: string;
  searchMinEstablishmentYear: string;
  searchMaxEstablishmentYear: string;
  searchMinCapitalStock: string;
  searchMaxCapitalStock: string;
}

interface Filters {
  status?: CompanyListStatus;
}

const getStatusLabel = (companyListStatus: CompanyListStatus): JSX.Element => {
  const map = {
    listed: {
      text: "上場",
      color: "black",
    },
    unlisted: {
      text: "未上場",
      color: "error",
    },
  };

  const { text, color }: any = map[companyListStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  companyLists: CompanyList[],
  filters: Filters
): CompanyList[] => {
  return companyLists.filter((companyLists) => {
    let matches = true;

    if (filters.status && companyLists.listing !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  companyLists: CompanyList[],
  page: number,
  limit: number
): CompanyList[] => {
  return companyLists.slice(page * limit, page * limit + limit);
};
const CompanyLists: FC<CompanyListsProps> = ({
  companyLists,
  searchComparyNumber,
  searchCompanyName,
  searchIndustry,
  searchPrefectures,
  searchRepresentativePhoneNumber,
  searchMinSalesAmount,
  searchMaxSalesAmount,
  searchMinEmployeeNumber,
  searchMaxEmployeeNumber,
  searchMinEstablishmentYear,
  searchMaxEstablishmentYear,
  searchMinCapitalStock,
  searchMaxCapitalStock,
}) => {
  const selectedCompanyLists: string[] = [];
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

  //絞り込み
  let searchComparyLists = companyLists.filter(
    (companyList) =>
      companyList.companyNumber.match(searchComparyNumber) &&
      companyList.companyName.match(searchCompanyName) &&
      companyList.industry.match(searchIndustry) &&
      companyList.headOfficeAddress.match(searchPrefectures) &&
      companyList.representativeNumber.match(searchRepresentativePhoneNumber)
  );
  const filteredCompanyLists = applyFilters(searchComparyLists, filters);
  const paginatedCompanyLists = applyPagination(
    filteredCompanyLists,
    page,
    limit
  );

  const [listCreateOpen, setListCreateOpen] = useState(false);
  const editListCreateOpen = () => setListCreateOpen(true);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);
  const navigate = useNavigate();

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      companyLists.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
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
              // disabled={disabled}
              variant="contained"
              onClick={editListCreateOpen}
            >
              <AddIcon />
              　企業リストを作成
            </Button>
          </Box>
        }
      />
      <ListCreate
        listCreateOpen={listCreateOpen}
        setListCreateOpen={setListCreateOpen}
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
                    checkItems.length === companyLists.length ? true : false
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
            {paginatedCompanyLists.map((companyList) => {
              const isCompanyListSelected = selectedCompanyLists.includes(
                companyList.id
              );
              return (
                <TableRow hover key={companyList.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      name={`select-${companyList.id}`}
                      onChange={(e) =>
                        handleSingleCheck(e.target.checked, companyList.id)
                      }
                      checked={
                        checkItems.includes(companyList.id) ? true : false
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
                      {companyList.companyNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() => navigate("/company/companyDetails1")}
                      sx={{ textDecoration: "underline" }}
                    >
                      {companyList.companyName}
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
                      {companyList.industry}
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
                      {companyList.postNumber}
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
                      {companyList.headOfficeAddress}
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
                      {companyList.representativeNumber}
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
                      {companyList.representativeName}
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
                      {companyList.website}
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
                      {companyList.earnings}
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
                      {companyList.numberOfEmployees}
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
                      {companyList.established}
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
                      {companyList.capital}
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
                      {getStatusLabel(companyList.listing)}
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
          count={filteredCompanyLists.length}
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

CompanyLists.propTypes = {
  companyLists: PropTypes.array.isRequired,
};

CompanyLists.defaultProps = {
  companyLists: [],
};

export default CompanyLists;
