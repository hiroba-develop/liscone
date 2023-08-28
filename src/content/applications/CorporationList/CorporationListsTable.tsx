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
import { useNavigate } from "react-router-dom";
import Label from "src/components/Label";
import {
  CorporationList,
  CorporationListStatus,
} from "src/models/corporation_list";
import ListCreate from "../PopUp/ListCreate";
import { renderCellExpand } from "src/utility/renderexpand";
interface CorporationListsProps {
  className?: string;
  corporationLists: CorporationList[];
  corporationListsCount: number;
  localeTextValue: string;
  searchCorporateNumber: string;
  searchCorporationName: string;
  searchIndustry: string;
  searchPrefectures: string;
  searchRepresentativePhoneNumber: string;
  searchCorporationListStatus: string;
  searchMinSalesAmount: string;
  searchMaxSalesAmount: string;
  searchMinEmployeeNumber: string;
  searchMaxEmployeeNumber: string;
  searchMinEstablishmentYear: string;
  searchMaxEstablishmentYear: string;
  searchMinCapitalStock: string;
  searchMaxCapitalStock: string;
  searchSearchClick: number;
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
  corporationListsCount,
  localeTextValue,
  searchCorporateNumber,
  searchCorporationName,
  searchIndustry,
  searchPrefectures,
  searchRepresentativePhoneNumber,
  searchCorporationListStatus,
  searchMinSalesAmount,
  searchMaxSalesAmount,
  searchMinEmployeeNumber,
  searchMaxEmployeeNumber,
  searchMinEstablishmentYear,
  searchMaxEstablishmentYear,
  searchMinCapitalStock,
  searchMaxCapitalStock,
  searchSearchClick,
}) => {
  //Gridの中央の文章
  let localeText = {
    noRowsLabel: localeTextValue,
  };

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

  // 체크된 아이템을 담을 배열
  const navigate = useNavigate();

  const handleCorpNameEvent = (event, corporationList) => {
    navigate("/corporation/corporationDetails1", {
      state: corporationList.row,
    });
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
      renderCell: renderCellExpand,
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
          rows={corporationLists}
          getRowId={(row: any) => row.corporation_id}
          columns={columns}
          localeText={localeText}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = corporationLists.filter((row) =>
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
