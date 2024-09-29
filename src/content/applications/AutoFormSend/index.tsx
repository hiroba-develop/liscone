import { useState, useRef } from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
  Box,
  Container,
  Grid,
  TextField,
  Stack,
  Card,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import axios from "axios";
import { config } from "src/utility/config/AppConfig";
import { useRecoilValue } from "recoil";
import { authAtom } from "src/utility/recoil/auth/Auth.atom";

function Lists() {
  //フォーム送信開始
  const authUser = useRecoilValue(authAtom);
  const formSendClick = () => {
    if (window.confirm("入力内容・CSVファイルに間違いはありませんか？")) {
      // 「はい」を選択した場合の処理
      const inquiryData = InquiryDataObject();
      handleRunSelenium(inquiryData);
    }
  };
  const handleRunSelenium = async (inquiryData) => {
    try {
      const res = await axios.post(`${config().apiUrl}/autoFormSend/form`, {
        csvData,
        inquiryData,
        authUser,
      });
    } catch (error) {
      console.error("Error calling the contant", error);
    }
    alert("フォーム送信を行いました");
  };
  // csvダウンロード
  function downloadCSV() {
    // ヘッダー行定義
    const headers = ["法人番号", "法人名", "法人URL"];
    // ヘッダー行を追加
    const csvString = headers.join(",");
    // CSVをダウンロード
    const fileName = `送信先リスト_テンプレート.csv`;
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csvString], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const csv = document.createElement("a");
    csv.href = url;
    csv.download = fileName;
    csv.click();
    URL.revokeObjectURL(url);
  }

  // csvアップロード
  //関数定義
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  //input要素をクリックさせる
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  //ファイルアップロード
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        parseCSV(text);
      };
      reader.readAsText(file);
    }
  };
  //ファイル内の解析、配列に格納
  const parseCSV = (data) => {
    // 改行ごとに分割し、空の行をフィルタリングして行ごとの配列を作成
    const rows = data
      .split("\n")
      .map((row) => row.trim()) // 各行の前後の空白をトリム
      .filter((row) => row.length > 0); // 空行を削除
    const parsedData = rows.map((row) => row.split(","));
    // 空白行を削除するフィルター処理
    const filteredRows = parsedData.filter((row) => {
      // 各セルが空でないかを確認する（トリムして空白除去）
      return row.some((cell) => cell.trim() !== "");
    });
    setCsvData(filteredRows);
  };
  // ヘッダーと件数を取得
  const dataCount = csvData.length > 1 ? csvData.length - 1 : 0; // データ行数を取得（ヘッダーを除く）

  // フォームの入力情報を一つのオブジェクトにまとめる関数
  const InquiryDataObject = () => {
    return {
      taskName, // タスク名
      lastName, // 姓
      firstName, // 名
      lastNameHiragana, // せい（ひらがな）
      firstNameHiragana, // めい（ひらがな）
      lastNameKatakana, // セイ（カタカナ）
      firstNameKatakana, // メイ（カタカナ）
      corporateName, // 会社名
      jobPosition, // 役職
      department, // 部署
      emailAddress, // メールアドレス
      phoneNumber, // 電話番号
      fax, // FAX
      postalCode, // 郵便番号
      prefecture, // 都道府県
      city, // 市区町村
      streetAddress, // 町域・番地
      buildingName, // 建物名など
      industryType, // 業種
      myCorporateURL, // 自社HPのURL
      employeeSize, // 従業員規模
      inquirySubject, // お問い合わせ件名
      inquiryBody, // お問い合わせ本文
    };
  };

  // タスク名取得
  const [taskName, setTaskName] = useState("");
  const taskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  // 姓（姓）
  const [lastName, setLastName] = useState("");
  const lastNameChange = (event) => {
    setLastName(event.target.value);
  };

  // 名（名）
  const [firstName, setFirstName] = useState("");
  const firstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  // せい（姓のひらがなのふりがな）
  const [lastNameHiragana, setLastNameHiragana] = useState("");
  const lastNameHiraganaChange = (event) => {
    setLastNameHiragana(event.target.value);
  };

  // めい（名のひらがなのふりがな）
  const [firstNameHiragana, setFirstNameHiragana] = useState("");
  const firstNameHiraganaChange = (event) => {
    setFirstNameHiragana(event.target.value);
  };

  // セイ（姓のカタカナのふりがな）
  const [lastNameKatakana, setLastNameKatakana] = useState("");
  const lastNameKatakanaChange = (event) => {
    setLastNameKatakana(event.target.value);
  };

  // メイ（名のカタカナのふりがな）
  const [firstNameKatakana, setFirstNameKatakana] = useState("");
  const firstNameKatakanaChange = (event) => {
    setFirstNameKatakana(event.target.value);
  };

  // 会社名
  const [corporateName, setCorporateName] = useState("");
  const corporateNameChange = (event) => {
    setCorporateName(event.target.value);
  };

  // 役職
  const [jobPosition, setJobPosition] = useState("");
  const jobPositionChange = (event) => {
    setJobPosition(event.target.innerText);
  };

  // 部署
  const [department, setDepartment] = useState("");
  const departmentChange = (event) => {
    setDepartment(event.target.innerText);
  };

  // メールアドレス
  const [emailAddress, setEmailAddress] = useState("");
  const emailAddressChange = (event) => {
    setEmailAddress(event.target.value);
  };

  // 電話番号
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  // FAX
  const [fax, setFax] = useState("");
  const faxChange = (event) => {
    setFax(event.target.value);
  };

  // 郵便番号
  const [postalCode, setPostalCode] = useState("");
  const postalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  // 都道府県
  const [prefecture, setPrefecture] = useState("");
  const prefectureChange = (event) => {
    setPrefecture(event.target.innerText);
  };

  // 市区町村
  const [city, setCity] = useState("");
  const cityChange = (event) => {
    setCity(event.target.value);
  };

  // 町域・番地
  const [streetAddress, setStreetAddress] = useState("");
  const streetAddressChange = (event) => {
    setStreetAddress(event.target.value);
  };

  // 建物名など
  const [buildingName, setBuildingName] = useState("");
  const buildingNameChange = (event) => {
    setBuildingName(event.target.value);
  };

  // 業種
  const [industryType, setIndustryType] = useState("");
  const industryTypeChange = (event) => {
    setIndustryType(event.target.innerText);
  };

  // 自社HPのURL
  const [myCorporateURL, setMyCorporateURL] = useState("");
  const myCorporateURLChange = (event) => {
    setMyCorporateURL(event.target.value);
  };

  // 従業員規模
  const [employeeSize, setEmployeeSize] = useState("");
  const employeeSizeChange = (event) => {
    setEmployeeSize(event.target.innerText);
  };

  // お問い合わせ件名
  const [inquirySubject, setInquirySubject] = useState("");
  const inquirySubjectChange = (event) => {
    setInquirySubject(event.target.value);
  };

  // お問い合わせ本文
  const [inquiryBody, setInquiryBody] = useState("");
  const inquiryBodyChange = (event) => {
    setInquiryBody(event.target.value);
  };

  // 業種ラベル
  const industryTypeOptions = [
    { label: "農林・水産" },
    { label: "鉱業" },
    { label: "建設" },
    { label: "製造" },
    { label: "出版・印刷" },
    { label: "医療・介護" },
    { label: "電気・ガス" },
    { label: "運輸・通信" },
    { label: "卸売・小売" },
    { label: "飲食・宿泊" },
    { label: "金融・保険業" },
    { label: "不動産" },
    { label: "サービス" },
    { label: "IT・広告" },
    { label: "コンサル・会計・法務関連" },
    { label: "人材・教育" },
    { label: "官公庁・団体" },
    { label: "その他" },
  ];

  // 役職ラベル
  const jobPositionOptions = [
    { label: "経営者" },
    { label: "役員" },
    { label: "部長" },
    { label: "課長" },
    { label: "一般" },
  ];

  // 部署ラベル
  const departmentOptions = [
    { label: "営業" },
    { label: "マーケティング" },
    { label: "広報" },
    { label: "人事,労務" },
    { label: "総務" },
    { label: "経理" },
    { label: "経営企画" },
    { label: "CS" },
    { label: "開発" },
  ];

  // 従業員規模ラベル
  const employeeSizeOptions = [
    { label: "1~10" },
    { label: "10~30" },
    { label: "30~50" },
    { label: "50~100" },
    { label: "100~300" },
    { label: "300~500" },
    { label: "500~1000" },
    { label: "1000~" },
  ];

  // 都道府県ラベル
  const prefecturesOptions = [
    { label: "北海道" },
    { label: "青森" },
    { label: "岩手" },
    { label: "宮城" },
    { label: "秋田" },
    { label: "山形" },
    { label: "福島" },
    { label: "茨城" },
    { label: "栃木" },
    { label: "群馬" },
    { label: "埼玉" },
    { label: "千葉" },
    { label: "東京" },
    { label: "神奈川" },
    { label: "新潟" },
    { label: "富山" },
    { label: "石川" },
    { label: "福井" },
    { label: "山梨" },
    { label: "長野" },
    { label: "岐阜" },
    { label: "静岡" },
    { label: "愛知" },
    { label: "三重" },
    { label: "滋賀" },
    { label: "京都" },
    { label: "大阪" },
    { label: "兵庫" },
    { label: "奈良" },
    { label: "和歌山" },
    { label: "鳥取" },
    { label: "島根" },
    { label: "岡山" },
    { label: "広島" },
    { label: "山口" },
    { label: "徳島" },
    { label: "香川" },
    { label: "愛媛" },
    { label: "高知" },
    { label: "福岡" },
    { label: "佐賀" },
    { label: "長崎" },
    { label: "熊本" },
    { label: "大分" },
    { label: "宮崎" },
    { label: "鹿児島" },
    { label: "沖縄" },
  ];

  return (
    <>
      <Helmet>
        <title>自動フォーム送信</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid>
          <TextField
            label="タスク名"
            onChange={taskNameChange}
            sx={{ mt: 3, pb: 1.5 }}
            style={{ width: "60%" }}
          />
        </Grid>
        <Card>
          <Stack sx={{ m: 1 }} direction="row">
            <ManageSearchIcon />
            <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
              フォーム送信内容
            </Typography>
          </Stack>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                label="姓"
                onChange={lastNameChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="名"
                onChange={firstNameChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="せい(かな)"
                onChange={lastNameHiraganaChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="めい(かな)"
                onChange={firstNameHiraganaChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="セイ(カナ)"
                onChange={lastNameKatakanaChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="メイ(カナ)"
                onChange={firstNameKatakanaChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="会社名"
                onChange={corporateNameChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="メールアドレス"
                onChange={emailAddressChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                options={jobPositionOptions}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
                renderInput={(params) => <TextField {...params} label="役職" />}
                onChange={jobPositionChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                options={departmentOptions}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
                renderInput={(params) => <TextField {...params} label="部署" />}
                onChange={departmentChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="電話番号(-は不要)"
                onChange={phoneNumberChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="FAX(-は不要)"
                onChange={faxChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="郵便番号(-は不要)"
                onChange={postalCodeChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                options={prefecturesOptions}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
                renderInput={(params) => (
                  <TextField {...params} label="都道府県" />
                )}
                onChange={prefectureChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="市区町村"
                onChange={cityChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="町域・番地"
                onChange={streetAddressChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="建物名など"
                onChange={buildingNameChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                options={industryTypeOptions}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
                renderInput={(params) => <TextField {...params} label="業種" />}
                onChange={industryTypeChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="自社HPのURL"
                onChange={myCorporateURLChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                disablePortal
                options={employeeSizeOptions}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
                renderInput={(params) => (
                  <TextField {...params} label="従業員規模" />
                )}
                onChange={employeeSizeChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack sx={{ m: 1 }} direction="row">
                <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
                  フォーム送信内容
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <TextField
                label="件名"
                onChange={inquirySubjectChange}
                size="small"
                sx={{ mt: 1 }}
                style={{ width: "90%" }}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <TextField
                label="本文"
                onChange={inquiryBodyChange}
                size="small"
                sx={{ m: 1, pb: 1 }}
                style={{ width: "90%" }}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Card>
        <Box sx={{ mt: 3 }}>
          <Card>
            <Stack sx={{ m: 1 }} direction="row">
              <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
                送信先リスト
              </Typography>
              <div style={{ flexGrow: 1 }}></div>
              <Button
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "#109DBC",
                  m: 1,
                }}
                variant="contained"
                onClick={downloadCSV}
              >
                CSVダウンロードはこちらから
              </Button>
            </Stack>
            <Stack sx={{ m: 1 }} direction="row">
              <Button
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "#109DBC",
                  ml: 10,
                  my: 2,
                }}
                variant="contained"
                onClick={handleButtonClick}
              >
                CSVアップロード
              </Button>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }} // 入力要素を非表示にする
                onChange={handleFileUpload}
              />
              <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 5, mt: 3 }}>
                ファイル名: {fileName}
              </Typography>
              <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 5, mt: 3 }}>
                データ件数: {dataCount}件
              </Typography>
            </Stack>
            <Stack sx={{ m: 1 }} direction="row">
              <div style={{ flexGrow: 1 }}></div>
              <Button
                sx={{
                  borderRadius: 0.5,
                  backgroundColor: "#109DBC",
                  ml: 10,
                }}
                variant="contained"
                onClick={formSendClick}
              >
                送信開始
              </Button>
            </Stack>
          </Card>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Lists;
