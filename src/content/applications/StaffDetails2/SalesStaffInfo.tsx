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
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { config } from "src/utility/config/AppConfig";
import { CODE } from "src/utility/constants/Code";
import { commonErrorCallback, post } from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import { productsAtom } from "src/utility/recoil/comp/Products.atom";
import axios from "axios";
import TaskLogStaffList from "../PopUp/TaskLogStaffList";

function SalesCorpInfo({ staffList, salesList }) {
  useEffect(() => {
    const getStaffs = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/corporationstaffs/id_name_bycorporation`,
          {
            params: {
              corporationId: staffList.corporation_corporation_id,
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
  }, [staffList]);

  const [taskLogOpen, setTaskLogOpen] = useState(false);
  const [tranStatusSelected, setTranStatusSelected] = useState(
    staffList.salesStaffs_transaction_status === null
      ? ""
      : staffList.salesStaffs_transaction_status
  );
  const [corpStaffList, setStaffs] = useState([]);
  const editTaskLogOpen = () => {
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
          corporation_id: staffList.corporation_corporation_id,
          staff_id: staffList.staff_staff_id,
        };
        await post<any>(
          `${config().apiUrl}/saleslists/staffTranStatusChange`,
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
          corporation_id: staffList.corporation.corporation_id,
          staff_id: staffList.staff_id,
        };
        await post<any>(`${config().apiUrl}/saleslists/staffMemoChange`, param);

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
          sx={{ my: 7, borderRadius: 0.5, backgroundColor: "#109DBC" }}
          fullWidth
          variant="contained"
          onClick={editTaskLogOpen}
        >
          行動ログを作成
        </Button>
      </Box>
      <TaskLogStaffList
        taskLogOpen={taskLogOpen}
        setTaskLogOpen={setTaskLogOpen}
        corpStaffList={corpStaffList}
        salesList={salesList}
        staffList={staffList}
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
              defaultValue={staffList.salesStaffs_memo}
              size="small"
              sx={{ mt: 1 }}
              onBlur={memoChange}
            >
              {staffList.salesStaffs_memo}
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
