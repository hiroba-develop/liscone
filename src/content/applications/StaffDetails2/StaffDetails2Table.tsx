import { Box, Card } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Label from "src/components/Label";
import { CorporationListStatus } from "src/models/staff_details_list";
import { renderCellExpand } from "src/utility/renderexpand";

const SalesLists = ({ staffList }) => {
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
      field: "corporation_corporate_number",
      headerName: "法人番号",
      width: 130,
    },
    {
      field: "corporation_corporation_name",
      headerName: "会社名・法人名",
      width: 150,
      maxWidth: 300,
      renderCell: renderCellExpand,
    },
    {
      field: "corporation_business_category",
      headerName: "業種",
      width: 100,
      maxWidth: 200,
      renderCell: renderCellExpand,
    },
    { field: "corporation_zip_code", headerName: "郵便番号", width: 150 },
    {
      field: "corporation_address",
      headerName: "本社住所",
      width: 300,
      maxWidth: 500,
      renderCell: renderCellExpand,
    },
    {
      field: "corporation_representative_phone_number",
      headerName: "代表電話番号",
      width: 200,
    },
    {
      field: "corporation_representative_name",
      headerName: "代表者名",
      width: 100,
    },
    {
      field: "corporation_home_page",
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
      field: "corporation_sales_amount",
      headerName: "売上",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "corporation_employee_number",
      headerName: "従業員数",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "corporation_establishment_year",
      headerName: "設立",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "corporation_capital_stock",
      headerName: "資本金",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
    },
    {
      field: "corporation_listing_status",
      headerName: "上場",
      width: 80,
      align: "center",
      renderCell: (params) => {
        return getStatusLabel(params.value);
      },
    },
  ];

  return (
    <Card>
      <Box sx={{ height: 150, maxWidth: 2000 }}>
        <DataGrid
          rows={[staffList]}
          getRowId={(row: any) => row.corporation_corporation_id}
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
