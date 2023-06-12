import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { CompanyList, CompanyListStatus } from 'src/models/company_list'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface CompanyListsProps {
  className?: string;
  companyLists: CompanyList[];
}

interface Filters {
  status?: CompanyListStatus;
}

const getStatusLabel = (companyListStatus: CompanyListStatus): JSX.Element => {
  const map = {
    listed: {
      text: '上場',
      color: 'error'
    },
    unlisted: {
      text: '未上場',
      color: 'black'
    }
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

const CompanyLists: FC<CompanyListsProps> = ({ companyLists }) => {
  const [selectedCompanyLists, setSelectedCompanyLists] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCompanyLists.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'listed',
      name: 'listed'
    },
    {
      id: 'unlisted',
      name: 'unlisted'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllCompanyLists = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCompanyLists(
      event.target.checked
        ? companyLists.map((companyList) => companyList.id)
        : []
    );
  };

  const handleSelectOneCompanyList = (
    event: ChangeEvent<HTMLInputElement>,
    companyListId: string
  ): void => {
    if (!selectedCompanyLists.includes(companyListId)) {
      setSelectedCompanyLists((prevSelected) => [
        ...prevSelected,
        companyListId
      ]);
    } else {
      setSelectedCompanyLists((prevSelected) =>
        prevSelected.filter((id) => id !== companyListId)
      );
    }
  };

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
  const selectedAllCompanyLists =
  selectedCompanyLists.length === companyLists.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="絞り込み"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  //checked={selectedAllCompanyLists}
                  indeterminate={selectedSomeCompanyLists}
                  //onChange={handleSelectAllCompanyLists}
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
                <TableRow
                  hover
                  key={companyList.id}
                  //selected={isCompanyListSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      //checked={isCompanyListSelected}
                      // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      //   handleSelectOneCompanyList(event, companyList.id)
                      // }
                      value={isCompanyListSelected}
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
{/* 
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                   */}
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
  companyLists: PropTypes.array.isRequired
};

CompanyLists.defaultProps = {
  companyLists: []
};

export default CompanyLists;
