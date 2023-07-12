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
    "": {
      text: "未確認",
      color: "error",
    },
  };

  const { text, color }: any = map[corporationListStatus];

  return <Label color={color}>{text}</Label>;
};

const CorporationLists: FC<CorporationListsProps> = ({ corporationLists }) => {
  // 項目値から桁を取る
  function convertToNumber(amount) {
    const units = {
      万円: 10000,
      億円: 100000000,
      兆円: 1000000000000,
    };

    const unitPattern = /(\d+)\s*([万億兆]円)/;
    const match = unitPattern.exec(amount);

    if (match && match[2] && units.hasOwnProperty(match[2])) {
      const value = parseInt(match[1]);
      const unit = match[2];
      return value * units[unit];
    }

    return "";
  }
  function getStatusValue(listingStatus) {
    return listingStatus === "上場"
      ? "Y"
      : listingStatus === "未上場"
      ? "N"
      : "";
  }

  //範囲条件内か確認
  function isWithinRange(value, minValue, maxValue) {
    minValue =
      minValue !== undefined && minValue !== "" ? minValue : Number.MIN_VALUE;
    maxValue =
      maxValue !== undefined && maxValue !== "" ? maxValue : Number.MAX_VALUE;
    return value >= minValue && value <= maxValue;
  }
  // 絞り込み
  let searchCorporationLists = corporationLists.filter(
    (corporationList) =>
      corporationList.corporate_number.match(
        corporationList.searchCorporateNumber
      ) &&
      corporationList.corporation_name.match(
        corporationList.searchCorporationName
      ) &&
      corporationList.business_category.match(corporationList.searchIndustry) &&
      corporationList.address.match(corporationList.searchPrefectures) &&
      corporationList.representative_phone_number.match(
        corporationList.searchRepresentativePhoneNumber
      ) &&
      corporationList.listing_status.match(
        getStatusValue(corporationList.searchCorporationListStatus)
      ) &&
      isWithinRange(
        corporationList.sales_amount,
        convertToNumber(corporationList.searchMinSalesAmount),
        convertToNumber(corporationList.searchMaxSalesAmount)
      ) &&
      isWithinRange(
        corporationList.employee_number,
        corporationList.searchMinEmployeeNumber,
        corporationList.searchMaxEmployeeNumber
      ) &&
      isWithinRange(
        corporationList.establishment_year,
        corporationList.searchMinEstablishmentYear,
        corporationList.searchMaxEstablishmentYear
      ) &&
      isWithinRange(
        corporationList.capital_stock,
        convertToNumber(corporationList.searchMinCapitalStock),
        convertToNumber(corporationList.searchMaxCapitalStock)
      )
  );
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
      width: 100,
      maxWidth: 200,
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
      width: 100,
      type: "number",
      renderCell: (params) => {
        return convertToMyriadSystem(params.value);
      },
    },
    {
      field: "employee_number",
      headerName: "従業員数",
      width: 100,
      type: "number",
      renderCell: (params) => {
        return params.value + "名";
      },
    },
    {
      field: "establishment_year",
      headerName: "設立",
      width: 100,
      type: "number",
      renderCell: (params) => {
        return params.value + "年";
      },
    },
    {
      field: "capital_stock",
      headerName: "資本金",
      width: 100,
      type: "number",
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

      <Box sx={{ height: 365, maxWidth: 2000 }}>
        <DataGrid
          sx={{
            border: 0,
            borderRadius: 0,
          }}
          rows={searchCorporationLists}
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
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = searchCorporationLists.filter((row) =>
              selectedIDs.has(row.corporation_id)
            );

            setCheckItems(selectedRows);
          }}
        />
      </Box>
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
