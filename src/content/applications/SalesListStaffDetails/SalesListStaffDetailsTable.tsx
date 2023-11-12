import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CardHeader,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SalesList } from "src/models/sales_list";
import { SalesListStatistic } from "src/models/sales_list_statistic";
import { SalesListStaff } from "src/models/sales_list_staff";
import AddIcon from "@mui/icons-material/Add";

interface StaffDetails2ListProps {
  className?: string;
  staffList: SalesListStaff[];
  selectedSalesList: SalesList;
  salesListStatistic: SalesListStatistic;
}

const applyFilters = (staffLists: SalesListStaff[]): SalesListStaff[] => {
  return staffLists.filter((staffList) => {
    let matches = true;
    return matches;
  });
};

const applyPagination = (
  staffLists: SalesListStaff[],
  page: number,
  limit: number
): SalesListStaff[] => {
  return staffLists.slice(page * limit, page * limit + limit);
};
const StaffLists: FC<StaffDetails2ListProps> = ({
  staffList: staffLists,
  selectedSalesList: salesList,
  salesListStatistic: salesStatistic,
}) => {
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredSalesList = applyFilters(staffLists);
  const paginatedSalesLists = applyPagination(staffLists, page, limit);

  const navigate = useNavigate();
  // csvダウンロード
  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }

  function downloadCSV(content, charset) {
    const fileName = `personal_list_${
      salesStatistic.sales_list_name
    }_${getFormattedDate()}.csv`;
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), content], {
      type: "text/csv;charset=" + charset,
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function convertObjectsToCSV() {
    const objIterator = iterateObjects(staffLists);
    const csvStrings = [];
    var title = 0;
    for (const obj of objIterator) {
      const csvString = objectToCSV(obj, title);
      csvStrings.push(csvString);
      title++;
    }
    const combinedCSV = csvStrings.join("\n");
    downloadCSV(combinedCSV, "utf-8");
  }

  function* iterateObjects(objArray) {
    for (const obj of objArray) {
      yield obj;
    }
  }

  function objectToCSV(obj, title) {
    var csvRows = [];
    const keys = Object.keys(obj);
    var csvRow;
    for (const key of keys) {
      const value = obj[key];
      if (
        key === "corporation_corporation_name" ||
        key === "staff_job_position" ||
        key === "staff_staff_name" ||
        key === "staff_profile_source_type" ||
        key === "staff_profile_link"
      ) {
        if (title === 0 && key === "corporation_corporation_name") {
          csvRow = `corporation_name,job_position,staff_name,profile_source_type,profile_link\n"${value}"`;
          csvRows.push(csvRow);
        } else {
          csvRow = `"${value}"`;
          csvRows.push(csvRow);
        }
      }
    }
    return csvRows;
  }

  const handleCorpNameEvent = (staffList, salesList, salesStatistic) => {
    // 子ウィンドウを開く
    const popup = window.open("/salesTask/staffDetails2", "_blank");

    // 子ウィンドウにメッセージを送信
    popup.onload = () =>
      popup.postMessage(
        [staffList, salesList, salesStatistic],
        window.location.origin
      );
  };

  return (
    <Card>
      <CardHeader
        action={
          <Box>
            <Button
              sx={{ borderRadius: 0.5, backgroundColor: "#109DBC" }}
              fullWidth
              variant="contained"
              onClick={convertObjectsToCSV}
            >
              <AddIcon />
              　csv出力
            </Button>
          </Box>
        }
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">会社名・法人名</TableCell>
              <TableCell align="left">役職</TableCell>
              <TableCell align="left">氏名</TableCell>
              <TableCell align="left">アカウントソース</TableCell>
              <TableCell align="left">プロフィールリンク</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSalesLists.map((staffList) => {
              return (
                <TableRow hover key={staffList.staff_staff_id}>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                      onClick={(event) => {
                        handleCorpNameEvent(
                          staffList,
                          salesList,
                          salesStatistic
                        );
                      }}
                      sx={{ textDecoration: "underline" }}
                    >
                      {staffList.corporation_corporation_name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.staff_job_position}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.staff_staff_name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.staff_profile_source_type}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staffList.staff_profile_link}
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
          count={filteredSalesList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 20, 30]}
        />
      </Box>
    </Card>
  );
};

StaffLists.propTypes = {
  staffList: PropTypes.array.isRequired,
};

StaffLists.defaultProps = {
  staffList: [],
};

export default StaffLists;
