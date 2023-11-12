import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Footer from "src/components/Footer";
import ActionHistoryListData from "../ActionHistory/ActionHistoryListData";
import SalesCorpInfo from "./SalesStaffInfo";
import StaffDetails2ListData from "./StaffDetails2ListData";
import StaffDetails2ReferenceListData from "./StaffDetails2ReferenceListData";
import { useState, useEffect } from "react";

function Lists() {
  const [staffList, setStaffList] = useState(undefined);
  const [salesList, setSalesList] = useState(undefined);
  const [salesListStatistic, setSalesListStatistic] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data[0]) {
        setStaffList(event.data[0]);
      }
      if (event.data[1]) {
        setSalesList(event.data[1]);
      }
      if (event.data[2]) {
        setSalesListStatistic(event.data[2]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      // コンポーネントがアンマウントされる際にイベントリスナーをクリーンアップ
      window.removeEventListener("message", handleMessage);
    };
  }, [staffList, salesList, salesListStatistic]);

  if (!staffList || !salesList || !salesListStatistic) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>担当者詳細②</title>
      </Helmet>
      <Typography
        sx={{
          position: "absolute",
          top: "64px",
          left: "0",
          width: "100%",
          color: "white",
          bgcolor: "#66788A",
          py: 1,
          fontSize: 20,
        }}
      >
        　{staffList.staff_staff_name}
      </Typography>
      <Box
        sx={{
          position: "absolute",
          top: "64px",
          pl: "95%",
          color: "white",
        }}
      >
        <IconButton
          onClick={() =>
            navigate("/salesTask/salesListStaffDetails", {
              state: [salesList, salesListStatistic],
            })
          }
        >
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>
      <Container maxWidth="lg">
        <SalesCorpInfo staffList={staffList} salesList={salesList} />
        <Box
          sx={{
            position: "relative",
            top: "100px",
            color: "gray",
          }}
        >
          <StaffDetails2ReferenceListData staffList={staffList} />
        </Box>
        <Box sx={{ mt: 15 }}>
          <StaffDetails2ListData staffList={staffList} />
        </Box>
        <ActionHistoryListData salesList={salesList} listDetails={staffList} />
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
