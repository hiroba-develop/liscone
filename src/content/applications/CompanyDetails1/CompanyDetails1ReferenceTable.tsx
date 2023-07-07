import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SalesLists = ({ companyList }) => {
  return (
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
            <TableRow hover key={companyList.corporation_id}>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.corporate_number}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.business_category}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.zip_code}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.address}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.representative_name}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.sales_amount}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.employee_number}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.establishment_year}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.capital_stock}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap
                >
                  {companyList.listing_status}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default SalesLists;
