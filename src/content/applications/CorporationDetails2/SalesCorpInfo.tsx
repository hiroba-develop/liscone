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
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import { commonErrorCallback, post } from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import { productsAtom } from "src/utility/recoil/comp/Products.atom";
import TaskLog from "../PopUp/TaskLog";
import axios from "axios";

function SalesCorpInfo({ corporationList, salesList }) {
  const [taskLogOpen, setTaskLogOpen] = useState(false);
  const [tranStatusSelected, setTranStatusSelected] = useState(
    corporationList.transaction_status === null
      ? ""
      : corporationList.transaction_status
  );
  const [staffList, setStaffs] = useState([]);
  const editTaskLogOpen = (corporationList) => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/corporationstaffs/id_name_bycorporation`,
          {
            params: {
              corporationId: corporationList.corporation_id,
            },
          }
        );

        if (response.statusText === "OK") {
          setStaffs(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };
    getStaffs();

    setTaskLogOpen(true);
  };

  const products = useRecoilValue(productsAtom);
  const members = useRecoilValue(membersAtom);
  const getProductName = (productNum) => {
    const product = products.find((e) => e.product_number === productNum);
    return product.product_name;
  };
  const getMemberName = (memberId) => {
    const member = members.find((e) => e.member_id === memberId);
    return member.member_name;
  };

  const tranStatusChange = (e) => {
    const changedStatus = e.target.value;
    if (changedStatus === null) {
      return changedStatus;
    }
    setTranStatusSelected(changedStatus);
    const setTranStatus = async () => {
      try {
        const param = {
          transaction_status: changedStatus,
          sales_list_number: salesList.sales_list_number,
          sales_list_type: salesList.sales_list_type,
          corporation_id: corporationList.corporation_id,
        };
        await post<any>(
          `${config().apiUrl}/saleslists/corpTranStatusChange`,
          param
        );

        // if (response.statusText === "OK") {
        //   corporationList.transaction_status = tranStatusSelected;
        // }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    setTranStatus();
  };

  const memoChange = (e) => {
    const changedMemo = e.target.value;
    if (changedMemo === null) {
      return;
    }
    const updateMemo = async () => {
      try {
        const param = {
          memo: changedMemo,
          sales_list_number: salesList.sales_list_number,
          corporation_id: corporationList.corporation_id,
        };
        await post<any>(`${config().apiUrl}/saleslists/corpMemoChange`, param);

        // if (response.statusText === "OK") {
        //   corporationList.memo = response.data.;
        // }
      } catch (error) {
        commonErrorCallback(error);
      }
    };
    updateMemo();
  };
  return (
    <>
      <Box
        sx={{
          top: "150px",
          right: "1%",
          color: "white",
          ml: 100,
        }}
      >
        <Button
          sx={{ my: 5, borderRadius: 0.5, backgroundColor: "#109DBC" }}
          fullWidth
          variant="contained"
          onClick={() => editTaskLogOpen(corporationList)}
        >
          行動ログを作成
        </Button>
      </Box>
      <TaskLog
        taskLogOpen={taskLogOpen}
        setTaskLogOpen={setTaskLogOpen}
        staffList={staffList}
        corporationList={corporationList}
      />
      <Card
        sx={{
          position: "absolute",
          top: "180px",
          minWidth: "1170px",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={2} sx={{ my: 1, ml: 2 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              商材
              <Box sx={{ mt: 1.5, color: "text.secondary" }}>
                {getProductName(salesList.sales_product_number)}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={2} sx={{ my: 1, ml: 2 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              取引ステータス
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={tranStatusSelected}
                fullWidth
                sx={{ mt: 1 }}
                onChange={tranStatusChange}
              >
                {CODE.TRAN_STATUS.map((option) => (
                  <MenuItem value={option.key}>{option.code}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={5} sx={{ my: 1, ml: 2 }}>
            <Typography fontWeight="bold" sx={{ fontSize: 16, pt: 1 }}>
              メモ
            </Typography>
            <TextField
              id="memo"
              fullWidth
              defaultValue={corporationList.memo}
              size="small"
              sx={{ mt: 1 }}
              onBlur={memoChange}
            >
              {corporationList.memo}
            </TextField>
          </Grid>
          <Grid item xs={2} sx={{ my: 1, ml: 2 }}>
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

export default SalesCorpInfo;
