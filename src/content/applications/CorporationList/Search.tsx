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
import { styled } from "@mui/system";

const businessCategory = [
  { industry: "情報通信業", sector: "翻訳・ローカリゼーション" },
  { industry: "情報通信業", sector: "放送・書籍・出版" },
  { industry: "情報通信業", sector: "放送・出版・新聞" },
  { industry: "情報通信業", sector: "電子学習" },
  { industry: "情報通信業", sector: "通信・ネットワーキング" },
  { industry: "情報通信業", sector: "広告代理店" },
  { industry: "情報通信業", sector: "広告・デザイン・イベント" },
  { industry: "情報通信業", sector: "映画、ビデオ、音響" },
  { industry: "情報通信業", sector: "デザイン" },
  { industry: "情報通信業", sector: "ソフトウェア開発" },
  { industry: "情報通信業", sector: "ソフトウェア・情報処理" },
  { industry: "情報通信業", sector: "システムインテグレータ" },
  { industry: "情報通信業", sector: "コンピュータネットワークセキュリティ" },
  { industry: "情報通信業", sector: "コンピュータ・ハードウェア" },
  { industry: "情報通信業", sector: "ゲーム・アプリ" },
  { industry: "情報通信業", sector: "エンターテイメント" },
  { industry: "情報通信業", sector: "インターネット・広告・メディア業界" },
  { industry: "情報通信業", sector: "インターネット・メディア業界" },
  { industry: "情報通信業", sector: "Webマーケティング" },
  { industry: "情報通信業", sector: "SP代理店" },
  { industry: "情報通信業", sector: "ITサービス・ITコンサルティング" },
  { industry: "情報通信業", sector: "ITアウトソーシング" },
  { industry: "情報通信業", sector: "EC" },
  { industry: "情報通信業", sector: "その他広告" },
  { industry: "情報通信業", sector: "その他IT系" },
  { industry: "情報通信業", sector: "その他ICT" },
  { industry: "卸売業・小売業", sector: "複写機・プリンタ" },
  { industry: "卸売業・小売業", sector: "百貨店" },
  { industry: "卸売業・小売業", sector: "半導体" },
  { industry: "卸売業・小売業", sector: "日用品・雑貨" },
  { industry: "卸売業・小売業", sector: "電子・機械" },
  { industry: "卸売業・小売業", sector: "鉄鋼・金属" },
  { industry: "卸売業・小売業", sector: "通信販売・ネット販売" },
  { industry: "卸売業・小売業", sector: "総合商社" },
  { industry: "卸売業・小売業", sector: "専門店・その他小売" },
  { industry: "卸売業・小売業", sector: "石油製品" },
  { industry: "卸売業・小売業", sector: "精密機器・計測機器" },
  { industry: "卸売業・小売業", sector: "食料品" },
  { industry: "卸売業・小売業", sector: "消費者向けサービス" },
  { industry: "卸売業・小売業", sector: "小売" },
  { industry: "卸売業・小売業", sector: "書籍・雑誌" },
  { industry: "卸売業・小売業", sector: "重電・産業用電気機器" },
  { industry: "卸売業・小売業", sector: "住宅・建材・エクステリア" },
  { industry: "卸売業・小売業", sector: "自動車" },
  { industry: "卸売業・小売業", sector: "紙・パルプ" },
  { industry: "卸売業・小売業", sector: "国際貿易・開発" },
  { industry: "卸売業・小売業", sector: "呉服・寝装品" },
  { industry: "卸売業・小売業", sector: "建材" },
  { industry: "卸売業・小売業", sector: "機械関連" },
  { industry: "卸売業・小売業", sector: "貨物・パッケージ輸送" },
  { industry: "卸売業・小売業", sector: "家電・AV機器・コンピュータ" },
  { industry: "卸売業・小売業", sector: "化学・石油" },
  { industry: "卸売業・小売業", sector: "化学・医薬原料" },
  { industry: "卸売業・小売業", sector: "音楽・書籍" },
  { industry: "卸売業・小売業", sector: "卸売・輸出入" },
  { industry: "卸売業・小売業", sector: "医療機器" },
  { industry: "卸売業・小売業", sector: "医薬品・化粧品・バイオ" },
  { industry: "卸売業・小売業", sector: "ホームセンター・DIY" },
  { industry: "卸売業・小売業", sector: "ドラッグストア・調剤薬局" },
  { industry: "卸売業・小売業", sector: "スポーツ用品" },
  { industry: "卸売業・小売業", sector: "コンビニエンスストア・スーパー" },
  { industry: "卸売業・小売業", sector: "エネルギー" },
  { industry: "卸売業・小売業", sector: "インテリア" },
  { industry: "卸売業・小売業", sector: "アミューズメント・玩具" },
  { industry: "卸売業・小売業", sector: "アパレル・ファッション・繊維" },
  { industry: "卸売業・小売業", sector: "その他商社" },
  { industry: "医療、福祉", sector: "福祉・介護" },
  { industry: "医療、福祉", sector: "病院・大学病院" },
  { industry: "医療、福祉", sector: "調剤薬局・ドラッグストア" },
  { industry: "医療、福祉", sector: "医療系卸" },
  { industry: "医療、福祉", sector: "医療コンサルティング" },
  { industry: "医療、福祉", sector: "医療・福祉関連" },
  { industry: "医療、福祉", sector: "その他" },
  { industry: "製造業", sector: "包装・容器" },
  { industry: "製造業", sector: "文房具・事務・オフィス用品" },
  { industry: "製造業", sector: "半導体" },
  { industry: "製造業", sector: "農薬" },
  { industry: "製造業", sector: "鉄鋼・金属" },
  { industry: "製造業", sector: "繊維・服飾雑貨" },
  { industry: "製造業", sector: "製紙・パルプ" },
  { industry: "製造業", sector: "食品・飲料" },
  { industry: "製造業", sector: "住宅設備・建材" },
  { industry: "製造業", sector: "樹脂製品" },
  { industry: "製造業", sector: "受託加工業" },
  { industry: "製造業", sector: "自動車" },
  { industry: "製造業", sector: "産業用機械" },
  { industry: "製造業", sector: "香料" },
  { industry: "製造業", sector: "計測機器・精密機器" },
  { industry: "製造業", sector: "機械" },
  { industry: "製造業", sector: "玩具" },
  { industry: "製造業", sector: "家電・モバイル・ネットワーク機器" },
  { industry: "製造業", sector: "家具・インテリア" },
  { industry: "製造業", sector: "化学" },
  { industry: "製造業", sector: "医薬品・化粧品・バイオ" },
  { industry: "製造業", sector: "ベビー用品" },
  { industry: "製造業", sector: "ペット関連" },
  { industry: "製造業", sector: "ファッション・アパレル" },
  { industry: "製造業", sector: "たばこ" },
  { industry: "製造業", sector: "その他製造" },
  { industry: "製造業", sector: "スポーツ・アウトドア" },
  { industry: "製造業", sector: "コンピュータ・電子製品製造" },
  { industry: "製造業", sector: "ガラス・セラミック・コンクリート製造" },
  { industry: "製造業", sector: "その他" },
  { industry: "建設業", sector: "内装・インテリア・リフォーム" },
  { industry: "建設業", sector: "住宅" },
  { industry: "建設業", sector: "建築設計事務所" },
  { industry: "建設業", sector: "建築・土木・設計" },
  { industry: "建設業", sector: "建築・都市計画" },
  { industry: "建設業", sector: "建設コンサルタント" },
  { industry: "建設業", sector: "プラント" },
  { industry: "建設業", sector: "ゼネコン・サブコン" },
  { industry: "建設業", sector: "その他・建設系" },
  { industry: "金融業・保険業", sector: "保険代理店" },
  { industry: "金融業・保険業", sector: "投資信託・投資顧問" },
  { industry: "金融業・保険業", sector: "投資管理" },
  { industry: "金融業・保険業", sector: "損害保険" },
  { industry: "金融業・保険業", sector: "生命保険" },
  { industry: "金融業・保険業", sector: "信用金庫・信用組合・労働金庫" },
  { industry: "金融業・保険業", sector: "信託" },
  { industry: "金融業・保険業", sector: "証券・投資銀行" },
  { industry: "金融業・保険業", sector: "消費者金融" },
  { industry: "金融業・保険業", sector: "商品先物取引" },
  { industry: "金融業・保険業", sector: "住宅ローン" },
  { industry: "金融業・保険業", sector: "債権回収" },
  { industry: "金融業・保険業", sector: "個人・家族向けサービス" },
  { industry: "金融業・保険業", sector: "銀行" },
  { industry: "金融業・保険業", sector: "金融情報" },
  { industry: "金融業・保険業", sector: "金融" },
  { industry: "金融業・保険業", sector: "リース" },
  {
    industry: "金融業・保険業",
    sector: "ベンチャーキャピタル・プライベートエクイティ・株主",
  },
  { industry: "金融業・保険業", sector: "クレジット・信販" },
  { industry: "金融業・保険業", sector: "その他保険" },
  { industry: "金融業・保険業", sector: "その他金融" },
  { industry: "不動産業、物品賃貸業", sector: "不動産管理" },
  { industry: "不動産業、物品賃貸業", sector: "不動産" },
  { industry: "不動産業、物品賃貸業", sector: "賃貸" },
  { industry: "不動産業、物品賃貸業", sector: "リース・レンタル" },
  { industry: "不動産業、物品賃貸業", sector: "その他不動産・建設系" },
  { industry: "運輸業、郵便業", sector: "鉄道" },
  { industry: "運輸業、郵便業", sector: "自動車・輸送機器メーカー" },
  { industry: "運輸業、郵便業", sector: "航空・航行" },
  { industry: "運輸業、郵便業", sector: "海洋輸送" },
  { industry: "運輸業、郵便業", sector: "運輸・倉庫" },
  { industry: "運輸業、郵便業", sector: "その他運送業" },
  { industry: "教育、学習支援業", sector: "公社・官公庁・学校・研究施設" },
  { industry: "教育、学習支援業", sector: "研修" },
  { industry: "教育、学習支援業", sector: "教育行政プログラム" },
  { industry: "教育、学習支援業", sector: "教育管理" },
  { industry: "教育、学習支援業", sector: "教育" },
  { industry: "教育、学習支援業", sector: "学習塾・予備校・専門学校" },
  { industry: "教育、学習支援業", sector: "Eラーニング" },
  { industry: "教育、学習支援業", sector: "その他・各種スクール" },
  { industry: "宿泊業、飲食サービス業", sector: "旅行・旅行代理業" },
  { industry: "宿泊業、飲食サービス業", sector: "宿泊サービス" },
  { industry: "宿泊業、飲食サービス業", sector: "飲食サービス" },
  { industry: "宿泊業、飲食サービス業", sector: "その他サービス" },
  { industry: "生活関連サービス業、娯楽業", sector: "理容・美容・エステ" },
  { industry: "生活関連サービス業、娯楽業", sector: "消費者電子機器" },
  { industry: "生活関連サービス業、娯楽業", sector: "消費財" },
  {
    industry: "生活関連サービス業、娯楽業",
    sector: "警備・メンテナンス・清掃",
  },
  { industry: "生活関連サービス業、娯楽業", sector: "環境サービス" },
  { industry: "生活関連サービス業、娯楽業", sector: "冠婚葬祭" },
  {
    industry: "生活関連サービス業、娯楽業",
    sector: "レジャー・アミューズメント",
  },
  {
    industry: "生活関連サービス業、娯楽業",
    sector: "スポーツ・ヘルス関連施設",
  },
  {
    industry: "生活関連サービス業、娯楽業",
    sector: "その他施設・専門サービス",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "法律事務所" },
  { industry: "学術研究、専門・技術サービス業", sector: "法律サービス" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "特許事務所・弁理士事務所",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "大学・研究施設" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "総合コンサルティング",
  },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "組織人事コンサルティング",
  },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "設備管理・メンテナンス",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "税理士法人" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "人材サービス・アウトソーシング",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "職業紹介・人材派遣" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "司法書士事務所・行政書士事務所",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "産業・エネルギー" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "財務・会計アドバイザリー",
  },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "公共関係・コミュニケーションサービス",
  },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "経営・戦略コンサルティング",
  },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "技術系アウトソーシング",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "機械・産業工学" },
  { industry: "学術研究、専門・技術サービス業", sector: "監査法人" },
  { industry: "学術研究、専門・技術サービス業", sector: "会計事務所" },
  { industry: "学術研究、専門・技術サービス業", sector: "印刷" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "マーケティング・リサーチ",
  },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "バイオテクノロジー・ナノテク",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "シンクタンク" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "アウトソーシング・オフショアリングコンサルティング",
  },
  { industry: "学術研究、専門・技術サービス業", sector: "CRO" },
  {
    industry: "学術研究、専門・技術サービス業",
    sector: "その他専門・コンサル",
  },
  { industry: "電気・ガス・熱供給・水道業", sector: "電力・ガス・水道業" },
  { industry: "電気・ガス・熱供給・水道業", sector: "水道業" },
  { industry: "電気・ガス・熱供給・水道業", sector: "新エネルギー" },
  { industry: "電気・ガス・熱供給・水道業", sector: "エネルギー" },
  { industry: "農林水産・鉱業", sector: "肥料メーカー" },
  { industry: "農林水産・鉱業", sector: "農林水産・鉱業" },
  { industry: "農林水産・鉱業", sector: "水産・農林業" },
  { industry: "農林水産・鉱業", sector: "飼料メーカー" },
  { industry: "鉱業、採石業、砂利採取業", sector: "農林水産・鉱業" },
  { industry: "鉱業、採石業、砂利採取業", sector: "石油・資源" },
  { industry: "鉱業、採石業、砂利採取業", sector: "重工業・造船" },
  { industry: "鉱業、採石業、砂利採取業", sector: "鉱業・金属製品・鉄鋼 " },
  { industry: "公務", sector: "団体・連合会・官公庁・独立行政法人" },
  { industry: "公務", sector: "政府系金融機関" },
  { industry: "公務", sector: "社会保険労務士事務所" },
  {
    industry: "サービス業（他に分類されないもの）",
    sector: "消費者向けサービス",
  },
  { industry: "サービス業（他に分類されないもの）", sector: "商品取引" },
  {
    industry: "サービス業（他に分類されないもの）",
    sector: "財団法人・社団法人・宗教法人",
  },
  { industry: "サービス業（他に分類されないもの）", sector: "警備・清掃" },
  {
    industry: "サービス業（他に分類されないもの）",
    sector: "求人サイト・求人メディア",
  },
  { industry: "サービス業（他に分類されないもの）", sector: "サービス" },
  { industry: "サービス業（他に分類されないもの）", sector: "その他" },
  { industry: "分類不能の産業", sector: "特殊法人・その他団体" },
  { industry: "分類不能の産業", sector: "その他" },
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
  { label: "2020" },
  { label: "2015" },
  { label: "2010" },
  { label: "2005" },
  { label: "2000" },
  { label: "1995" },
  { label: "1990" },
  { label: "1985" },
  { label: "1980" },
  { label: "1975" },
  { label: "1970" },
];

