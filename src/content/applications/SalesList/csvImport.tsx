import React, { useState } from "react";
import { Grid, Button, Input } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as XLSX from "xlsx";
import Import from "../PopUp/Import/ListData";

function CsvImport() {
  const [importPopOpen, setImportPopOpen] = useState(false);
  const data = [
    {
      法人番号: "",
      会社名: "",
      郵便番号: "",
      本社住所: "",
      代表者電話番号: "",
      代表者名: "",
      Webサイト: "",
      売上: "",
      従業員数: "",
      設立: "",
      資本金: "",
      その他: "",
    },
  ];
  const [sheetDatas, setSheetDatas] = useState([]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `company_list_format.xlsx`);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // ワークブックのシートを取得
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // シートのデータを配列に変換
      const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // ここでデータの加工などの処理を行います
      setSheetDatas(sheetData);
      setImportPopOpen(true);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <Import
        importPopOpen={importPopOpen}
        setImportPopOpen={setImportPopOpen}
        sheetDatas={sheetDatas}
      />
      <Grid container sx={{ my: 1 }}>
        <Grid item xs={7} />
        <Grid item xs={3}>
          <Button variant="contained" onClick={exportToExcel}>
            <FileDownloadIcon />
            　フォーマットダウンロード
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" component="label">
            <FileUploadIcon />
            　Excelインポート
            <Input
              type="file"
              inputProps={{ accept: ".xlsx" }}
              onChange={handleFileChange}
              sx={{ display: "none" }}
            />
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CsvImport;
