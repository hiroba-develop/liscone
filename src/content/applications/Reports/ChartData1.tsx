import {
  Card,
  CardHeader,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SalesList } from "src/models/sales_list";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import SalesListChart1 from "./SalesListChart1";

function ChartData1() {
  const auth = useRecoilValue(authAtom);
  const members = useRecoilValue(membersAtom);
  const [salesLists, setSalesLists] = useState<SalesList[]>([]);
  useEffect(() => {
    const getSalesLists = async () => {
      try {
        const response = await axios.get(`${config().apiUrl}/saleslists`);

        if (response.statusText === "OK") {
          setSalesLists(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };

    getSalesLists();
  }, []);
  //검색==========================================================================
  //멤버
  const [memberSelect, setMemberSelect] = useState(auth.userId);
  const setMemberSelectChange = (e) => {
    setMemberSelect(e.target.value);
  };

  //리스트
  const [saleListSelected, setSaleListSelected] = useState("");
  const setSaleListSelectedChange = (e) => {
    setSaleListSelected(e.target.value);
  };

  //기간
  const [minDate, setMinDate] = useState("");
  const setMinDateChange = (e) => {
    setMinDate(e.target.value);
  };
  const [maxDate, setMaxDate] = useState("");
  const setMaxDateChange = (e) => {
    setMaxDate(e.target.value);
  };

  const [donutData, setDonutData] = useState([]);
  useEffect(() => {
    const getListProceed = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/proceed`,
          {
            params: {
              member_id: memberSelect,
              sales_list_number: saleListSelected,
              created_dateFrom: minDate,
              created_dateTo: maxDate,
            },
          }
        );

        if (response.statusText === "OK") {
          console.log(response.data);
          const datas = [];

          datas.push(
            (Number(response.data.proceedCount) /
              Number(response.data.listCount)) *
              100
          );
          datas.push(
            ((Number(response.data.listCount) -
              Number(response.data.proceedCount)) /
              Number(response.data.listCount)) *
              100
          );
          setDonutData(datas);
        }
      } catch (error) {
        commonErrorCallback(error);
        alert(error.message);
      }
    };

    getListProceed();
  }, [memberSelect, saleListSelected, minDate, maxDate]);

  const [barData1, setBarData1] = useState([]);
  useEffect(() => {
    const getBR = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/salestasks/taskBR`,
          {
            params: {
              member_id: memberSelect,
              sales_list_number: saleListSelected,
              execute_dateFrom: minDate,
              execute_dateTo: maxDate,
            },
          }
        );

        if (response.statusText === "OK") {
          console.log(response.data);
          let obj: any = { name: "件数" };
          let datas = [];
          for (const key in response.data) {
            if (key === "sales_list_number") {
              continue;
            }
            datas.push(Number(response.data[key]));
          }
          obj.data = datas;
          setBarData1([obj]);
        }
      } catch (error) {
        commonErrorCallback(error);
        alert(error.message);
      }
    };

    getBR();
  }, [memberSelect, saleListSelected, minDate, maxDate]);

  const [barData2, setBarData2] = useState([]);
  useEffect(() => {
    const getSR = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/salestasks/taskSR`,
          {
            params: {
              member_id: memberSelect,
              sales_list_number: saleListSelected,
              execute_dateFrom: minDate,
              execute_dateTo: maxDate,
            },
          }
        );

        if (response.statusText === "OK") {
          console.log(response.data);
          let obj: any = { name: "件数" };
          let datas = [];
          for (const key in response.data) {
            if (key === "sales_list_number") {
              continue;
            }
            datas.push(Number(response.data[key]));
          }
          obj.data = datas;
          setBarData2([obj]);
        }
      } catch (error) {
        commonErrorCallback(error);
        alert(error.message);
      }
    };

    getSR();
  }, [memberSelect, saleListSelected, minDate, maxDate]);

  return (
    <Card>
      <CardHeader
        title={
          <Typography fontWeight="bold" sx={{ fontSize: "20px" }}>
            レポート
          </Typography>
        }
      />
      <Grid container spacing={3}>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          sm={3}
        >
          <Typography
            alignItems="center"
            sx={{
              ml: 3,
              fontSize: "20px",
            }}
          >
            ユーザー：
          </Typography>
          <TextField
            sx={{
              mr: 0,
              minWidth: "150px",
            }}
            id="members"
            defaultValue={auth.userId}
            value={memberSelect}
            select
            onChange={setMemberSelectChange}
          >
            {members.map((option) => (
              <MenuItem value={option.member_id}>{option.member_name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          sm={3}
        >
          <Typography
            alignItems="center"
            sx={{
              ml: 3,
              fontSize: "20px",
            }}
          >
            リスト名：
          </Typography>
          <TextField
            sx={{
              mr: 0,
              minWidth: "150px",
            }}
            id="listnames"
            value={saleListSelected}
            onChange={setSaleListSelectedChange}
            select
          >
            {salesLists.map((option) => (
              <MenuItem value={option.sales_list_number}>
                {option.sales_list_name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={12}
          sm={6}
        >
          <Typography sx={{ fontSize: 16, mt: 2.5, mr: 1 }}>期間：</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                pt: -2,
              }}
            >
              <DatePicker
                label=""
                format={"YYYY-MM-DD"}
                value={minDate}
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                onChange={(e) => {
                  setMinDateChange(e);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                pt: -2,
              }}
            >
              <DatePicker
                label=""
                format={"YYYY-MM-DD"}
                value={maxDate}
                slotProps={{
                  textField: {
                    error: false,
                  },
                }}
                onChange={(e) => {
                  setMaxDateChange(e);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <SalesListChart1
        donutData={donutData}
        barData1={barData1}
        barData2={barData2}
        // searchCorporateNumber={props.searchCorporateNumber}
        // searchCorporationName={props.searchCorporationName}
        // searchIndustry={props.searchIndustry}
      />
    </Card>
  );
}

export default ChartData1;
