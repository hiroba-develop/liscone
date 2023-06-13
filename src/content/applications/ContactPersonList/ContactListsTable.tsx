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
import { ContactList, ContactListRoles } from 'src/models/contact_list'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface ContactListsProps {
  className?: string;
  contactLists: ContactList[];
}

interface Filters {
  status?: ContactListRoles;
}

const getStatusLabel = (contactListRoles: ContactListRoles): JSX.Element => {
  const map = {
    marketing: {
      text: 'マーケティング',
      color: 'error'
    },
    sales: {
      text: '営業',
      color: 'warn'
    }
  };

  const { text, color }: any = map[contactListRoles];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  contactList: ContactList[],
  filters: Filters
): ContactList[] => {
  return contactList.filter((contactList) => {
    let matches = true;

    if (filters.status && contactList.role !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  companyLists: ContactList[],
  page: number,
  limit: number
): ContactList[] => {
  return companyLists.slice(page * limit, page * limit + limit);
};

const ContactLists: FC<ContactListsProps> = ({ contactLists }) => {
  const [selectedContactLists, setSelectedContactLists] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedContactLists.length > 0;
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
      id: 'marketing',
      name: 'マーケティング'
    },
    {
      id: 'sales',
      name: '営業'
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

  const handleSelectAllContactLists = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedContactLists(
      event.target.checked
        ? contactLists.map((contactList) => contactList.id)
        : []
    );
  };

  const handleSelectOneContactList = (
    event: ChangeEvent<HTMLInputElement>,
    contactListId: string
  ): void => {
    if (!selectedContactLists.includes(contactListId)) {
      setSelectedContactLists((prevSelected) => [
        ...prevSelected,
        contactListId
      ]);
    } else {
      setSelectedContactLists((prevSelected) =>
        prevSelected.filter((id) => id !== contactListId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredContactLists = applyFilters(contactLists, filters);
  const paginatedContactLists = applyPagination(
    filteredContactLists,
    page,
    limit
  );
  const selectedSomeContactLists =
    selectedContactLists.length > 0 &&
    selectedContactLists.length < contactLists.length;
  const selectedAllContactLists =
  selectedContactLists.length === contactLists.length;
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
                <InputLabel>役職</InputLabel>
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
                  indeterminate={selectedSomeContactLists}
                  //onChange={handleSelectAllCompanyLists}
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
            {paginatedContactLists.map((contactList) => {
              const isContactListSelected = selectedContactLists.includes(
                contactList.id
              );
              return (
                <TableRow
                  hover
                  key={contactList.id}
                  //selected={isContactListSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      //checked={isContactListSelected}
                      // onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      //   handleSelectOneContactList(event, contactList.id)
                      // }
                      value={isContactListSelected}
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
                      {contactList.companyName}
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
                      {getStatusLabel(contactList.role)}
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
                      {contactList.familyName}
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
                      {contactList.accountSource}
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
                      {contactList.profileLink}
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
          count={filteredContactLists.length}
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

ContactLists.propTypes = {
  contactLists: PropTypes.array.isRequired
};

ContactLists.defaultProps = {
  contactLists: []
};

export default ContactLists;
