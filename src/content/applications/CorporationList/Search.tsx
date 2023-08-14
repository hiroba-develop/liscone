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
  { label: "農業・林業・鉱業" },
  { label: "建設・住宅・不動産" },
  { label: "水産・食品" },
  { label: "素材・化学" },
  { label: "医薬品・医療関連・化粧品" },
  { label: "ゴム・ガラス・セメント・セラミックス" },
  { label: "鉄鋼・非鉄・金属製品" },
  { label: "機械・プラントエンジニアリング" },
  { label: "電子・電機" },
  { label: "自動車・輸送用機器" },
  { label: "精密機器・医療用機器" },
  { label: "エネルギー" },
  { label: "銀行" },
  { label: "信用金庫・労働金庫" },
  { label: "信販・クレジット・ファイナンス" },
  { label: "その他金融" },
  { label: "リース・レンタル" },
  { label: "保険" },
  { label: "証券・投信・投資顧問" },
  { label: "商社（総合）" },
  { label: "商社（水産・食品）" },
  { label: "商社（ファッション関連）" },
  { label: "商社（素材関連）" },
  { label: "商社（化学・医薬品・化粧品）" },
  { label: "商社（エネルギー）" },
  { label: "商社（精密機器・医療用機器）" },
  { label: "商社（自動車・輸送用機器）" },
  { label: "商社（家具・インテリア・日用品）" },
  { label: "商社（鉄鋼・非鉄・金属製品）" },
  { label: "その他商社" },
  { label: "百貨店" },
  { label: "コンビニエンス・GMSストア" },
  { label: "生活協同組合" },
  { label: "専門店（ファッション関連）" },
  { label: "専門店（エンターテインメント）" },
  { label: "専門店（電器）" },
  { label: "専門店（家具・インテリア）" },
  { label: "専門店（フード）" },
  { label: "専門店（ドラッグストア・調剤薬局）" },
  { label: "専門店（自動車関連）" },
  { label: "その他専門店" },
  { label: "フードサービス" },
  { label: "ホテル・旅行" },
  { label: "教育" },
  { label: "エンターテインメント" },
  { label: "調査・コンサルタント" },
  { label: "人材サービス・人材紹介・人材派遣" },
  { label: "その他サービス" },
  { label: "情報処理・ソフトウェア" },
  { label: "情報・インターネットサービス" },
  { label: "情報通信" },
  { label: "マスコミ" },
  { label: "運輸" },
  { label: "倉庫" },
  { label: "官公庁・団体" },
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

const listingStatus = [{ label: "上場" }, { label: "未上場" }];

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
