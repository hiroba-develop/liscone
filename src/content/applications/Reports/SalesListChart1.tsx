import {
  Box,
  Card,
  CardHeader,
  Grid,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

function SalesListChart1() {
  const theme = useTheme();

  const barOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        columnWidth: "100%",
      },
    },
    colors: ["red", "green", "yellow", "blue", "black"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    theme: {
      mode: theme.palette.mode,
    },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },
    legend: {
      show: true,
    },
    labels: [
      "受付拒否",
      "受付突破",
      "担当者拒否",
      "担当者止まり",
      "担当者突破",
    ],
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      tickAmount: 10,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };

  const chartData = [
    {
      name: "件数",
      data: [28, 47, 41, 34, 69],
    },
  ];

  const chartOptions: ApexOptions = {
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              label: "リスト進捗",
              color: "3A3B3F",
            },
            value: {
              fontSize: "22px",
              fontFamily: "NotoSans JP Bold",
              show: true,
              color: "3A3B3F",
            },
          },
        },
      },
    },
    colors: ["#109DBC", "#E8E8E8"],
  };

  const chartSeries = [71, 29];

  return (
    <Card>
      <CardHeader
        title={
          <Typography fontWeight="bold" sx={{ fontSize: "20px" }}>
            レポート
          </Typography>
        }
        sx={{ mt: 2 }}
      />
      <Grid spacing={0} container>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={18}
          md={4}
        >
          <Box py={8} pl={1} flex={1}>
            <Chart
              height={280}
              options={chartOptions}
              series={chartSeries}
              type="donut"
            />
          </Box>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={18}
          md={4}
        >
          <Box py={8} pl={1} flex={1}>
            <Chart
              options={barOptions}
              series={chartData}
              type="bar"
              height={270}
            />
          </Box>
        </Grid>
        <Grid
          sx={{
            position: "relative",
          }}
          display="flex"
          alignItems="center"
          item
          xs={18}
          md={4}
        >
          <Box py={8} pl={1} flex={1}>
            <Chart
              options={barOptions}
              series={chartData}
              type="bar"
              height={270}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default SalesListChart1;
