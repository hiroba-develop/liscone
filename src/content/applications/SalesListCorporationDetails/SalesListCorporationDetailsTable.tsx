import { Box, Card, Typography } from "@mui/material";
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

  return (
    <Card>
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
