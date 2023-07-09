import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import { post } from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import { productsAtom } from "src/utility/recoil/comp/Products.atom";

function Sort({ corporation, salesList }) {
  const products = useRecoilValue(productsAtom);
  const members = useRecoilValue(membersAtom);
  const [listCreateOpen, setListCreateOpen] = useState(false);
  const editListCreateOpen = () => setListCreateOpen(true);
  // const [salesListInfo, setStaffs] = useState();
  // const [salesListInfo, setStaffs] = useState();
  const getProductName = (productNum) => {
    const product = products.find((e) => e.product_number === productNum);
    return product.product_name;
  };
  const getMemberName = (memberId) => {
    const member = members.find((e) => e.member_id === memberId);
    return member.member_name;
  };

  const [tranStatusSelected, setTranStatusSelected] = useState(
    corporation.transaction_status
  );
  const [memo, setMemo] = useState(corporation.memo);

  const tranStatusChange = (e) => {
    if (tranStatusSelected === null || tranStatusSelected === "") {
      return tranStatusSelected;
    }
    setTranStatusSelected(e.target.value);
    const setTranStatus = async () => {
      try {
        const param = {
          transaction_status: tranStatusSelected,
          sales_list_number: salesList.sales_list_number,
          corporation_id: corporation.corporation_id,
        };
        const response = await post<any>(
          `${config().apiUrl}/saleslists/tranStatusChange`,
          param
        );

        if (response.statusText === "OK") {
          corporation.transaction_status = tranStatusSelected;
        }
      } catch (error) {
        console.error(error);
      }
    };

    setTranStatus();
  };
  const memoChange = (e) => {
    if (memo === null || memo === "") {
      return memo;
    }
    setMemo(e.target.value);
    const updateMemo = async () => {
      try {
        const param = {
          memo: memo,
          sales_list_number: salesList.sales_list_number,
          corporation_id: corporation.corporation_id,
        };
        const response = await post<any>(
          `${config().apiUrl}/saleslists/memoChange`,
          param
        );

        if (response.statusText === "OK") {
          corporation.memo = memo;
        }
      } catch (error) {
        console.error(error);
      }
    };
    updateMemo();
  };
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
      {/* <ListCreate
        listCreateOpen={listCreateOpen}
        setListCreateOpen={setListCreateOpen}
      /> */}
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
              <Box sx={{ mt: 1.5, color: "text.secondary" }}>
                {getProductName(salesList.sales_product_number)}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ my: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              取引ステータス
            </Typography>
            <FormControl fullWidth size="small" sx={{ width: 20, ml: -5 }}>
              <Select
                value={tranStatusSelected}
                style={{ width: 200, marginTop: 10 }}
                onChange={tranStatusChange}
              >
                {CODE.TRAN_STATUS.map((option) => (
                  <MenuItem value={option.key}>{option.code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sx={{ my: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              メモ
            </Typography>
            <OutlinedInput
              fullWidth
              size="small"
              sx={{ mt: 1 }}
              onChange={memoChange}
            />
          </Grid>
          <Grid item xs={2} sx={{ my: 1, ml: 1 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              ユーザー
              <Box sx={{ mt: 1.5, color: "text.secondary" }}>
                {getMemberName(salesList.memberEntity.member_id)}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Sort;
