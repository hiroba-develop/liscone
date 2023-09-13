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
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handlestaffListEvent = (event, staffList) => {
    navigate("/staff/staffDetails1", {
      state: staffList.row,
    });
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
      flex: 1,
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
    { field: "profile_link", headerName: "プロフィールリンク", flex: 4 },
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