const maxEstablishmentYear = [
  { label: "2023" },
  { label: "2020" },
  { label: "2015" },
  { label: "2010" },
  { label: "2005" },
  { label: "2000" },
  { label: "1995" },
  { label: "1990" },
  { label: "1985" },
  { label: "1980" },
  { label: "1975" },
  { label: "1970" },
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
  const [clickValue, setClickValue] = useState<number>(0);
  let searchClickValue = 0;
  // 法人番号
  const corporateNumberChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.corporateNumberChange(value);
  };
  // 会社名・法人名
  const corporationNameChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.corporationNameChange(value);
  };
  //業種
  const businessCategoryChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.businessCategoryChange(value);
  };
  //都道府県
  const prefecturesChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.prefecturesChange(value);
  };
  //代表電話番号
  const representativePhoneNumberChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.representativePhoneNumberChange(value);
  };
  //上場
  const corporationListStatusChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.corporationListStatusChange(value);
  };
  //売上
  const minSalesAmountChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minSalesAmountChange(value);
  };
  const maxSalesAmountChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxSalesAmountChange(value);
  };
  //従業員数
  const minEmployeeNumberChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minEmployeeNumberChange(value);
  };
  const maxEmployeeNumberChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxEmployeeNumberChange(value);
  };
  //設立
  const minEstablishmentYearChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minEstablishmentYearChange(value);
  };
  const maxEstablishmentYearChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxEstablishmentYearChange(value);
  };
  //資本金
  const minCapitalStockChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minCapitalStockChange(value);
  };
  const maxCapitalStockChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxCapitalStockChange(value);
  };
  //検索ボタン
  const searchClick = () => {
    searchClickValue = 1;
    setClickValue(1);
    props.searchClickChange(searchClickValue);
  };

  // 役職
  const jobPositionChange = (event) => {
    searchClickValue = 4;
    setClickValue(4);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.jobPositionChange(value);
  };
  // 部署
  const departmentChange = (event) => {
    searchClickValue = 4;
    setClickValue(4);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.departmentChange(value);
  };
  //リスト
  const profileSourceTypeChange = (event) => {
    searchClickValue = 4;
    setClickValue(4);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.profileSourceTypeChange(value);
  };
  // 担当者
  const staffNameChange = (event) => {
    searchClickValue = 4;
    setClickValue(4);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.staffNameChange(value);
  };
  //検索ボタン
  const searchStaffClick = () => {
    searchClickValue = 3;
    setClickValue(3);
    props.searchClickChange(searchClickValue);
  };

  let clickValueFlg = true;
  if (clickValue === 2) {
    clickValueFlg = false;
  } else if (clickValue === 0 || clickValue === 1) {
    clickValueFlg = true;
  }
  let clickStaffValueFlg = true;
  if (clickValue === 4) {
    clickStaffValueFlg = false;
  } else if (clickValue === 2 || clickValue === 3) {
    clickStaffValueFlg = true;
  }

  const industryOptions = businessCategory.map((industryOption) => ({
    industry: industryOption.industry,
    ...industryOption,
  }));
  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: "#FFFFFF",
    backgroundColor: "#109DBC",
  }));

  const source = [
    { label: "人事異動" },
    { label: "Wantedly" },
    { label: "Linkedin" },
    { label: "meety" },
  ];

  let staffSearch;
  if (
    clickValue === 1 ||
    clickValue === 2 ||
    clickValue === 3 ||
    clickValue === 4
  ) {
    staffSearch = (
      <Card sx={{ mt: 1 }}>
        <Stack sx={{ m: 1 }} direction="row">
          <ManageSearchIcon />
          <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
            絞り込み
          </Typography>
        </Stack>
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {/* <Grid item xs={2}>
            <TextField
              label="法人名"
              size="small"
              sx={{ m: 1 }}
              onChange={corporationNameChange}
            />
          </Grid> */}
          <Grid item xs={2}>
            <TextField
              label="部署"
              size="small"
              sx={{ m: 1 }}
              onChange={departmentChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="役職"
              size="small"
              sx={{ m: 1 }}
              onChange={jobPositionChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              options={source}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => <TextField {...params} label="ソース" />}
              onChange={profileSourceTypeChange}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="担当者名"
              size="small"
              sx={{ m: 1 }}
              onChange={staffNameChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                borderRadius: 0.5,
                backgroundColor: "#109DBC",
                m: 1,
              }}
              variant="contained"
              disabled={clickStaffValueFlg}
              onClick={searchStaffClick}
            >
              <SearchIcon />
              　検索
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Stack sx={{ m: 1 }} direction="row">
          <ManageSearchIcon />
          <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
            絞り込み
          </Typography>
        </Stack>
        <Grid container spacing={0}>
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
          <Grid item xs={3.5}>
            <Autocomplete
              id="grouped-demo"
              options={industryOptions}
              groupBy={(industryOption) => industryOption.industry}
              getOptionLabel={(industryOption) => industryOption.sector}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => <TextField {...params} label="業種" />}
              onChange={businessCategoryChange}
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  {params.children}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Autocomplete
              disablePortal
              options={prefectures}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="都道府県" />
              )}
              onChange={prefecturesChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <TextField
              label="電話番号"
              size="small"
              sx={{ m: 1 }}
              onChange={representativePhoneNumberChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Autocomplete
              disablePortal
              options={listingStatus}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => <TextField {...params} label="上場" />}
              onChange={corporationListStatusChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>売上</Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <Autocomplete
                disablePortal
                options={minSalesAmount}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={minSalesAmountChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
              <Autocomplete
                disablePortal
                options={maxSalesAmount}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={maxSalesAmountChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              従業員数
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <Autocomplete
                disablePortal
                options={minEmployeeNumber}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={minEmployeeNumberChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
              <Autocomplete
                disablePortal
                options={maxEmployeeNumber}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={maxEmployeeNumberChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>設立</Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <Autocomplete
                disablePortal
                options={minEstablishmentYear}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={minEstablishmentYearChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
              <Autocomplete
                disablePortal
                options={maxEstablishmentYear}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={maxEstablishmentYearChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>資本金</Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <Autocomplete
                disablePortal
                options={minCapitalStock}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={minCapitalStockChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>-</Typography>
              <Autocomplete
                disablePortal
                options={maxCapitalStock}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={maxCapitalStockChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Button
              sx={{
                borderRadius: 0.5,
                backgroundColor: "#109DBC",
                mx: 1,
                mb: 1,
              }}
              variant="contained"
              disabled={clickValueFlg}
              onClick={searchClick}
            >
              <SearchIcon />
              　検索
            </Button>
          </Grid>
        </Grid>
      </Card>
      {staffSearch}
    </>
  );
};

export default Search;
