import { Box, Grid, useTheme } from "@mui/material";
import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

function SalesListChart1({ donutData, barData1, barData2 }) {
  const theme = useTheme();

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
              show: true,
              label: "リスト進捗",
              color: "3A3B3F",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  if (Object.is(a, NaN)) {
                    return "データなし";
                  }
                  return a.toFixed(0) + "%";
                });
              },
            },
            value: {
              fontSize: "22px",
              fontFamily: "NotoSans JP Bold",
              show: true,
              color: "3A3B3F",
              formatter: function (val) {
                return Math.round(Number(val)) + "%";
              },
            },
          },
        },
      },
    },
    tooltip: {
      enabled: false,
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
    },
    legend: {
      show: false,
    },
    labels: ["進捗あり", "取引なし"],
    colors: ["#109DBC", "#E8E8E8"],
  };

  const bar1Options: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        borderRadius: 4,
        columnWidth: "100%",
      },
    },
    colors: ["#2E0462", "#B8E5E6", "#41B8D5", "#119DBC", "#586680"],
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

  const bar2Options: ApexOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: true,
        borderRadius: 4,
        columnWidth: "100%",
      },
    },
    colors: [
      "#2E0462",
      "#B8E5E6",
      "#41B8D5",
      "#119DBC",
      "#586680",
      "#31356E",
      "#704E85",
      "#A9709B",
    ],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 2,
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
      show: false,
    },
    labels: [
      "電話番号なし",
      "不通",
      "担当営業お断り",
      "担当者不在",
      "リモートワーク",
      "受電代行",
      "担当者に伝言",
      "お問い合わせフォーム",
      "該当者・該当部署なし",
      "担当者変更",
      "折り返し待ち",
      "サービス導入済",
      "ニーズなし",
      "本社・親会社が決定",
      "ニーズあり",
      "資料送付",
      "別の担当を紹介",
      "ウェビナー案内",
      "担当者メール送付突破",
      "日程打診",
      "アポ",
    ],
    grid: {
      strokeDashArray: 1,
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

  return (
    <Grid spacing={3} container>
      <Grid
        sx={{
          position: "relative",
        }}
        display="flex"
        alignItems="center"
        item
        xs={12}
        sm={4}
      >
        <Box py={3} pl={1} flex={1}>
          <Chart
            height={250}
            options={chartOptions}
            series={donutData}
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
        xs={12}
        sm={3}
      >
        <Box py={3} pl={1} flex={1}>
          <Chart
            options={bar1Options}
            series={barData1}
            type="bar"
            height={250}
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
        xs={12}
        sm={5}
      >
        <Box py={3} pl={1} flex={1}>
          <Chart
            options={bar2Options}
            series={barData2}
            type="bar"
            height={250}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default SalesListChart1;
