import {
  Box,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import Label from "src/components/Label";
import { SalesList, SalesListStatus } from "src/models/sales_list";
import { SalesListStatistic } from "src/models/sales_list_statistic";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface SalesListsProps {
  className?: string;
  salesLists: SalesList[];
  salesListStatistics: SalesListStatistic[];
}

const getStatusLabel = (salesListStatus: SalesListStatus): JSX.Element => {
  const map = {
    "01": {
      text: "企業リスト",
      color: "primary",
    },
    "02": {
      text: "担当者リスト",
      color: "info",
    },
  };

  const { text, color }: any = map[salesListStatus];

  return <Label color={color}>{text}</Label>;
};

const SalesLists: FC<SalesListsProps> = ({
  salesLists,
  salesListStatistics,
}) => {
  const columns: GridColDef[] = [
    {
      field: "sales_list_name",
      headerName: "リスト名",
      width: 200,
      renderCell: (params) => {
        return (
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
            onClick={(event) => {
              if (params.row.sales_list_type === "01") {
                navigate("/salesTask/salesListCorporationDetails", {
                  state: salesLists.find(
                    (e) => e.sales_list_number === params.row.sales_list_number
                  ),
                });
              } else {
                navigate("/salesTask/salesListStaffDetails", {
                  state: salesLists.find(
                    (e) => e.sales_list_number === params.row.sales_list_number
                  ),
                });
              }
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "created",
      headerName: "作成日",
      width: 100,
      renderCell: (params) => {
        return dayjs(params.value).format("YYYY-MM-DD");
      },
    },
    {
      field: "listCount",
      headerName: "件数",
      width: 100,
    },
    { field: "proceedCount", headerName: "消化数", width: 100 },
    {
      field: "projectCount",
      headerName: "商談化",
      width: 100,
      renderCell: (params) => {
        return params.row.proceedCount === "0"
          ? "0%"
          : (params.value / params.row.proceedCount) * 100 + "%";
      },
    },
    {
      field: "contractCount",
      headerName: "受注率",
      width: 100,
      renderCell: (params) => {
        return params.row.proceedCount === "0"
          ? "0%"
          : (params.value / params.row.proceedCount) * 100 + "%";
      },
    },
    {
      field: "expectSales",
      headerName: "ヨミ",
      width: 100,
      renderCell: (params) => {
        return (params.value * 1).toLocaleString() + "円";
      },
    },
    {
      field: "member_name",
      headerName: "ユーザー",
      width: 100,
    },
    {
      field: "sales_list_type",
      headerName: "リスト種類",
      width: 100,
      renderCell: (params) => {
        return getStatusLabel(params.value);
      },
    },
  ];
  const navigate = useNavigate();

  return (
    <Card>
      <Box sx={{ height: 600, maxWidth: 1400 }}>
        <DataGrid
          rows={salesListStatistics}
          getRowId={(row: any) => row.sales_list_number}
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
        />
      </Box>
    </Card>
  );
};

SalesLists.propTypes = {
  salesLists: PropTypes.array.isRequired,
  salesListStatistics: PropTypes.array.isRequired,
};

SalesLists.defaultProps = {
  salesLists: [],
  salesListStatistics: [],
};

export default SalesLists;
