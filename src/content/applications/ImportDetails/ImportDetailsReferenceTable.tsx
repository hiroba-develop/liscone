import Label from "src/components/Label";
import { Box, Card } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CorporationListStatus } from "src/models/corporation_list";
import { renderCellExpand } from "src/utility/renderexpand";
import { CODE } from "src/utility/constants/Code";

const SalesLists = ({ importList }) => {
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
      field: "corporation_id",
      headerName: "法人番号",
      width: 130,
    },
    {
      field: "corporation_name",
      headerName: "会社名・法人名",
      width: 150,
      maxWidth: 300,
    },
    {
      field: "zip_code",
      headerName: "郵便番号",
      width: 150,
    },
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
    {
      field: "representative_name",
      headerName: "代表者名",
      width: 100,
    },
    {
      field: "home_page",
      headerName: "Webサイト",
      width: 200,
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
      field: "transaction_status",
      headerName: "取引ステータス",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return params.value !== null && params.value !== ""
          ? CODE.TRAN_STATUS.find((e) => e.key === params.value).code
          : "";
      },
    },
    {
      field: "memo",
      headerName: "メモ",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
  ];

  return (
    <Card>
      <Box sx={{ height: 150, maxWidth: 2000 }}>
        <DataGrid
          rows={[importList]}
          getRowId={(row: any) => row.corporation_id}
          columns={columns}
          hideFooterPagination
          hideFooterSelectedRowCount
          hideFooter
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

export default SalesLists;
