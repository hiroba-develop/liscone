import React, { useState } from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const businessCategory = [
  { label: "SP代理店" },
  { label: "アウトソーシング・オフショアリングコンサルティング" },
  { label: "その他" },
  { label: "求人サイト・求人メディア" },
  { label: "広告代理店" },
  { label: "商品取引" },
  { label: "人材サービス・アウトソーシング" },
  { label: "サービス" },
  { label: "警備・清掃" },
  { label: "財団法人・社団法人・宗教法人" },
  { label: "医療・福祉関連" },
  { label: "医療系卸" },
  { label: "調剤薬局・ドラッグストア" },
  { label: "病院・大学病院" },
  { label: "福祉・介護" },
  { label: "運輸・倉庫" },
  { label: "海洋輸送" },
  { label: "航空・航行" },
  { label: "自動車・輸送機器メーカー" },
  { label: "自動車・輸送機器商社" },
  { label: "鉄道" },
  { label: "アパレル・ファッション" },
  { label: "インテリア" },
  { label: "コンビニエンスストア・スーパー" },
  { label: "スポーツ用品" },
  { label: "その他商社" },
  { label: "ドラッグストア・調剤薬局" },
  { label: "ホームセンター・DIY" },
  { label: "医薬品・化粧品・バイオ" },
  { label: "医療機器" },
  { label: "卸売・輸出入" },
  { label: "音楽・書籍" },
  { label: "化学・石油" },
  { label: "家電・AV機器" },
  { label: "家電・AV機器・コンピュータ" },
  { label: "貨物・パッケージ輸送" },
  { label: "機械関連" },
  { label: "呉服・寝装品" },
  { label: "国際貿易・開発" },
  { label: "紙・パルプ" },
  { label: "自動車" },
  { label: "住宅・建材・エクステリア" },
  { label: "重電・産業用電気機器" },
  { label: "小売" },
  { label: "消費者向けサービス" },
  { label: "食料品" },
  { label: "精密機器・計測機器" },
  { label: "石油製品" },
  { label: "専門店" },
  { label: "専門店・その他小売" },
  { label: "総合商社" },
  { label: "通信販売・ネット販売" },
  { label: "鉄鋼・金属" },
  { label: "半導体" },
  { label: "百貨店" },
  { label: "CRO" },
  { label: "シンクタンク" },
  { label: "その他専門コンサル" },
  { label: "バイオテクノロジー・ナノテク" },
  { label: "マーケティング・リサーチ" },
  { label: "リスクコンサルティング" },
  { label: "印刷" },
  { label: "会計事務所" },
  { label: "監査法人" },
  { label: "機械・産業工学" },
  { label: "経営・戦略コンサルティング" },
  { label: "公共関係・コミュニケーションサービス" },
  { label: "広告・デザイン・イベント" },
  { label: "財務・会計アドバイザリー" },
  { label: "産業・エネルギー" },
  { label: "司法書士事務所・行政書士事務所" },
  { label: "職業紹介・人材派遣" },
  { label: "税理士法人" },
  { label: "組織人事コンサルティング" },
  { label: "総合コンサルティング" },
  { label: "大学・研究施設" },
  { label: "特許事務所・弁理士事務所" },
  { label: "法律サービス" },
  { label: "法律事務所" },
  { label: "技術系アウトソーシング" },
  { label: "農林水産・鉱業" },
  { label: "教育" },
  { label: "教育管理" },
  { label: "教育行政プログラム" },
  { label: "研修" },
  { label: "公社・官公庁・学校・研究施設" },
  { label: "その他・各種スクール" },
  { label: "学習塾・予備校・専門学校" },
  { label: "クレジット・信販" },
  { label: "その他金融" },
  { label: "ベンチャーキャピタル・プライベートエクイティ・株主" },
  { label: "金融" },
  { label: "金融情報" },
  { label: "銀行" },
  { label: "個人・家族向けサービス" },
  { label: "消費者金融" },
  { label: "証券・投資銀行" },
  { label: "信託" },
  { label: "生命保険" },
  { label: "損害保険" },
  { label: "投資管理" },
  { label: "投資信託・投資顧問" },
  { label: "保険" },
  { label: "リース" },
  { label: "債権回収" },
  { label: "住宅ローン" },
  { label: "商品先物取引" },
  { label: "信用金庫・信用組合・労働金庫" },
  { label: "保険代理店" },
  { label: "サブコン" },
  { label: "建築・都市計画" },
  { label: "建築・土木・設計" },
  { label: "建築設計事務所" },
  { label: "その他・建設系" },
  { label: "内装・インテリア・リフォーム" },
  { label: "政府系金融機関" },
  { label: "団体・連合会・官公庁・独立行政法人" },
  { label: "社会保険労務士事務所" },
  { label: "石油・資源" },
  { label: "鉱業・金属製品・鉄鋼 " },
  { label: "重工業・造船" },
  { label: "その他サービス" },
  { label: "ホテル・旅館・宿泊施設" },
  { label: "飲食サービス" },
  { label: "宿泊・飲食サービス" },
  { label: "宿泊サービス" },
  { label: "旅行・旅行代理業" },
  { label: "ITサービス・ITコンサルティング" },
  { label: "Webマーケティング" },
  { label: "インターネット・広告・メディア業界" },
  { label: "エンターテイメント" },
  { label: "ゲーム・アプリ" },
  { label: "コンピュータ・ハードウェア" },
  { label: "コンピュータネットワークセキュリティ" },
  { label: "ソフトウェア・情報処理" },
  { label: "ソフトウェア開発" },
  { label: "デザイン" },
  { label: "映画、ビデオ、音響" },
  { label: "研究サービス" },
  { label: "通信・ネットワーキング" },
  { label: "電子学習" },
  { label: "放送・書籍・出版" },
  { label: "翻訳・ローカリゼーション" },
  { label: "ITアウトソーシング" },
  { label: "システムインテグレータ" },
  { label: "その他ICT" },
  { label: "その他IT系" },
  { label: "スポーツ・ヘルス関連施設" },
  { label: "プラント・設備関連" },
  { label: "レジャー・アミューズメント" },
  { label: "冠婚葬祭" },
  { label: "警備・メンテナンス・清掃" },
  { label: "理容・美容・エステ" },
  { label: "その他専門サービス" },
  { label: "環境サービス" },
  { label: "消費財" },
  { label: "消費者電子機器" },
  { label: "ガラス・セラミック・コンクリート製造" },
  { label: "コンピュータ・電子製品製造" },
  { label: "その他製造" },
  { label: "その他製造業" },
  { label: "化学" },
  { label: "家電・モバイル・ネットワーク機器" },
  { label: "機械" },
  { label: "計測機器・精密機器" },
  { label: "産業用機械" },
  { label: "受託加工業" },
  { label: "樹脂製品" },
  { label: "食品・飲料" },
  { label: "繊維・服飾雑貨" },
  { label: "包装・容器" },
  { label: "家具・インテリア" },
  { label: "ファッション・アパレル" },
  { label: "繊維" },
  { label: "製紙・パルプ" },
  { label: "スポーツ・アウトドア" },
  { label: "文房具・事務・オフィス用品" },
  { label: "プラント・設備" },
  { label: "住宅設備・建材" },
  { label: "玩具" },
  { label: "農薬" },
  { label: "ベビー用品" },
  { label: "ペット関連" },
  { label: "香料" },
  { label: "たばこ" },
  { label: "エネルギー" },
  { label: "電力・ガス" },
  { label: "新エネルギー" },
  { label: "飼料メーカー" },
  { label: "水産・農林業" },
  { label: "肥料メーカー" },
  { label: "その他不動産・建設系" },
  { label: "リース・レンタル" },
  { label: "不動産" },
  { label: "不動産管理" },
  { label: "特殊法人・その他団体" },
];

