import React, { useEffect, ChangeEvent, FC, useState } from "react";
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
  searchCompanyListStatus: string;
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
    Y: {
      text: "上場",
      color: "black",
    },
    N: {
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

    if (filters.status && companyLists.listing_status !== filters.status) {
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
  searchCompanyListStatus,
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

  // 項目値から桁を取る
  function convertToNumber(amount) {
    const units = {
      万円: 10000,
      億円: 100000000,
      兆円: 1000000000000,
    };

    const unitPattern = /(\d+)\s*([万億兆]円)/;
    const match = unitPattern.exec(amount);

    if (match && match[2] && units.hasOwnProperty(match[2])) {
      const value = parseInt(match[1]);
      const unit = match[2];
      return value * units[unit];
    }

    return "";
  }
  function getStatusValue(listingStatus) {
    return listingStatus === "上場"
      ? "Y"
      : listingStatus === "未上場"
      ? "N"
      : "";
  }

  //範囲条件内か確認
  function isWithinRange(value, minValue, maxValue) {
    minValue =
      minValue !== undefined && minValue !== "" ? minValue : Number.MIN_VALUE;
    maxValue =
      maxValue !== undefined && maxValue !== "" ? maxValue : Number.MAX_VALUE;
    return value >= minValue && value <= maxValue;
  }
  // 絞り込み
  let searchComparyLists = companyLists.filter(
    (companyList) =>
      companyList.corporate_number.match(searchComparyNumber) &&
      companyList.corporation_name.match(searchCompanyName) &&
      companyList.business_category.match(searchIndustry) &&
      companyList.address.match(searchPrefectures) &&
      companyList.representative_phone_number.match(
        searchRepresentativePhoneNumber
      ) &&
      companyList.listing_status.match(
        getStatusValue(searchCompanyListStatus)
      ) &&
      isWithinRange(
        companyList.sales_amount,
        convertToNumber(searchMinSalesAmount),
        convertToNumber(searchMaxSalesAmount)
      ) &&
      isWithinRange(
        companyList.employee_number,
        searchMinEmployeeNumber,
        searchMaxEmployeeNumber
      ) &&
      isWithinRange(
        companyList.establishment_year,
        searchMinEstablishmentYear,
        searchMaxEstablishmentYear
      ) &&
      isWithinRange(
        companyList.capital_stock,
        convertToNumber(searchMinCapitalStock),
        convertToNumber(searchMaxCapitalStock)
      )
  );
  const filteredCompanyLists = applyFilters(searchComparyLists, filters);
  const paginatedCompanyLists = applyPagination(
    filteredCompanyLists,
    page,
    limit
  );

  //数値の後ろに桁をつける処理
  function convertToMyriadSystem(number) {
    if (number === 0) {
      return "0";
    }
    let result = "";
    let digitIndex = 0;
    while (number > 0) {
      const digit = number % 10000;
      if (digit !== 0) {
        result = digit.toString() + getDigitSuffix(digitIndex) + result;
      }
      number = Math.floor(number / 10000);
      digitIndex++;
    }
    return result;
  }
  function getDigitSuffix(digitIndex) {
    const digits = ["", "万", "億", "兆"];
    return digits[digitIndex];
  }

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
      companyLists.forEach((el) => idArray.push(el));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  const isChecked = checkItems.length > 0;

  const editListCreateOpen = (checkItems) => {
    setsalesListType("01");
    setListCreateOpen(true);
  };

  const companyDetails1 = (companyList) => {
    navigate("/company/companyDetails1", {
      state: companyList,
    });
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box>
            <Button
              // disabled={disabled}
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
                companyList.corporation_id
              );
              return (
                <TableRow hover key={companyList.corporation_id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      name={`select-${companyList.corporation_id}`}
                      onChange={(e) =>
                        handleSingleCheck(
                          e.target.checked,
                          companyList.corporation_id
                        )
                      }
                      checked={
                        checkItems.includes(companyList.corporation_id)
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
                      {companyList.corporate_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={() => companyDetails1(companyList)}
                      sx={{ textDecoration: "underline" }}
                    >
                      {companyList.corporation_name}
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
                      {companyList.business_category}
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
                      {companyList.zip_code}
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
                      {companyList.address}
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
                      {companyList.representative_phone_number}
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
                      {companyList.representative_name}
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
                      {companyList.home_page}
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
                      {convertToMyriadSystem(companyList.sales_amount)}
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
                      {convertToMyriadSystem(companyList.employee_number)}名
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
                      {companyList.establishment_year}年
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
                      {convertToMyriadSystem(companyList.capital_stock)}
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
                      {getStatusLabel(companyList.listing_status)}
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
