import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { commonErrorCallback } from "src/utility/http/ApiService";
import { config } from "src/utility/config/AppConfig";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";

// 型定義
interface SendLog {
  form_list_log_no: number;
  form_list_no: number;
  corporation_name: string;
  corporation_id: string;
  corporation_url: string;
  send_status: string;
  created_by: string;
  modified_by: string;
  created: string;
  modified: string;
}

interface SendStatusCount {
  name: string;
  value: number;
  color: string;
}

export default function Component() {
  const [autoFormSendList, setAutoFormSendList] = useState<any[]>([]);
  const authUser = useRecoilValue(authAtom);
  useEffect(() => {
    const getAutoFormSendList = async () => {
      try {
        const response = await axios.get(
          `${config().apiUrl}/autoFormSend/autoFormSendList`,
          {
            params: {
              companyCode: authUser.coId,
            },
          }
        );
        if (response.statusText === "OK") {
          setAutoFormSendList(response.data);
        }
      } catch (error) {
        commonErrorCallback(error);
      }
    };
    getAutoFormSendList();
  }, [authUser.userId]);

  // 日付を yyyy/mm/dd 形式にフォーマットするヘルパー関数
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため +1
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  // send_status をテキストに変換するヘルパー関数
  const getSendStatusText = (status: string): string => {
    const num = parseInt(status, 10);
    if (num === -1) return "未送信";
    if (num === 0) return "送信成功";
    if (num === 1) return "フォーム検出エラー";
    if (num === 2) return "送信ボタンエラー";
    if (num === 3) return "入力項目エラー";
    if (num === 4) return "送信成功(送信完了画面が確認できませんでした。)";
    if (num === 5) return "不明なエラー";
    return "未知のステータス"; // 未定義のステータス
  };

  // send_status のカテゴリーごとの個数をカウントし、指定された形式の配列を返すヘルパー関数
  const countSendStatus = (SendLogs: SendLog[]): SendStatusCount[] => {
    let 未送信 = 0; // send_status === -1
    let 送信失敗 = 0; // send_status 1〜
    let 送信成功 = 0; // send_status === 0

    SendLogs.forEach((SendLog) => {
      const num = parseInt(SendLog.send_status, 10);
      if (num === -1) 未送信 += 1;
      else if (num === 0 || num === 4) 送信成功 += 1;
      else if (num === 1 || num === 2|| num === 3|| num === 5) 送信失敗 += 1;
    });

    return [
      { name: "未送信", value: 未送信, color: "#06b6d4" },
      { name: "送信失敗", value: 送信失敗, color: "#22d3ee" },
      { name: "送信成功", value: 送信成功, color: "#67e8f9" },
    ];
  };

  // BarChart用にデータを整形するヘルパー関数
  const prepareChartData = (counts: SendStatusCount[]): any[] => {
    return [
      {
        name: "送信ステータス",
        未送信: counts.find((item) => item.name === "未送信")?.value || 0,
        送信失敗: counts.find((item) => item.name === "送信失敗")?.value || 0,
        送信成功: counts.find((item) => item.name === "送信成功")?.value || 0,
      },
    ];
  };

  // 配列のオブジェクトをCSV形式の文字列に変換するヘルパー関数
  const convertToCSV = (data: SendLog[]): string => {
    if (data.length === 0) return "";
    // 必要なフィールドのみ抽出し、send_status を整形
    const filteredData = data.map((log) => ({
      送信先会社名: log.corporation_name,
      送信先法人番号: log.corporation_id,
      送信先会社URL: log.corporation_url,
      送信状況: getSendStatusText(log.send_status),
    }));
    const headers = Object.keys(filteredData[0]).join(",") + "\n";
    const rows = filteredData
      .map((log) =>
        Object.values(log)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`) // 値をクォートし、内部のクォートをエスケープ
          .join(",")
      )
      .join("\n");

    // BOMを追加してExcelでの文字化けを防止
    const bom = "\uFEFF";
    return bom + headers + rows;
  };
  // CSVをダウンロードするためのヘルパー関数
  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWebpage = (event, params) => {
    window.open(params, "_blank");
  };
  return (
    <>
      {autoFormSendList.map((formList) => {
        // send_status のカウントを取得
        const counts = countSendStatus(formList.autoFormSendLogs);
        const total = counts.reduce((sum, item) => sum + item.value, 0);
        // CSVダウンロードハンドラー
        const handleDownloadCSV = () => {
          const csv = convertToCSV(formList.autoFormSendLogs);
          const filename = `${formList.form_list_name}_send_logs.csv`;
          downloadCSV(csv, filename);
        };

        return (
          <>
            <Grid style={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "80%", mt: 4 }} key={formList.form_list_no}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      {formList.form_list_name}
                    </Typography>
                  }
                  action={
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(formList.created)}
                    </Typography>
                  }
                />
                <CardContent>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ height: "4rem" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={prepareChartData(counts)}
                          layout="vertical"
                          stackOffset="expand"
                        >
                          <XAxis type="number" hide />
                          <YAxis type="category" hide dataKey="name" />
                          {counts.map((item) => (
                            <Bar
                              key={item.name}
                              dataKey={item.name}
                              stackId="a"
                              fill={item.color}
                            />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "left",
                        justifyContent: "flex-end",
                        fontSize: "0.75rem",
                        color: "rgba(0, 0, 0, 0.6)",
                      }}
                    >
                      {counts.map((item, index) => (
                        <div
                          key={index}
                          style={{ display: "flex", marginRight: "0.25rem" }}
                        >
                          <div
                            style={{
                              width: "0.75rem",
                              height: "0.75rem",
                              marginRight: "0.25rem",
                              marginTop: "0.25rem",
                              borderRadius: "50%",
                              backgroundColor: item.color,
                            }}
                          ></div>
                          <span>
                            {item.name}: {item.value}件 (
                            {((item.value / total) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      ))}
                    </div>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        送信内容
                      </AccordionSummary>
                      <AccordionDetails>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>送信先会社名</TableCell>
                              <TableCell>送信先法人番号</TableCell>
                              <TableCell>送信先会社URL</TableCell>
                              <TableCell>送信状況</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {formList.autoFormSendLogs.map((log) => (
                              <TableRow key={log.form_list_log_no}>
                                <TableCell>{log.corporation_name}</TableCell>
                                <TableCell>{log.corporation_id}</TableCell>
                                <TableCell
                                  sx={{
                                    textDecoration: "underline",
                                  }}
                                  onClick={(event) => {
                                    handleWebpage(event, log.corporation_url);
                                  }}
                                >
                                  {log.corporation_url}
                                </TableCell>
                                <TableCell>
                                  {getSendStatusText(log.send_status)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                    <div>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#06b6d4",
                        }}
                        onClick={handleDownloadCSV}
                      >
                        レポートダウンロード
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </>
        );
      })}
    </>
  );
}
