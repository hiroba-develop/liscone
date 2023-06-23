import { FC } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { SalesDetailsList } from "src/models/sales_details_list";

interface SalesListsProps {
  className?: string;
  companydetails1referenceList: SalesDetailsList[];
}

const applyFilters = (
  companydetails1referenceList: SalesDetailsList[]
): SalesDetailsList[] => {
  return companydetails1referenceList.filter((companydetails1referenceList) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  salesLists: SalesDetailsList[],
  page: number,
  limit: number
): SalesDetailsList[] => {
  return salesLists.slice(page * limit, page * limit + limit);
};

const SalesLists: FC<SalesListsProps> = ({
  companydetails1referenceList: salesDetailsLists,
}) => {
  const page: number = 0;
  const limit: number = 5;

  const filteredSalesList = applyFilters(salesDetailsLists);
  const paginatedSalesLists = applyPagination(filteredSalesList, page, limit);

  return (
    <Box sx={{ mt: 25 }}>
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "background.paper" }}>
                <TableCell align="center">法人番号</TableCell>
                <TableCell align="center">業種</TableCell>
                <TableCell align="center">郵便番号</TableCell>
                <TableCell align="center">本社住所</TableCell>
                <TableCell align="center">代表者名</TableCell>
                <TableCell align="center">売上</TableCell>
                <TableCell align="center">従業員数</TableCell>
                <TableCell align="center">設立</TableCell>
                <TableCell align="center">資本金</TableCell>
                <TableCell align="center">上場</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedSalesLists.map((SalesDetailsList) => {
                return (
                  <TableRow hover key={SalesDetailsList.id}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.corporateNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.businessCategory}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.zipCode}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.address}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.representativeName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.salesAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.employeeNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.establishmentYear}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.capitalStock}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {SalesDetailsList.listingStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

SalesLists.propTypes = {
  companydetails1referenceList: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  companydetails1referenceList: [],
};

export default SalesLists;
