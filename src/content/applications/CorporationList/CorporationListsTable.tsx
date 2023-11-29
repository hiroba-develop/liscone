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

import AddIcon from "@mui/icons-material/Add";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Label from "src/components/Label";
import {
  CorporationList,
  CorporationListStatus,
} from "src/models/corporation_list";
import { StaffList } from "src/models/staff_list";
import ListCreate from "../PopUp/ListCreate";
import { renderCellExpand } from "src/utility/renderexpand";
interface CorporationListsProps {
  className?: string;
  corporationLists: CorporationList[];
  staffLists: StaffList[];
  localeTextValue: string;
  searchSearchClick: number;
  searchJobPosition: string;
  searchDepartment: string;
  searchProfileSourceType: string;
  searchStaffName: string;
}

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

const CorporationLists: FC<CorporationListsProps> = ({
  corporationLists,
  staffLists,
  localeTextValue,
  searchSearchClick,
  searchJobPosition,
  searchDepartment,
  searchProfileSourceType,
  searchStaffName,
}) => {
  //Gridの中央の文章
  let localeText = {
    noRowsLabel: localeTextValue,
  };
  // 担当者検索処理
  const corporationIds = staffLists.map((item) => item.corporation_id);
  const uniqueCorporationIds = [...new Set(corporationIds)];
  let filtercorporationLists = corporationLists.filter((item) => {
    return uniqueCorporationIds.includes(item.corporation_id);
  });
  console.log(filtercorporationLists);
  let newCrporationLists = [];
  if (searchSearchClick === 3) {
    newCrporationLists = filtercorporationLists;
  }
  if (
    searchJobPosition === "" &&
    searchDepartment === "" &&
    searchProfileSourceType === undefined &&
    searchStaffName === "" &&
    searchSearchClick === 3
  ) {
    newCrporationLists = corporationLists;
  }
  if (searchSearchClick === 1) {
    newCrporationLists = corporationLists;
  }

  //数値の後ろに桁をつける処理
  function convertToMyriadSystem(number) {
    if (number === 0) {
      return "0";
    }
    let result = "";
    let digitIndex = 0;
    while (number > 0) {
      const digit = number % 10000;
      if (digit !== 0) {
        result = digit.toString() + getDigitSuffix(digitIndex) + result;
      }
      number = Math.floor(number / 10000);
      digitIndex++;
    }
    return result;
  }
  function getDigitSuffix(digitIndex) {
    const digits = ["", "万", "億", "兆"];
    return digits[digitIndex];
  }

  const [checkItems, setCheckItems] = useState([]);
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  const handleCorpNameEvent = (event, corporationList) => {
    // 子ウィンドウを開く
    const popup = window.open("/corporation/corporationDetails1", "_blank");

    // 子ウィンドウにメッセージを送信
    popup.onload = () =>
      popup.postMessage([corporationList.row], window.location.origin);
  };
  const handleWebpage = (event, params) => {
    window.open(params, "_blank");
  };

  const isChecked = checkItems.length > 0;
  const disabled = !isChecked;
  const editListCreateOpen = (checkItems) => {
    setsalesListType("01");
    setListCreateOpen(true);
  };

  // DATAGRID
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
      maxWidth: 200,
      renderCell: renderCellExpand,
    },
    { field: "zip_code", headerName: "郵便番号", width: 150 },
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
      width: 150,
    },
    { field: "representative_name", headerName: "代表者名", width: 100 },
    {
      field: "home_page",
      headerName: "Webサイト",
      width: 200,
      maxWidth: 300,
      renderCell: (params) => {
        return (
          <Typography
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
            onClick={(event) => {
              handleWebpage(event, params.value);
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "sales_amount",
      headerName: "売上",
      headerAlign: "left",
      width: 100,
      type: "number",
      align: "left",
      renderCell: (params) => {
        return convertToMyriadSystem(params.value);
      },
    },
    {
      field: "employee_number",
      headerName: "従業員数",
      headerAlign: "left",
      align: "left",
      width: 100,
      type: "number",
      renderCell: (params) => {
        if (params.value !== null) {
          return params.value + "名";
        }
      },
    },
    {
      field: "establishment_year",
      headerName: "設立",
      headerAlign: "left",
      width: 100,
      type: "number",
      align: "left",
      renderCell: (params) => {
        if (params.value !== null) {
          return params.value + "年";
        }
      },
    },
    {
      field: "capital_stock",
      headerName: "資本金",
      headerAlign: "left",
      width: 100,
      type: "number",
      align: "left",
      renderCell: (params) => {
        return convertToMyriadSystem(params.value);
      },
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
              　企業リストを作成
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
          rows={newCrporationLists}
          getRowId={(row: any) => row.corporation_id}
          columns={columns}
          localeText={localeText}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = newCrporationLists.filter((row) =>
              selectedIDs.has(row.corporation_id)
            );

            setCheckItems(selectedRows);
          }}
        />
      </div>
    </Card>
  );
};

CorporationLists.propTypes = {
  corporationLists: PropTypes.array.isRequired,
};

CorporationLists.defaultProps = {
  corporationLists: [],
};

export default CorporationLists;
