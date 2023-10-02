import React from "react";
import { Grid, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function csvImport() {
  return (
    <>
      <Grid container sx={{ my: 1 }}>
        <Grid item xs={7.5} />
        <Grid item xs={2.5}>
          <Button variant="contained">
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