const prefectures = [
  { label: "北海道" },
  { label: "青森県" },
  { label: "岩手県" },
  { label: "宮城県" },
  { label: "秋田県" },
  { label: "山形県" },
  { label: "福島県" },
  { label: "茨城県" },
  { label: "栃木県" },
  { label: "群馬県" },
  { label: "埼玉県" },
  { label: "千葉県" },
  { label: "東京都" },
  { label: "神奈川県" },
  { label: "新潟県" },
  { label: "富山県" },
  { label: "石川県" },
  { label: "福井県" },
  { label: "山梨県" },
  { label: "長野県" },
  { label: "岐阜県" },
  { label: "静岡県" },
  { label: "愛知県" },
  { label: "三重県" },
  { label: "滋賀県" },
  { label: "京都府" },
  { label: "大阪府" },
  { label: "兵庫県" },
  { label: "奈良県" },
  { label: "和歌山県" },
  { label: "鳥取県" },
  { label: "島根県" },
  { label: "岡山県" },
  { label: "広島県" },
  { label: "山口県" },
  { label: "徳島県" },
  { label: "香川県" },
  { label: "愛媛県" },
  { label: "高知県" },
  { label: "福岡県" },
  { label: "佐賀県" },
  { label: "長崎県" },
  { label: "熊本県" },
  { label: "大分県" },
  { label: "宮崎県" },
  { label: "鹿児島県" },
  { label: "沖縄県" },
];

const listingStatus = [
  { label: "上場" },
  { label: "未上場" },
  { label: "未確認" },
];

const minSalesAmount = [
  { label: "1億円" },
  { label: "3億円" },
  { label: "10億円" },
  { label: "50億円" },
  { label: "300億円" },
  { label: "1000億円" },
];

const maxSalesAmount = [
  { label: "1億円" },
  { label: "3億円" },
  { label: "10億円" },
  { label: "50億円" },
  { label: "300億円" },
  { label: "1000億円" },
];

