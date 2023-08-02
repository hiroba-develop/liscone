import {
  Card,
  CardHeader,
  Checkbox,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { SalesList } from "src/models/sales_list";
import { config } from "src/utility/config/AppConfig";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { membersAtom } from "src/utility/recoil/comp/Members.atom";
import SalesListChart2 from "./SalesListChart2";

function ChartData2() {
  const members = useRecoilValue(membersAtom);
  const [salesLists, setSalesLists] = useState<SalesList[]>([]);
  //검색==========================================================================
  //멤버
  const [memberSelect, setMemberSelect] = useState<string[]>([]);
  const [memberIdSelect, setMemberIdSelect] = useState([]);

  const setMemberSelectChange = (event) => {
    const names = event.target.value;

    setMemberSelect(
      // On autofill we get a stringified value.
      typeof names === "string" ? names.split(",") : names
    );
  };

  const setMemberIdSelectChange = (checked, id) => {
    if (checked) {
      setMemberIdSelect((prev) => [...prev, id]);
    } else {
      setMemberIdSelect(memberIdSelect.filter((el) => el !== id));
    }
  };
  //리스트
  const [saleListSelect, setSaleListSelect] = useState<string[]>([]);
  const [saleListNumSelect, setSaleListNumSelect] = useState([]);

  const setSaleListSelectChange = (event) => {
    const names = event.target.value;

    setSaleListSelect(
      // On autofill we get a stringified value.
      typeof names === "string" ? names.split(",") : names
    );
  };

  const setSaleListNumSelectChange = (checked, id) => {
    if (checked) {
      setSaleListNumSelect((prev) => [...prev, id]);
    } else {
      setSaleListNumSelect(saleListNumSelect.filter((el) => el !== id));
    }
  };

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

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

  const [donutData, setDonutData] = useState([]);
  useEffect(() => {
    const getListProceed = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/saleslists/proceed`,
          {
            params: {
              member_id: memberIdSelect,
              sales_list_number: saleListNumSelect,
              created_dateFrom: minDate,
              created_dateTo: maxDate,
            },
          }
        );

        if (response.statusText === "OK") {
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
  }, [memberIdSelect, saleListNumSelect, minDate, maxDate]);

  const [barData1, setBarData1] = useState([]);
  useEffect(() => {
    const getBR = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/salestasks/taskBR`,
          {
            params: {
              member_id: memberIdSelect,
              sales_list_number: saleListNumSelect,
              execute_dateFrom: minDate,
              execute_dateTo: maxDate,
            },
          }
        );

        if (response.statusText === "OK") {
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
  }, [memberIdSelect, saleListNumSelect, minDate, maxDate]);

  const [barData2, setBarData2] = useState([]);
  useEffect(() => {
    const getSR = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/salestasks/taskSR`,
          {
            params: {
              member_id: memberIdSelect,
              sales_list_number: saleListNumSelect,
              execute_dateFrom: minDate,
              execute_dateTo: maxDate,
            },
          }
        );

        if (response.statusText === "OK") {
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
  }, [memberIdSelect, saleListNumSelect, minDate, maxDate]);

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
              fontSize: 12,
              ml: 3,
            }}
          >
            ユーザー：
          </Typography>
          <Select
            sx={{
              mr: 0,
              maxWidth: "150px",
              minWidth: "150px",
            }}
            size="small"
            id="members"
            multiple
            value={memberSelect}
            onChange={setMemberSelectChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {members.map((option) => (
              <MenuItem key={option.member_id} value={option.member_name}>
                <Checkbox
                  onChange={(e) =>
                    setMemberIdSelectChange(e.target.checked, option.member_id)
                  }
                  checked={memberSelect.indexOf(option.member_name) > -1}
                />
                <ListItemText primary={option.member_name} />
              </MenuItem>
            ))}
          </Select>
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
              fontSize: 12,
            }}
          >
            リスト名：
          </Typography>
          <Select
            sx={{
              mr: 0,
              maxWidth: "150px",
              minWidth: "150px",
            }}
            size="small"
            id="listnames"
            multiple
            value={saleListSelect}
            onChange={setSaleListSelectChange}
            renderValue={(selected) => selected.join(", ")}
          >
            {salesLists.map((option) => (
              <MenuItem
                key={option.sales_list_number}
                value={option.sales_list_name}
              >
                <Checkbox
                  onChange={(e) =>
                    setSaleListNumSelectChange(
                      e.target.checked,
                      option.sales_list_number
                    )
                  }
                  checked={
                    saleListNumSelect.indexOf(option.sales_list_number) > -1
                  }
                />
                <ListItemText primary={option.sales_list_name} />
              </MenuItem>
            ))}
          </Select>
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
          <Typography sx={{ fontSize: 12, mr: 1 }}>期間：</Typography>
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
                defaultValue={minDate}
                slotProps={{
                  textField: {
                    size: "small",
                    error: false,
                  },
                }}
                onChange={(e) => {
                  setMinDate(dayjs(e).format("YYYY-MM-DD"));
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
                format={"YYYY-MM-DD"}
                defaultValue={maxDate}
                slotProps={{
                  textField: {
                    size: "small",
                    error: false,
                  },
                }}
                onChange={(e) => {
                  setMaxDate(dayjs(e).format("YYYY-MM-DD"));
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      <SalesListChart2
        donutData={donutData}
        barData1={barData1}
        barData2={barData2}
      />
    </Card>
  );
}

export default ChartData2;
