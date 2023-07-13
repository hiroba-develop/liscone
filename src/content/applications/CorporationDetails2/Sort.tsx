import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import { commonErrorCallback } from "src/utility/http/ApiService";
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

  // useEffect(() => {
  //   const getSaleListInfo = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${config().apiUrl}/corporationstaffs/byCorporation`,
  //         {
  //           params: {
  //             corporationId: corporation.corporation_id,
  //           },
  //         }
  //       );

  //       if (response.statusText === "OK") {
  //         setStaffs(response.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   getSaleListInfo();
  // }, []);
  const [tranStatusSelected, setTranStatusSelected] = useState(
    corporation.transaction_status
  );

  const tranStatusChange = (e) => {
    setTranStatusSelected(e.target.value);
    const setTranStatus = async () => {
      try {
        const response = await axios.post(
          `${config().apiUrl}/saleslists/tranStatusChange`,
          {
            params: {
              transaction_status: tranStatusSelected,
              sales_list_number: salesList.sales_list_number,
              corporationId: corporation.corporation_id,
            },
          }
        );

        if (response.statusText === "OK") {
          setTranStatusSelected(e.target.value);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    setTranStatus();
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
            <FormControl fullWidth size="small" sx={{ mt: 1, ml: -2 }}>
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