const minEmployeeNumber = [
  { label: "50" },
  { label: "100" },
  { label: "300" },
  { label: "500" },
  { label: "1000" },
  { label: "3000" },
  { label: "5000" },
];

const maxEmployeeNumber = [
  { label: "50" },
  { label: "100" },
  { label: "300" },
  { label: "500" },
  { label: "1000" },
  { label: "3000" },
  { label: "5000" },
];

const minEstablishmentYear = [
  { label: "2018" },
  { label: "2013" },
  { label: "1993" },
  { label: "1973" },
];

const maxEstablishmentYear = [
  { label: "2023" },
  { label: "2018" },
  { label: "2013" },
  { label: "1993" },
  { label: "1973" },
];

const minCapitalStock = [
  { label: "100万円" },
  { label: "500万円" },
  { label: "1000万円" },
  { label: "5000万円" },
  { label: "1億円" },
  { label: "10億円" },
  { label: "100億円" },
  { label: "1000億円" },
  { label: "5000億円" },
  { label: "1兆円" },
];

const maxCapitalStock = [
  { label: "100万円" },
  { label: "500万円" },
  { label: "1000万円" },
  { label: "5000万円" },
  { label: "1億円" },
  { label: "10億円" },
  { label: "100億円" },
  { label: "1000億円" },
  { label: "5000億円" },
  { label: "1兆円" },
];

const Search = (props) => {
  var searchClickValue;
  // 法人番号
  const corporateNumberChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.corporateNumberChange(value);
  };
  // 会社名・法人名
  const corporationNameChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.corporationNameChange(value);
  };
  //業種
  const businessCategoryChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.businessCategoryChange(value);
  };
  //都道府県
  const prefecturesChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.prefecturesChange(value);
  };
  //代表電話番号
  const representativePhoneNumberChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.representativePhoneNumberChange(value);
  };
  //上場
  const corporationListStatusChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.corporationListStatusChange(value);
  };
  //売上
  const minSalesAmountChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minSalesAmountChange(value);
  };
  const maxSalesAmountChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxSalesAmountChange(value);
  };
  //従業員数
  const minEmployeeNumberChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minEmployeeNumberChange(value);
  };
  const maxEmployeeNumberChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxEmployeeNumberChange(value);
  };
  //設立
  const minEstablishmentYearChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minEstablishmentYearChange(value);
  };
  const maxEstablishmentYearChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxEstablishmentYearChange(value);
  };
  //資本金
  const minCapitalStockChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minCapitalStockChange(value);
  };
  const maxCapitalStockChange = (event) => {
    searchClickValue = 2;
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxCapitalStockChange(value);
  };
  //検索ボタン
  const searchClick = () => {
    searchClickValue = 1;
    props.searchClickChange(searchClickValue);
  };

  return (
    <Card>
      <Stack sx={{ m: 1 }} direction="row">
        <ManageSearchIcon />
        <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
          絞り込み
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <TextField
            label="法人番号"
            size="small"
            sx={{ m: 1 }}
            onChange={corporateNumberChange}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="会社名・法人名"
            size="small"
            sx={{ m: 1 }}
            onChange={corporationNameChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={businessCategory}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="業種" />}
            onChange={businessCategoryChange}
            clearIcon={null}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={prefectures}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="都道府県" />}
            onChange={prefecturesChange}
            clearIcon={null}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="電話番号"
            size="small"
            sx={{ m: 1 }}
            onChange={representativePhoneNumberChange}
          />
        </Grid>
        <Grid item xs={1.7}>
          <Autocomplete
            disablePortal
            options={listingStatus}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="上場" />}
            onChange={corporationListStatusChange}
            clearIcon={null}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>売上</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minSalesAmount}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={minSalesAmountChange}
              clearIcon={null}
            />
            <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={maxSalesAmountChange}
              clearIcon={null}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>従業員数</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minEmployeeNumber}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={minEmployeeNumberChange}
              clearIcon={null}
            />
            <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxEmployeeNumber}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={maxEmployeeNumberChange}
              clearIcon={null}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>設立</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minEstablishmentYear}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={minEstablishmentYearChange}
              clearIcon={null}
            />
            <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxEstablishmentYear}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={maxEstablishmentYearChange}
              clearIcon={null}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>資本金</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minCapitalStock}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={minCapitalStockChange}
              clearIcon={null}
            />
            <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxCapitalStock}
              size="small"
              sx={{ minWidth: 120 }}
              renderInput={(params) => <TextField {...params} label="" />}
              onChange={maxCapitalStockChange}
              clearIcon={null}
            />
          </Stack>
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{ borderRadius: 0.5, backgroundColor: "#109DBC", mx: 1, mb: 1 }}
            variant="contained"
            onClick={searchClick}
          >
            <SearchIcon />
            　検索
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Search;
