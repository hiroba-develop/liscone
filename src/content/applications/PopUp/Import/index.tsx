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
import React, { useState } from "react";
import ListCreate from "../ListCreate";

const Import = ({ importPopOpen, setImportPopOpen, importSourceData }) => {
  const [value, setValue] = useState();
  const [selectValue, setSelectValue] = useState({});
  const handleChange = (event, rowNo) => {
    setSelectValue((prevValues) => ({
      ...prevValues,
      [rowNo]: event.target.value,
    }));
    setValue(event.target.value);
  };
  const [selectCheck, setselectCheck] = useState({});
  const handleChangeCheck = (event, rowNo) => {
    setselectCheck((prevValues) => ({
      ...prevValues,
      [rowNo]: event.target.checked,
    }));
  };

  const customKeys = ["rowNo", "corporateNumber", "corporateCheck", "other"];
  const importIntermediateDatas = importSourceData
    .map((rowData) => {
      const obj = {};
      for (let i = 0; i < customKeys.length; i++) {
        const key = customKeys[i];
        if (key === "rowNo") {
          obj[key] = rowData.No;
        }
        if (key === "corporateNumber") {
          obj[key] = selectValue[rowData.No];
        }
        if (key === "corporateCheck") {
          obj[key] = selectCheck[rowData.No];
        }
        if (key === "other") {
          obj[key] = rowData.other;
        }
      }
      return obj;
    })
    .filter(
      (item) =>
        item.corporateCheck === true && item.corporateNumber !== undefined
    );

  const editImportDatas = [];
  for (const importIntermediateData of importIntermediateDatas) {
    const corporateNumber = importIntermediateData.corporateNumber;
    const memo = importIntermediateData.other;

    // 指定の corporation_id に一致する corporateDatas を取得
    const foundCorporateDatas = importSourceData
      .map((element) => element.corporateDatas || [])
      .flat()
      .filter((data) => data.corporation_id === corporateNumber);

    // memo プロパティを追加
    foundCorporateDatas.forEach((data) => {
      data.memo = memo;
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
  console.log(editImportData);

  const [listCreateOpen, setListCreateOpen] = useState(false);
  const [salesListType, setsalesListType] = useState("");

  const isChecked = importIntermediateDatas.length > 0;
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
      minHeight: 800,
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
                maxHeight: "700px",
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
                          <Checkbox
                            color="primary"
                            value={isSheetDataListSelected}
                            onChange={(event) =>
                              handleChangeCheck(event, rowNo)
                            }
                          />
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
                              (corporateData) => {
                                return (
                                  <Stack>
                                    <FormControlLabel
                                      value={corporateData.corporate_number}
                                      control={<Radio sx={{ my: -0.3 }} />}
                                      label=""
                                    />
                                  </Stack>
                                );
                              }
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
                                return (
                                  <Stack sx={{ my: 2 }}>
                                    {corporateData.corporation_name}
                                  </Stack>
                                );
                              }
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {sheetDataList.corporateDatas.map((corporateData) => {
                            return (
                              <Typography
                                variant="body1"
                                fontWeight="bold"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                <Stack sx={{ my: 1.8 }}>
                                  {corporateData.business_category}
                                </Stack>
                              </Typography>
                            );
                          })}
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
                                return (
                                  <Stack sx={{ my: 1.8 }}>
                                    {corporateData.home_page}
                                  </Stack>
                                );
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
                                return (
                                  <Stack sx={{ my: 1.8 }}>
                                    {corporateData.address}
                                  </Stack>
                                );
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
                                return (
                                  <Stack sx={{ my: 1.8 }}>
                                    {corporateData.representative_phone_number}
                                  </Stack>
                                );
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
                                return (
                                  <Stack sx={{ my: 1.8 }}>
                                    {corporateData.corporate_number}
                                  </Stack>
                                );
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
