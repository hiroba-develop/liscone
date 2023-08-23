import { Box, Button, Card, CardHeader, Divider } from "@mui/material";
import PropTypes from "prop-types";
import { FC, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import { StaffList } from "src/models/staff_list";
import ListCreate from "../PopUp/ListCreate";

interface StaffListsProps {
  className?: string;
  staffLists: StaffList[];
  searchCorporationName: string;
  searchJobPosition: string;
  searchProfileSourceType: string;
  searchStaffName: string;
  searchSearchClick: number;
}

const StaffLists: FC<StaffListsProps> = ({
  staffLists,
  searchCorporationName,
  searchJobPosition,
  searchProfileSourceType,
  searchStaffName,
  searchSearchClick,
}) => {
  //Gridの中央の文章
  let localeText = {};
  if (searchSearchClick === 1) {
    if (staffLists.length > 10000) {
      localeText = {
        noRowsLabel: `検索結果は ${staffLists.length}件です。　検索条件を追加してください`,
      };
      const rows = [];
      staffLists = rows;
    }
    if (staffLists.length === 0) {
      localeText = {
        noRowsLabel: `検索結果は 0件です。　検索条件を変更してください`,
      };
      const rows = [];
      staffLists = rows;
    }
    if (
      searchCorporationName === "" &&
      searchJobPosition === "" &&
      searchProfileSourceType === "" &&
      searchStaffName === ""
    ) {
      const rows = [];
      staffLists = rows;
      localeText = {
        noRowsLabel: "データ件数が多すぎるため、条件を絞り込んで下さい",
      };
    }
  } else {
    localeText = {
      noRowsLabel:
        "絞り込み条件を選択または入力して「検索」ボタンを押下してください",
    };
  }

  const [checkItems, setCheckItems] = useState([]);
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  const editListCreateOpen = (checkItems) => {
    setsalesListType("02");
    setListCreateOpen(true);
  };

  const isChecked = checkItems.length > 0;
  const disabled = !isChecked;

  // DATAGRID
  const columns: GridColDef[] = [
    {
      field: "corporationEntity",
      headerName: "会社名・法人名",
      flex: 3,
      valueGetter: (params) => params.row.corporationEntity.corporation_name,
    },
    { field: "job_position", headerName: "役職", flex: 4 },
    { field: "staff_name", headerName: "氏名", flex: 1 },
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
