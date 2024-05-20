import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { FC, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import { StaffList } from "src/models/staff_list";
import ListCreate from "../PopUp/ListCreate";

interface StaffListsProps {
  className?: string;
  localeTextValue: string;
  staffLists: StaffList[];
}

const StaffLists: FC<StaffListsProps> = ({ localeTextValue, staffLists }) => {
  //Gridの中央の文章
  let localeText = {
    noRowsLabel: localeTextValue,
  };

  const [checkItems, setCheckItems] = useState([]);
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  const editListCreateOpen = (checkItems) => {
    setsalesListType("02");
    setListCreateOpen(true);
  };

  const isChecked = checkItems.length > 0;
  const disabled = !isChecked;

  const handlestaffListEvent = (event, staffList) => {
    // 子ウィンドウを開く
    const popup = window.open("/staff/staffDetails1", "_blank");

    // 子ウィンドウにメッセージを送信
    popup.onload = () =>
      popup.postMessage([staffList.row], window.location.origin);
  };
  const handleprofileLink = (event, params) => {
    window.open(params.value, "_blank");
  };

  // DATAGRID
  const columns: GridColDef[] = [
    {
      field: "corporationEntity",
      headerName: "会社名・法人名",
      flex: 3,
      valueGetter: (params) => params.row.corporationEntity.corporation_name,
    },
    { field: "job_position", headerName: "役職", flex: 4 },
    {
      field: "staff_name",
      headerName: "氏名",
      flex: 2,
      renderCell: (params) => {
        return (
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
            onClick={(event) => {
              handlestaffListEvent(event, params);
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "profile_source_type",
      headerName: "アカウントソース",
      flex: 1.5,
    },
    {
      field: "profile_link",
      headerName: "プロフィールリンク",
      flex: 4,
      renderCell: (params) => {
        return (
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
            onClick={(event) => {
              handleprofileLink(event, params);
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "other_information",
      headerName: "その他",
      flex: 2,
    },
    {
      field: "employee_status",
      headerName: "在籍状況",
      flex: 2,
      renderCell: (params) => {
        let employee_status;
        if (params.value === 0) {
          employee_status="現職";
        } else if (params.value === 1) {
          employee_status="休職中";
        } else if (params.value === 2) {
          employee_status="離職済み";
        } else {
          employee_status="不明なステータス";
              }
        return (
          <Typography>
            {employee_status}
          </Typography>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Box>
            <Button
              disabled={disabled}
              sx={{ borderRadius: 0.5, backgroundColor: "#109DBC" }}
              fullWidth
              variant="contained"
              onClick={(checkItems) => editListCreateOpen(checkItems)}
            >
              <AddIcon />
              　担当者リストを作成
            </Button>
          </Box>
        }
      />
      <ListCreate
        listCreateOpen={listCreateOpen}
        checkItems={checkItems}
        setListCreateOpen={setListCreateOpen}
        salesListType={salesListType}
      />
      <Divider />
      <div style={{ height: 450, width: "100%" }}>
        <DataGrid
          sx={{
            border: 0,
            borderRadius: 0,
            fontFamily: "'Noto Sans JP', sans-serif",
            fontWeight: "bold",
          }}
          rowHeight={70}
          rows={staffLists}
          getRowId={(row: any) => row.staff_id}
          columns={columns}
          localeText={localeText}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = staffLists.filter((row) =>
              selectedIDs.has(row.staff_id)
            );

            setCheckItems(selectedRows);
          }}
        />
      </div>
    </Card>
  );
};

StaffLists.propTypes = {
  staffLists: PropTypes.array.isRequired,
};

StaffLists.defaultProps = {
  staffLists: [],
};

export default StaffLists;
