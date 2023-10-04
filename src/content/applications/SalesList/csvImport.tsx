import React from "react";
import { Grid, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as XLSX from "xlsx";

function csvImport() {
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

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `LisConneExcelFormat.xlsx`);
  };

  return (
    <>
      <Grid container sx={{ my: 1 }}>
        <Grid item xs={7.5} />
        <Grid item xs={2.5}>
          <Button variant="contained" onClick={exportToExcel}>
            <FileDownloadIcon />
            　フォーマットダウンロード
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained">
            <FileUploadIcon />
            　Excelインポート
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default csvImport;
