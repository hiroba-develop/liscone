import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Radio,
  Stack,
  Button,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ListCreate from "../ListCreate";

const Import = ({ importPopOpen, setImportPopOpen, importSourceData }) => {
  const [value, setValue] = useState();
  const [selectValue, setSelectValue] = useState({});
  const handleChange = (event, rowNo) => {
    setSelectValue((prevValues) => ({
      ...prevValues,
      [rowNo]: event.target.value,
    }));
  };

  const [selectCheck, setselectCheck] = useState({});
  const handleChangeCheck = (event, rowNo) => {
    setselectCheck((prevValues) => ({
      ...prevValues,
      [rowNo]: event.target.checked,
    }));
    console.log(selectCheck);
  };
  useEffect(() => {
    const newSelectCheck = {};
    importSourceData.forEach((sheetDataList) => {
      const rowNo = sheetDataList.No;
      if (sheetDataList.corporateDatas.length === 1) {
        newSelectCheck[rowNo] = true;
      }
    });
    setselectCheck((prevValues) => ({
      ...prevValues,
      ...newSelectCheck,
    }));
  }, [importSourceData]);

  const customKeys = [
    "import_corporateNumber",
    "import_corporationName",
    "import_zipCode",
    "import_address",
    "import_representativePhoneNumber",
    "import_representativeName",
    "import_homePage",
    "import_salesAmount",
    "import_employeeNumber",
    "import_establishmentYear",
    "import_capitalStock",
    "import_other",
    "selectCorporateNumber",
    "corporateCheck",
  ];
  const mergedImportDatas = importSourceData
    .map((rowData) => {
      const obj = {};
      customKeys.forEach((key) => {
        switch (key) {
          case "import_corporateNumber":
            obj[key] = rowData.corporateNumber;
            break;
          case "import_corporationName":
            obj[key] = rowData.corporationName;
            break;
          case "import_zipCode":
            obj[key] = rowData.zipCode;
            break;
          case "import_address":
            obj[key] = rowData.address;
            break;
          case "import_representativePhoneNumber":
            obj[key] = rowData.representativePhoneNumber;
            break;
          case "import_representativeName":
            obj[key] = rowData.representativeName;
            break;
          case "import_homePage":
            obj[key] = rowData.homePage;
            break;
          case "import_salesAmount":
            obj[key] = rowData.salesAmount;
            break;
          case "import_employeeNumber":
            obj[key] = rowData.employeeNumber;
            break;
          case "import_establishmentYear":
            obj[key] = rowData.establishmentYear;
            break;
          case "import_capitalStock":
            obj[key] = rowData.capitalStock;
            break;
          case "import_other":
            obj[key] = rowData.other;
            break;
          case "selectCorporateNumber":
            obj[key] = selectValue[rowData.No];
            break;
          case "corporateCheck":
            obj[key] = selectCheck[rowData.No];
            break;
        }
      });
      return obj;
    })
    .filter(
      (item) =>
        item.corporateCheck === true && item.selectCorporateNumber !== undefined
    );

  const editImportDatas = [];
  for (const importIntermediateData of mergedImportDatas) {
    // 指定の corporation_id に一致する corporateDatas を取得
    const foundCorporateDatas = importSourceData
      .map((element) => element.corporateDatas || [])
      .flat()
      .filter(
        (data) =>
          data.corporation_id === importIntermediateData.selectCorporateNumber
      );

    // プロパティを追加
    foundCorporateDatas.forEach((data) => {
      data.import_zipCode = importIntermediateData.import_zipCode;
      data.import_address = importIntermediateData.import_address;
      data.import_representativePhoneNumber =
        importIntermediateData.import_representativePhoneNumber;
      data.import_representativeName =
        importIntermediateData.import_representativeName;
      data.import_homePage = importIntermediateData.import_homePage;
      data.import_salesAmount = parseInt(
        importIntermediateData.import_salesAmount
      );
      data.import_employeeNumber = parseInt(
        importIntermediateData.import_employeeNumber
      );
      data.import_establishmentYear = parseInt(
        importIntermediateData.import_establishmentYear
      );
      data.import_capitalStock = parseInt(
        importIntermediateData.import_capitalStock
      );
      data.import_other = importIntermediateData.import_other;
    });

    // 配列に結果を追加
    editImportDatas.push(...foundCorporateDatas);
  }

  function removeCorporateNumber(data) {
    // 各オブジェクトからcorporate_numberを削除
    const result = data.map((obj) => {
      const { corporate_number, ...rest } = obj;
      return rest;
    });
    return result;
  }

  // corporate_numberを削除した結果を表示
  const editImportData = removeCorporateNumber(editImportDatas);

  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  const isChecked = mergedImportDatas.length > 0;
  const disabled = !isChecked;
  const editListCreateOpen = () => {
    setsalesListType("03");
    setListCreateOpen(true);
  };

  const [selectedSheetData] = useState<string[]>([]);
  if (importPopOpen) {
    const taskLogClose = () => setImportPopOpen(false);
    const editModal = {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 0,
      p: 20,
      minWidth: 1400,
      minHeight: 600,
      width: "auto",
    };
    const editModalTitle = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      color: "white",
      bgcolor: "#66788A",
      py: 1,
      pl: 2,
      fontSize: 20,
    };
    return (
      <>
        <ListCreate
          listCreateOpen={listCreateOpen}
          checkItems={editImportData}
          setListCreateOpen={setListCreateOpen}
          salesListType={salesListType}
        />
        <Modal open={importPopOpen} onClose={taskLogClose}>
          <Box sx={editModal}>
            <Typography sx={editModalTitle}>インポート内容を表示</Typography>
            <Box
              sx={{
                position: "absolute",
                top: "0",
                right: "0",
                textAlign: "right",
                color: "white",
              }}
            >
              <IconButton onClick={taskLogClose}>
                <CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "-5%",
                right: "1%",
              }}
            >
              <Button
                sx={{ my: 5, borderRadius: 0.5, backgroundColor: "#109DBC" }}
                fullWidth
                variant="contained"
                type="submit"
                disabled={disabled}
                onClick={() => editListCreateOpen()}
              >
                インポート確定
              </Button>
            </Box>
            <TableContainer
              sx={{
                position: "absolute",
                top: "50px",
                left: "0",
                maxHeight: "480px",
                width: "100%",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">No.</TableCell>
                    <TableCell
                      padding="checkbox"
                      sx={{ minWidth: "100px" }}
                      align="left"
                    >
                      インポート確定
                    </TableCell>
                    <TableCell sx={{ minWidth: "170px" }} align="left">
                      インポートした法人名
                    </TableCell>
                    <TableCell sx={{ minWidth: "120px" }} align="left">
                      確定チェック
                    </TableCell>
                    <TableCell align="left">候補法人名</TableCell>
                    <TableCell align="left">業種</TableCell>
                    <TableCell align="left">Webサイト</TableCell>
                    <TableCell align="left">本社住所</TableCell>
                    <TableCell align="left">代表電話番号</TableCell>
                    <TableCell align="left">法人番号</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {importSourceData.map((sheetDataList) => {
                    const rowNo = sheetDataList.No;
                    const isSheetDataListSelected = selectedSheetData.includes(
                      sheetDataList.No
                    );
                    return (
                      <TableRow key={sheetDataList.No} hover>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.No}
                          </Typography>
                        </TableCell>
                        <TableCell padding="checkbox">
                          {sheetDataList.corporateDatas.length === 1 ? (
                            <Checkbox
                              color="primary"
                              value={isSheetDataListSelected}
                              defaultChecked
                              onChange={(event) =>
                                handleChangeCheck(event, rowNo)
                              }
                            />
                          ) : (
                            <Checkbox
                              color="primary"
                              value={isSheetDataListSelected}
                              onChange={(event) =>
                                handleChangeCheck(event, rowNo)
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporationName}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={(event) => handleChange(event, rowNo)}
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => (
                                <FormControlLabel
                                  key={corporateData.corporate_number}
                                  value={corporateData.corporate_number}
                                  control={<Radio sx={{ my: -1 }} />}
                                  label=""
                                />
                              )
                            )}
                          </RadioGroup>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => {
                                if (corporateData.corporation_name) {
                                  return (
                                    <Stack sx={{ my: 0.5 }}>
                                      {corporateData.corporation_name}
                                    </Stack>
                                  );
                                } else {
                                  return <Stack sx={{ my: 0.5 }}>　</Stack>;
                                }
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => {
                                if (corporateData.business_category) {
                                  return (
                                    <Stack sx={{ my: 0.5 }}>
                                      {corporateData.business_category}
                                    </Stack>
                                  );
                                } else {
                                  return <Stack sx={{ my: 0.5 }}>　</Stack>;
                                }
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => {
                                if (corporateData.home_page) {
                                  return (
                                    <Stack sx={{ my: 0.5 }}>
                                      {corporateData.home_page}
                                    </Stack>
                                  );
                                } else {
                                  return <Stack sx={{ my: 0.5 }}>　</Stack>;
                                }
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => {
                                if (corporateData.address) {
                                  return (
                                    <Stack sx={{ my: 0.5 }}>
                                      {corporateData.address}
                                    </Stack>
                                  );
                                } else {
                                  return <Stack sx={{ my: 0.5 }}>　</Stack>;
                                }
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => {
                                if (corporateData.representative_phone_number) {
                                  return (
                                    <Stack sx={{ my: 0.5 }}>
                                      {
                                        corporateData.representative_phone_number
                                      }
                                    </Stack>
                                  );
                                } else {
                                  return <Stack sx={{ my: 0.5 }}>　</Stack>;
                                }
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                            color="text.primary"
                            gutterBottom
                            noWrap
                          >
                            {sheetDataList.corporateDatas.map(
                              (corporateData) => {
                                if (corporateData.corporate_number) {
                                  return (
                                    <Stack sx={{ my: 0.5 }}>
                                      {corporateData.corporate_number}
                                    </Stack>
                                  );
                                } else {
                                  return <Stack sx={{ my: 0.5 }}>　</Stack>;
                                }
                              }
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </>
    );
  } else {
    return null;
  }
};

export default Import;
