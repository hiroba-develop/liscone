import {
  Card,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import ListCreate from "../PopUp/ListCreate";

function Search() {
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const editListCreateOpen = () => setListCreateOpen(true);
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "150px",
          right: "2%",
          color: "white",
        }}
      >
        <Button variant="contained" onClick={editListCreateOpen}>
          行動ログを作成
        </Button>
      </Box>
      <ListCreate
        listCreateOpen={listCreateOpen}
        setListCreateOpen={setListCreateOpen}
      />
      <Card
        sx={{
          position: "absolute",
          top: "180px",
          minWidth: "1000px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={2} sx={{ my: 1, ml: 3 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              商材
            </Typography>
            <Typography sx={{ fontSize: 16, mt: 1.5 }}>商材</Typography>
          </Grid>
          <Grid item xs={2} sx={{ my: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              取引ステータス
            </Typography>
            <FormControl fullWidth size="small" sx={{ mt: 1, ml: -2 }}>
              <InputLabel>取引ステータス</InputLabel>
              <Select>
                <MenuItem value={"LostOrders"}>失注</MenuItem>
                <MenuItem value={"Contract"}>契約</MenuItem>
                <MenuItem value={"UnofficialNotice"}>内示</MenuItem>
                <MenuItem value={"SettlerAgreement"}>決済者合意</MenuItem>
                <MenuItem value={"ValidOpportunity"}>有効商談</MenuItem>
                <MenuItem value={"Appointment"}>アポ</MenuItem>
                <MenuItem value={"NoTransaction"}>取引なし</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sx={{ my: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              メモ
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={2} sx={{ my: 1, ml: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              ユーザー
            </Typography>
            <Typography sx={{ fontSize: 16, mt: 1.5 }}>大友・佐野</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Search;
