import { Box, Card, Typography, CardHeader, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Label from "src/components/Label";
import {
  CorporationListStatus,
  SalesDetailsList,
} from "src/models/sales_details_list";
import { SalesList } from "src/models/sales_list";
import { SalesListStatistic } from "src/models/sales_list_statistic";
import { CODE } from "src/utility/constants/Code";
import { renderCellExpand } from "src/utility/renderexpand";
import AddIcon from "@mui/icons-material/Add";
import CorporationLists from "../CorporationList/CorporationListsTable";

interface SalesListsProps {
  className?: string;
  salesDetailsList: SalesDetailsList[];
  selectedSalesList: SalesList;
  salesListStatistic: SalesListStatistic;
}

const SalesLists: FC<SalesListsProps> = ({
  salesDetailsList: salesDetailsLists,
  selectedSalesList: salesList,
  salesListStatistic: salesStatistic,
}) => {
  const getStatusLabel = (
    corporationListStatus: CorporationListStatus
  ): JSX.Element => {
    const map = {
      Y: {
        text: "上場",
        color: "black",
      },
      N: {
        text: "未上場",
        color: "warn",
      },
      "": {
        text: "未確認",
        color: "error",
      },
    };

    const { text, color }: any = map[corporationListStatus];

    return <Label color={color}>{text}</Label>;
  };
  const columns: GridColDef[] = [
    { field: "corporate_number", headerName: "法人番号", width: 130 },
    {
      field: "corporation_name",
      headerName: "会社名・法人名",
      width: 150,
      maxWidth: 300,
      renderCell: (params) => {
        return (
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
            onClick={(event) => {
              handleCorpNameEvent(event, params);
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "business_category",
      headerName: "業種",
      width: 100,
      maxWidth: 200,
      renderCell: renderCellExpand,
    },
    { field: "zipCode", headerName: "郵便番号", width: 150 },
    {
      field: "address",
      headerName: "本社住所",
      width: 300,
      maxWidth: 500,
      renderCell: renderCellExpand,
    },
    {
      field: "representative_phone_number",
      headerName: "代表電話番号",
      width: 200,
    },
    { field: "representative_name", headerName: "代表者名", width: 100 },
    {
      field: "home_page",
      headerName: "Webサイト",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <a href="{params.row.value}" target="_blank">
      //       {params.value}
      //     </a>
      //   );
      // },
    },
    {
      field: "sales_amount",
      headerName: "売上",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "employee_number",
      headerName: "従業員数",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "establishment_year",
      headerName: "設立",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "capital_stock",
      headerName: "資本金",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "listing_status",
      headerName: "上場",
      width: 80,
      align: "center",
      renderCell: (params) => {
        return getStatusLabel(params.value);
      },
    },
    {
      field: "taskCount",
      headerName: "行動ログ数",
      width: 100,
      type: "number",
    },
    {
      field: "transaction_status",
      headerName: "取引ステータス",
      width: 80,
      align: "center",
      renderCell: (params) => {
        return params.value !== null && params.value !== ""
          ? CODE.TRAN_STATUS.find((e) => e.key === params.value).code
          : "";
      },
    },
  ];
  const navigate = useNavigate();

  const handleCorpNameEvent = (event, corporationList) => {
    navigate("/salesTask/corporationDetails2", {
      state: [corporationList.row, salesList, salesStatistic],
    });
  };

  // csvダウンロード
  function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }

  function downloadCSV(content, charset) {
    const fileName = `company_list_${
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
    const objIterator = iterateObjects(salesDetailsLists);
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
      // 指定されたキーの値が特定の値の場合は処理をスキップ
      if (
        key === "sales_list_number" ||
        key === "corporation_id" ||
        key === "transaction_status" ||
        key === "taskCount"
      ) {
        continue;
      }

      if (value == null) {
        csvRow = `${value}`;
      } else {
        csvRow = `"${value}"`;
      }
      if (key === "corporate_number" && title === 0) {
        csvRow = `corporate_number,corporation_name,business_category,zip_code,address,representative_phone_number,representative_name,home_page,sales_amount,employee_number,establishment_year,capital_stock,listing_status\n"${value}"`;
      }
      csvRows.push(csvRow);
    }
    return csvRows;
  }

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
      <Box sx={{ height: 400, maxWidth: 2000 }}>
        <DataGrid
          rows={salesDetailsLists}
          getRowId={(row: any) => row.corporation_id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            borderRadius: 0,
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: "bold",
          }}
          rowHeight={70}
        />
      </Box>
    </Card>
  );
};

SalesLists.propTypes = {
  salesDetailsList: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  salesDetailsList: [],
};

export default SalesLists;
