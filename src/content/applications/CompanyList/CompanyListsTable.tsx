import { FC, ChangeEvent, useState } from "react";
import PropTypes from "prop-types";
import {
  Divider,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  Button,
} from "@mui/material";

import Label from "src/components/Label";
import { CompanyList, CompanyListStatus } from "src/models/company_list";
import TaskLog from "../PopUp/TaskLog";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

interface CompanyListsProps {
  className?: string;
  companyLists: CompanyList[];
}

interface Filters {
  status?: CompanyListStatus;
}

const getStatusLabel = (companyListStatus: CompanyListStatus): JSX.Element => {
  const map = {
    Y: {
      text: "上場",
      color: "error",
    },
    N: {
      text: "未上場",
      color: "black",
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

const CompanyLists: FC<CompanyListsProps> = ({ companyLists }) => {
  const selectedCompanyLists: string[] = [];
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

  const filteredCompanyLists = applyFilters(companyLists, filters);
  const paginatedCompanyLists = applyPagination(
    filteredCompanyLists,
    page,
    limit
  );
  const selectedSomeCompanyLists =
    selectedCompanyLists.length > 0 &&
    selectedCompanyLists.length < companyLists.length;

  const [taskLogOpen, setTaskLogOpen] = useState(false);
  const editTaskLogOpen = () => setTaskLogOpen(true);

  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        action={
          <Box>
            <Button variant="contained" onClick={editTaskLogOpen}>
              <AddIcon />
              　企業リストを作成
            </Button>
          </Box>
        }
      />
      <TaskLog taskLogOpen={taskLogOpen} setTaskLogOpen={setTaskLogOpen} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={selectedSomeCompanyLists}
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
                    <Checkbox color="primary" value={isCompanyListSelected} />
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
                      onClick={() => navigate("/company/companyDetails1")}
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
                      {companyList.sales_amount}
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
                      {companyList.employee_number}
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
                      {companyList.establishment_year}
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
                      {companyList.capital_stock}
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
