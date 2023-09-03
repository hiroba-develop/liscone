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
      U: {
        text: "未確認",
        color: "error",
      },
    };

    const { text, color }: any = map[corporationListStatus];

    return <Label color={color}>{text}</Label>;
  };
  const columns: GridColDef[] = [
    {
      field: "corporate_number",
      headerName: "法人番号",
      width: 130,
      valueGetter: (params) => params.row.corporationEntity.corporate_number,
    },
    {
      field: "corporation_name",
      headerName: "会社名・法人名",
      width: 150,
      maxWidth: 300,
      valueGetter: (params) => params.row.corporationEntity.corporation_name,
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
      valueGetter: (params) => params.row.corporationEntity.business_category,
      renderCell: renderCellExpand,
    },
    {
      field: "zipCode",
      headerName: "郵便番号",
      width: 150,
      valueGetter: (params) => params.row.corporationEntity.zip_code,
    },
    {
      field: "address",
      headerName: "本社住所",
      width: 300,
      maxWidth: 500,
      valueGetter: (params) => params.row.corporationEntity.address,
      renderCell: renderCellExpand,
    },
    {
      field: "representative_phone_number",
      headerName: "代表電話番号",
      width: 200,
      valueGetter: (params) =>
        params.row.corporationEntity.representative_phone_number,
    },
    {
      field: "representative_name",
      headerName: "代表者名",
      width: 100,
      valueGetter: (params) => params.row.corporationEntity.representative_name,
    },
    {
      field: "home_page",
      headerName: "Webサイト",
      width: 200,
      valueGetter: (params) => params.row.corporationEntity.home_page,

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
      valueGetter: (params) => params.row.corporationEntity.sales_amount,

      type: "number",
    },
    {
      field: "employee_number",
      headerName: "従業員数",
      headerAlign: "left",
      align: "left",
      width: 100,
      valueGetter: (params) => params.row.corporationEntity.employee_number,

      type: "number",
    },
    {
      field: "establishment_year",
      headerName: "設立",
      headerAlign: "left",
      align: "left",
      width: 100,
      valueGetter: (params) => params.row.corporationEntity.establishment_year,

      type: "number",
    },
    {
      field: "capital_stock",
      headerName: "資本金",
      headerAlign: "left",
      align: "left",
      width: 100,
      valueGetter: (params) => params.row.corporationEntity.capital_stock,

      type: "number",
    },
    {
      field: "listing_status",
      headerName: "上場",
      width: 80,
      valueGetter: (params) => params.row.corporationEntity.listing_status,

      align: "center",
      renderCell: (params) => {
        return getStatusLabel(params.value);
      },
    },
    {
      field: "transaction_status",
      headerName: "取引ステータス",
      width: 80,
      valueGetter: (params) => params.row.transaction_status,
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
    console.log(corporationList);
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
      if (key === "corporationEntity") {
        if (title === 0) {
          csvRow = `corporate_number,corporation_name,business_category,zip_code,address,representative_phone_number,representative_name,home_page,sales_amount,employee_number,establishment_year,capital_stock,listing_status\n${value.corporate_number},${value.corporation_name},${value.business_category},${value.zip_code},${value.address},${value.representative_phone_number},${value.representative_name},${value.home_page},${value.sales_amount},${value.employee_number},${value.establishment_year},${value.capital_stock},${value.listing_status}`;
          csvRows.push(csvRow);
        } else {
          csvRow = `"${value.corporate_number}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.corporation_name}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.business_category}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.zip_code}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.address}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.representative_phone_number}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.representative_name}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.home_page}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.sales_amount}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.employee_number}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.establishment_year}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.capital_stock}"`;
          csvRows.push(csvRow);
          csvRow = `"${value.listing_status}"`;
          csvRows.push(csvRow);
        }
      }
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
