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
import { CODE } from "src/utility/constants/Code";

const businessCategory = [
{ industry:"情報通信業",sector:"放送・書籍・出版" },
{ industry:"情報通信業",sector:"通信・ネットワーキング" },
{ industry:"情報通信業",sector:"広告代理店" },
{ industry:"情報通信業",sector:"広告・デザイン・イベント" },
{ industry:"情報通信業",sector:"ソフトウェア・情報処理" },
{ industry:"情報通信業",sector:"システムインテグレータ" },
{ industry:"情報通信業",sector:"コンピュータ・ハードウェア" },
{ industry:"情報通信業",sector:"ゲーム・アプリ" },
{ industry:"情報通信業",sector:"インターネット・広告・メディア業界" },
{ industry:"情報通信業",sector:"Webマーケティング" },
{ industry:"情報通信業",sector:"SP代理店" },
{ industry:"情報通信業",sector:"ITサービス・ITコンサルティング" },
{ industry:"情報通信業",sector:"ITアウトソーシング" },
{ industry:"情報通信業",sector:"EC" },
{ industry:"情報通信業",sector:"その他IT系" },
{ industry:"情報通信業",sector:"その他広告" },
{ industry:"情報通信業",sector:"その他ICT" },
{ industry:"製造業",sector:"文房具・事務・オフィス用品" },
{ industry:"製造業",sector:"半導体" },
{ industry:"製造業",sector:"鉄鋼・金属" },
{ industry:"製造業",sector:"繊維・服飾雑貨" },
{ industry:"製造業",sector:"製紙・パルプ" },
{ industry:"製造業",sector:"食品・飲料" },
{ industry:"製造業",sector:"樹脂製品" },
{ industry:"製造業",sector:"受託加工業" },
{ industry:"製造業",sector:"自動車" },
{ industry:"製造業",sector:"産業用機械" },
{ industry:"製造業",sector:"計測機器・精密機器" },
{ industry:"製造業",sector:"機械" },
{ industry:"製造業",sector:"家電・モバイル・ネットワーク機器" },
{ industry:"製造業",sector:"家具・インテリア" },
{ industry:"製造業",sector:"化学" },
{ industry:"製造業",sector:"医薬品・化粧品・バイオ" },
{ industry:"製造業",sector:"コンピュータ・電子製品製造" },
{ industry:"製造業",sector:"住宅設備・建材" },
{ industry:"製造業",sector:"印刷" },
{ industry:"製造業",sector:"その他製造" },
{ industry:"卸売業・小売業",sector:"通信販売・ネット販売" },
{ industry:"卸売業・小売業",sector:"専門店・その他小売" },
{ industry:"卸売業・小売業",sector:"食料品" },
{ industry:"卸売業・小売業",sector:"機械関連" },
{ industry:"卸売業・小売業",sector:"家電・AV機器・コンピュータ" },
{ industry:"卸売業・小売業",sector:"百貨店" },
{ industry:"卸売業・小売業",sector:"日用品・雑貨" },
{ industry:"卸売業・小売業",sector:"呉服・寝装品" },
{ industry:"卸売業・小売業",sector:"アパレル・ファッション・繊維" },
{ industry:"卸売業・小売業",sector:"その他商社" },
{ industry:"運輸業、郵便業",sector:"自動車・輸送機器メーカー" },
{ industry:"運輸業、郵便業",sector:"航空・航行" },
{ industry:"運輸業、郵便業",sector:"運輸・倉庫" },
{ industry:"医療、福祉",sector:"調剤薬局・ドラッグストア" },
{ industry:"医療、福祉",sector:"福祉・介護" },
{ industry:"医療、福祉",sector:"病院・大学病院" },
{ industry:"医療、福祉",sector:"医療系卸" },
{ industry:"医療、福祉",sector:"医療コンサルティング" },
{ industry:"建設業",sector:"住宅" },
{ industry:"建設業",sector:"建築・土木・設計" },
{ industry:"建設業",sector:"プラント" },
{ industry:"建設業",sector:"ゼネコン・サブコン" },
{ industry:"建設業",sector:"内装・インテリア・リフォーム" },
{ industry:"建設業",sector:"その他・建設系" },
{ industry:"金融業・保険業",sector:"保険代理店" },
{ industry:"金融業・保険業",sector:"投資信託・投資顧問" },
{ industry:"金融業・保険業",sector:"損害保険" },
{ industry:"金融業・保険業",sector:"生命保険" },
{ industry:"金融業・保険業",sector:"信用金庫・信用組合・労働金庫" },
{ industry:"金融業・保険業",sector:"証券・投資銀行" },
{ industry:"金融業・保険業",sector:"銀行" },
{ industry:"金融業・保険業",sector:"金融" },
{ industry:"金融業・保険業",sector:"クレジット・信販" },
{ industry:"金融業・保険業",sector:"その他保険" },
{ industry:"金融業・保険業",sector:"その他金融" },
{ industry:"宿泊業、飲食サービス業",sector:"旅行・旅行代理業" },
{ industry:"宿泊業、飲食サービス業",sector:"宿泊サービス" },
{ industry:"宿泊業、飲食サービス業",sector:"飲食サービス" },
{ industry:"宿泊業、飲食サービス業",sector:"その他サービス" },
{ industry:"鉱業、採石業、砂利採取業",sector:"農林水産・鉱業" },
{ industry:"鉱業、採石業、砂利採取業",sector:"石油・資源" },
{ industry:"鉱業、採石業、砂利採取業",sector:"重工業・造船" },
{ industry:"鉱業、採石業、砂利採取業",sector:"鉱業・金属製品・鉄鋼" },
{ industry:"不動産業、物品賃貸業",sector:"不動産管理" },
{ industry:"不動産業、物品賃貸業",sector:"不動産" },
{ industry:"不動産業、物品賃貸業",sector:"賃貸" },
{ industry:"不動産業、物品賃貸業",sector:"リース・レンタル" },
{ industry:"不動産業、物品賃貸業",sector:"その他不動産・建設系" },
{ industry:"農林水産・鉱業",sector:"肥料メーカー" },
{ industry:"農林水産・鉱業",sector:"農林水産・鉱業" },
{ industry:"農林水産・鉱業",sector:"水産・農林業" },
{ industry:"農林水産・鉱業",sector:"飼料メーカー" },
{ industry:"電気・ガス・熱供給・水道業",sector:"電力・ガス・水道業" },
{ industry:"電気・ガス・熱供給・水道業",sector:"水道業" },
{ industry:"電気・ガス・熱供給・水道業",sector:"エネルギー" },
{ industry:"電気・ガス・熱供給・水道業",sector:"新エネルギー" },
{ industry:"教育、学習支援業",sector:"公社・官公庁・学校・研究施設" },
{ industry:"教育、学習支援業",sector:"研修" },
{ industry:"教育、学習支援業",sector:"教育" },
{ industry:"教育、学習支援業",sector:"学習塾・予備校・専門学校" },
{ industry:"教育、学習支援業",sector:"その他・各種スクール" },
{ industry:"学術研究、専門・技術サービス業",sector:"職業紹介・人材派遣" },
{ industry:"学術研究、専門・技術サービス業",sector:"建設コンサルタント" },
{ industry:"学術研究、専門・技術サービス業",sector:"設備管理・メンテナンス" },
{ industry:"学術研究、専門・技術サービス業",sector:"税理士法人" },
{ industry:"学術研究、専門・技術サービス業",sector:"人材サービス・アウトソーシング" },
{ industry:"学術研究、専門・技術サービス業",sector:"経営・戦略コンサルティング" },
{ industry:"学術研究、専門・技術サービス業",sector:"バイオテクノロジー・ナノテク" },
{ industry:"学術研究、専門・技術サービス業",sector:"マーケティング・リサーチ" },
{ industry:"学術研究、専門・技術サービス業",sector:"その他専門・コンサル" },
{ industry:"生活関連サービス業、娯楽業",sector:"理容・美容・エステ" },
{ industry:"生活関連サービス業、娯楽業",sector:"環境サービス" },
{ industry:"生活関連サービス業、娯楽業",sector:"冠婚葬祭" },
{ industry:"生活関連サービス業、娯楽業",sector:"レジャー・アミューズメント" },
{ industry:"生活関連サービス業、娯楽業",sector:"スポーツ・ヘルス関連施設" },
{ industry:"生活関連サービス業、娯楽業",sector:"その他施設・専門サービス" },
{ industry:"公務",sector:"団体・連合会・官公庁・独立行政法人" },
{ industry:"公務",sector:"政府系金融機関" },
{ industry:"公務",sector:"社会保険労務士事務所" },
{ industry:"サービス業（他に分類されないもの）",sector:"警備・清掃" },
{ industry:"サービス業（他に分類されないもの）",sector:"消費者向けサービス" },
{ industry:"サービス業（他に分類されないもの）",sector:"サービス" },
{ industry:"分類不能の産業",sector:"特殊法人・その他団体" },
{ industry:"分類不能の産業",sector:"その他" },
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

const SNS = [
  { label: "LINE公式" },
  { label: "X（Twitter）" },
  { label: "Instagram" },
  { label: "Tiktok" },
  { label: "Youtube" },
  { label: "Facebook" },
];

const Level1to10 = [
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "10" },
];

const MinSitePV = [
  { label: "1K" },
  { label: "5K" },
  { label: "10K" },
  { label: "50K" },
  { label: "100K" },
  { label: "500K" },
  { label: "1M" },
  { label: "5M" },
  { label: "10M" },
  { label: "20M" },
];

const MaxSitePV = [
  { label: "5K" },
  { label: "10K" },
  { label: "50K" },
  { label: "100K" },
  { label: "500K" },
  { label: "1M" },
  { label: "5M" },
  { label: "10M" },
  { label: "20M" },
  { label: "50M" },
];

const Documentpublish = [
  { label: "ITトレンド" },
  { label: "LISKUL" },
  { label: "Boxil" },
  { label: "アイティメディア" },
];

const MinAverageAge = [
  { label: "20" },
  { label: "25" },
  { label: "30" },
  { label: "35" },
  { label: "40" },
  { label: "45" },
  { label: "50" },
  { label: "55" },
  { label: "60" },
];

const MaxAverageAge = [
  { label: "25" },
  { label: "30" },
  { label: "35" },
  { label: "40" },
  { label: "45" },
  { label: "50" },
  { label: "55" },
  { label: "60" },
  { label: "65" },
];

const Advertising = [{ label: "有り" }, { label: "無し" }, { label: "未確認" }];

const Search = (props) => {
  const [clickValue, setClickValue] = useState<number>(0);
  const [corporateSearchClickFlg, setCorporateSearchClickFlg] =
    useState<boolean>(false);
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
  const businessCategoryChange = (event,value) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const values = [];
    value.forEach(item => {
        if (item.hasOwnProperty('industry') && item.hasOwnProperty('sector')) {
          values.push(item.sector);
        }
    });
    props.businessCategoryChange(values);
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
    const value = event.target.value;
    props.minSalesAmountChange(value);
  };
  const maxSalesAmountChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.maxSalesAmountChange(value);
  };
  //従業員数
  const minEmployeeNumberChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.minEmployeeNumberChange(value);
  };
  const maxEmployeeNumberChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.maxEmployeeNumberChange(value);
  };
  //設立
  const minEstablishmentYearChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.minEstablishmentYearChange(value);
  };
  const maxEstablishmentYearChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.maxEstablishmentYearChange(value);
  };
  //資本金
  const minCapitalStockChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.minCapitalStockChange(value);
  };
  const maxCapitalStockChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.maxCapitalStockChange(value);
  };
  //SNS
  const SNSChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.SNSChange(value);
  };

  //レガシー企業レベル
  const legacyCompanyChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.legacyCompanyChange(value);
  };

  //人的資本経営レベル
  const humanCapitalRunningChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.humanCapitalRunningChange(value);
  };

  //研修強化レベル
  const humanResourcesEducationalChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.humanResourcesEducationalChange(value);
  };

  //新規事業推進レベル
  const newBusinessChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.newBusinessChange(value);
  };

  //広告出稿
  const advertisingChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.advertisingChange(value);
  };

  //サイトPV数
  const minSitePVChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minSitePVChange(value);
  };
  const maxSitePVChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxSitePVChange(value);
  };

  //資料掲載
  const documentPublishChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.documentPublishChange(value);
  };

  //平均年齢
  const minAverageAgeChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.minAverageAgeChange(value);
  };
  const maxAverageAgeChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.maxAverageAgeChange(value);
  };
  // フリーテキスト
  const freeTextChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.freeTextChange(value);
  };
  // 除外フリーテキスト
  const exclusionFreeTextChange = (event) => {
    searchClickValue = 2;
    setClickValue(2);
    props.searchClickChange(searchClickValue);
    const value = event.target.value;
    props.exclusionFreeTextChange(value);
  };

  //検索ボタン(企業検索)
  const searchClick = () => {
    searchClickValue = 1;
    setClickValue(1);
    setCorporateSearchClickFlg(true);
    props.searchClickChange(searchClickValue);
  };

  // 大項目(採用)
  const [BRSelected, setBRSelected] = useState("");
  const recruitBigResultChange = (event) => {
    searchClickValue = 6;
    setClickValue(6);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    setBRSelected(value);
    props.recruitBigResultChange(value);

    setMRSelected(value);
  };
  // 中項目(採用)
  const [MRSelected, setMRSelected] = useState("");
  const recruitMiddleResultChange = (event) => {
    searchClickValue = 6;
    setClickValue(6);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    setMRSelected(value);
    props.recruitMiddleResultChange(value);
  };
  // 小項目(採用)
  const recruitSmallResultChange = (event) => {
    searchClickValue = 6;
    setClickValue(6);
    props.searchClickChange(searchClickValue);
    const value = event.target.innerText;
    props.recruitSmallResultChange(value);
  };
  //検索ボタン(採用検索)
  const searchRecruitClick = () => {
    searchClickValue = 5;
    setClickValue(5);
    setCorporateSearchClickFlg(true);
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
  //検索ボタン(担当者検索)
  const searchStaffClick = () => {
    searchClickValue = 3;
    setClickValue(3);
    props.searchClickChange(searchClickValue);
  };

  const middleResult = () => {
    if (BRSelected === "営業職") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR01;
    } else if (BRSelected === "企画・管理") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR02;
    } else if (
      BRSelected === "技術職（SE・インフラエンジニア・Webエンジニア）"
    ) {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR03;
    } else if (BRSelected === "技術職（組み込みソフトウェア）") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR04;
    } else if (BRSelected === "技術職（機械・電気）") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR05;
    } else if (BRSelected === "技術職（化学・素材・化粧品・トイレタリー）") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR06;
    } else if (BRSelected === "技術職（食品・香料・飼料）") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR07;
    } else if (
      BRSelected === "技術職・専門職（建設・建築・不動産・プラント・工場）"
    ) {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR08;
    } else if (
      BRSelected === "専門職（コンサルティングファーム・専門事務所・監査法人）"
    ) {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR09;
    } else if (BRSelected === "クリエイター・クリエイティブ職") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR10;
    } else if (BRSelected === "販売・サービス職") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR11;
    } else if (BRSelected === "公務員・教員・農林水産関連職") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR12;
    } else if (BRSelected === "事務・アシスタント") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR13;
    } else if (BRSelected === "医療系専門職") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR14;
    } else if (BRSelected === "金融系専門職") {
      return CODE.RECRUIT_MIDDLE_RESULT_RBR15;
    } else {
      return [];
    }
  };
  const bigResultArray = middleResult();
  const smallResult = () => {
    if (MRSelected === "IT営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR01;
    } else if (MRSelected === "半導体・電子部品・エレクトロニクス製品営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR02;
    } else if (MRSelected === "自動車・装置・機械製品営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR03;
    } else if (MRSelected === "原料・素材・化学製品営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR04;
    } else if (MRSelected === "医療営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR05;
    } else if (MRSelected === "食品・日用品・消費財営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR06;
    } else if (MRSelected === "建設・土木・不動産・住宅営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR07;
    } else if (MRSelected === "金融営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR08;
    } else if (MRSelected === "広告・メディア営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR09;
    } else if (MRSelected === "人材・求人広告営業") {
      return CODE.RECRUIT_SMALL_RESULT_RMR10;
    } else if (MRSelected === "その他営業職") {
      return CODE.RECRUIT_SMALL_RESULT_RMR11;
    } else if (MRSelected === "マーケティング・商品企画・広告宣伝") {
      return CODE.RECRUIT_SMALL_RESULT_RMR12;
    } else if (MRSelected === "経理・財務・会計・内部統制") {
      return CODE.RECRUIT_SMALL_RESULT_RMR13;
    } else if (MRSelected === "総務・法務・知財・内部監査") {
      return CODE.RECRUIT_SMALL_RESULT_RMR14;
    } else if (MRSelected === "物流管理（企画）・購買・貿易") {
      return CODE.RECRUIT_SMALL_RESULT_RMR15;
    } else if (
      MRSelected === "データアナリスト・データサイエンティスト・リサーチャー"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR16;
    } else if (MRSelected === "役員・事業統括マネジャー") {
      return CODE.RECRUIT_SMALL_RESULT_RMR17;
    } else if (MRSelected === "経営企画・事業企画・営業企画") {
      return CODE.RECRUIT_SMALL_RESULT_RMR18;
    } else if (MRSelected === "広報・IR") {
      return CODE.RECRUIT_SMALL_RESULT_RMR19;
    } else if (MRSelected === "人事") {
      return CODE.RECRUIT_SMALL_RESULT_RMR20;
    } else if (MRSelected === "ITコンサルタント・システムコンサルタント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR21;
    } else if (MRSelected === "プリセールス") {
      return CODE.RECRUIT_SMALL_RESULT_RMR22;
    } else if (MRSelected === "業務系アプリケーションエンジニア・プログラマ") {
      return CODE.RECRUIT_SMALL_RESULT_RMR23;
    } else if (MRSelected === "インフラエンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR24;
    } else if (MRSelected === "サポート・ヘルプデスク") {
      return CODE.RECRUIT_SMALL_RESULT_RMR25;
    } else if (MRSelected === "社内SE（社内情報システム）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR26;
    } else if (MRSelected === "研究開発（R&D）エンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR27;
    } else if (MRSelected === "品質管理") {
      return CODE.RECRUIT_SMALL_RESULT_RMR28;
    } else if (MRSelected === "データサイエンティスト") {
      return CODE.RECRUIT_SMALL_RESULT_RMR29;
    } else if (MRSelected === "プログラマ・Webサービス系エンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR30;
    } else if (MRSelected === "スマホアプリ・ネイティブアプリ系エンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR31;
    } else if (
      MRSelected === "制御系ソフトウェア開発（通信・ネットワーク・IoT関連）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR32;
    } else if (MRSelected === "セキュリティエンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR33;
    } else if (
      MRSelected === "基礎研究・先行開発・要素技術開発（組み込みソフトウエア）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR34;
    } else if (
      MRSelected === "プロジェクトマネージャー（組み込みソフトウエア）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR35;
    } else if (
      MRSelected ===
      "アプリケーション・ミドルウェア・デバイスドライバ・ファームウェア"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR36;
    } else if (
      MRSelected ===
      "品質管理・品質保証・テクニカルサポート（組み込みソフトウエア）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR37;
    } else if (MRSelected === "評価・デバッグ（デバッガ―）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR38;
    } else if (MRSelected === "ユーザーインタフェース") {
      return CODE.RECRUIT_SMALL_RESULT_RMR39;
    } else if (MRSelected === "画像処理") {
      return CODE.RECRUIT_SMALL_RESULT_RMR40;
    } else if (MRSelected === "音声処理") {
      return CODE.RECRUIT_SMALL_RESULT_RMR41;
    } else if (MRSelected === "プリセールス・アプリケーションエンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR42;
    } else if (MRSelected === "コンサルティング（品質・開発プロセスなど）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR43;
    } else if (MRSelected === "基礎研究・先行開発・要素技術開発") {
      return CODE.RECRUIT_SMALL_RESULT_RMR44;
    } else if (MRSelected === "機械設計") {
      return CODE.RECRUIT_SMALL_RESULT_RMR45;
    } else if (MRSelected === "品質管理・品質保証") {
      return CODE.RECRUIT_SMALL_RESULT_RMR46;
    } else if (MRSelected === "生産技術") {
      return CODE.RECRUIT_SMALL_RESULT_RMR47;
    } else if (
      MRSelected === "セールスエンジニア・アプリケーションエンジニア・FAE"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR48;
    } else if (MRSelected === "サービスエンジニア・サポートエンジニア") {
      return CODE.RECRUIT_SMALL_RESULT_RMR49;
    } else if (MRSelected === "その他技術職（機械・電気）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR50;
    } else if (MRSelected === "CADオペレーター（機械）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR51;
    } else if (MRSelected === "光学設計") {
      return CODE.RECRUIT_SMALL_RESULT_RMR52;
    } else if (MRSelected === "CAE解析") {
      return CODE.RECRUIT_SMALL_RESULT_RMR53;
    } else if (MRSelected === "回路設計") {
      return CODE.RECRUIT_SMALL_RESULT_RMR54;
    } else if (MRSelected === "電気設計・シーケンス制御") {
      return CODE.RECRUIT_SMALL_RESULT_RMR55;
    } else if (MRSelected === "評価・実験") {
      return CODE.RECRUIT_SMALL_RESULT_RMR56;
    } else if (MRSelected === "製品企画・プロジェクトマネージャー") {
      return CODE.RECRUIT_SMALL_RESULT_RMR57;
    } else if (MRSelected === "金型設計") {
      return CODE.RECRUIT_SMALL_RESULT_RMR58;
    } else if (MRSelected === "製造（溶接・加工・組立など）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR59;
    } else if (MRSelected === "生産管理・工場長") {
      return CODE.RECRUIT_SMALL_RESULT_RMR60;
    } else if (MRSelected === "デバイス開発（半導体・太陽光・液晶・LEDなど）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR61;
    } else if (
      MRSelected === "プロセスエンジニア（半導体・太陽光・液晶・LEDなど）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR62;
    } else if (MRSelected === "整備士") {
      return CODE.RECRUIT_SMALL_RESULT_RMR63;
    } else if (MRSelected === "テクニカルライター（マニュアル制作）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR64;
    } else if (MRSelected === "基礎・応用研究（化学）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR65;
    } else if (MRSelected === "製品開発（化学）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR66;
    } else if (MRSelected === "製造プロセス開発・工法開発（化学）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR67;
    } else if (MRSelected === "品質管理（化学）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR68;
    } else if (
      MRSelected ===
      "技術営業・アプリケーションエンジニア（化学・素材・化粧品・トイレタリー）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR69;
    } else if (MRSelected === "その他製造・生産") {
      return CODE.RECRUIT_SMALL_RESULT_RMR70;
    } else if (MRSelected === "分析・解析・測定・各種評価試験") {
      return CODE.RECRUIT_SMALL_RESULT_RMR71;
    } else if (MRSelected === "基礎・応用研究（化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR72;
    } else if (MRSelected === "製品開発（化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR73;
    } else if (
      MRSelected === "製造プロセス開発・工法開発（化粧品・トイレタリー）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR74;
    } else if (MRSelected === "生産管理（化学・素材・化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR75;
    } else if (MRSelected === "品質管理（化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR76;
    } else if (MRSelected === "品質保証・監査・化学法規（化学）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR77;
    } else if (MRSelected === "品質保証・監査・薬事（化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR78;
    } else if (MRSelected === "テクニカルサポート（技術系サポート職）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR79;
    } else if (MRSelected === "製造・生産（化学）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR80;
    } else if (MRSelected === "製造・生産（化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR81;
    } else if (MRSelected === "工場長（化学・素材・化粧品・トイレタリー）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR82;
    } else if (MRSelected === "基礎・応用研究（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR83;
    } else if (MRSelected === "製品開発（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR84;
    } else if (
      MRSelected === "製造プロセス開発・工法開発（食品・香料・飼料）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR85;
    } else if (MRSelected === "生産管理（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR86;
    } else if (MRSelected === "品質管理（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR87;
    } else if (MRSelected === "品質保証・監査（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR88;
    } else if (
      MRSelected === "技術営業・アプリケーションエンジニア（食品・香料・飼料）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR89;
    } else if (
      MRSelected ===
      "テクニカルサポート（技術系サポート職）（食品・香料・飼料）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR90;
    } else if (MRSelected === "製造・生産（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR91;
    } else if (
      MRSelected === "分析・解析・測定・各種評価試験（食品・香料・飼料）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR92;
    } else if (MRSelected === "工場長（食品・香料・飼料）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR93;
    } else if (MRSelected === "技術開発・部材開発・解析・調査") {
      return CODE.RECRUIT_SMALL_RESULT_RMR94;
    } else if (MRSelected === "建築設計・積算") {
      return CODE.RECRUIT_SMALL_RESULT_RMR95;
    } else if (MRSelected === "施工管理") {
      return CODE.RECRUIT_SMALL_RESULT_RMR96;
    } else if (
      MRSelected === "その他建設・建築・不動産・プラント・工場関連職"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR97;
    } else if (MRSelected === "プラント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR98;
    } else if (MRSelected === "職人・現場作業員") {
      return CODE.RECRUIT_SMALL_RESULT_RMR99;
    } else if (MRSelected === "不動産開発") {
      return CODE.RECRUIT_SMALL_RESULT_RMR100;
    } else if (MRSelected === "不動産運用・管理") {
      return CODE.RECRUIT_SMALL_RESULT_RMR101;
    } else if (MRSelected === "施設管理（技術系）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR102;
    } else if (MRSelected === "設備設計・積算") {
      return CODE.RECRUIT_SMALL_RESULT_RMR103;
    } else if (MRSelected === "土木設計・測量") {
      return CODE.RECRUIT_SMALL_RESULT_RMR104;
    } else if (
      MRSelected === "工場ファシリティ・ユーティリティ・労働安全衛生"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR105;
    } else if (MRSelected === "ビジネスコンサルタント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR106;
    } else if (MRSelected === "専門事務所（会計・監査法人・法律・労務）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR107;
    } else if (MRSelected === "出版・広告・販促・印刷") {
      return CODE.RECRUIT_SMALL_RESULT_RMR108;
    } else if (MRSelected === "映像・映画・音響・イベント・芸能関連") {
      return CODE.RECRUIT_SMALL_RESULT_RMR109;
    } else if (
      MRSelected === "ファッション（アパレル／アクセサリー／テキスタイル）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR110;
    } else if (
      MRSelected ===
      "プロダクトデザイナー／インダストリアルデザイナー（工業デザイナー）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR111;
    } else if (MRSelected === "その他クリエイティブ系職種") {
      return CODE.RECRUIT_SMALL_RESULT_RMR112;
    } else if (MRSelected === "Web制作・モバイル（制作・開発）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR113;
    } else if (MRSelected === "ソーシャル・ゲーム（制作・開発）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR114;
    } else if (MRSelected === "店舗・販売") {
      return CODE.RECRUIT_SMALL_RESULT_RMR115;
    } else if (MRSelected === "店舗開発・施設管理") {
      return CODE.RECRUIT_SMALL_RESULT_RMR116;
    } else if (
      MRSelected === "美容関連（理美容・エステ・マッサージ・美容部員）"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR117;
    } else if (MRSelected === "旅行関連") {
      return CODE.RECRUIT_SMALL_RESULT_RMR118;
    } else if (MRSelected === "宿泊施設・ホテル") {
      return CODE.RECRUIT_SMALL_RESULT_RMR119;
    } else if (MRSelected === "運輸・物流サービス") {
      return CODE.RECRUIT_SMALL_RESULT_RMR120;
    } else if (MRSelected === "警備／清掃／監視／保守") {
      return CODE.RECRUIT_SMALL_RESULT_RMR121;
    } else if (
      MRSelected === "テレマーケティング／カスタマーサポート／コールセンター"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR122;
    } else if (
      MRSelected === "教育／スクール／研修／塾講師／専門学校／英会話学校"
    ) {
      return CODE.RECRUIT_SMALL_RESULT_RMR123;
    } else if (MRSelected === "バイヤー／MD") {
      return CODE.RECRUIT_SMALL_RESULT_RMR124;
    } else if (MRSelected === "ブライダル・葬祭") {
      return CODE.RECRUIT_SMALL_RESULT_RMR125;
    } else if (MRSelected === "公務員（地方・国家公務員）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR126;
    } else if (MRSelected === "教員／日本語教師／学校・大学事務") {
      return CODE.RECRUIT_SMALL_RESULT_RMR127;
    } else if (MRSelected === "農林水産関連職") {
      return CODE.RECRUIT_SMALL_RESULT_RMR128;
    } else if (MRSelected === "経理事務・財務アシスタント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR129;
    } else if (MRSelected === "総務・法務・知財・人事アシスタント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR130;
    } else if (MRSelected === "購買・物流・貿易アシスタント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR131;
    } else if (MRSelected === "企画・マーケティングアシスタント") {
      return CODE.RECRUIT_SMALL_RESULT_RMR132;
    } else if (MRSelected === "金融事務") {
      return CODE.RECRUIT_SMALL_RESULT_RMR133;
    } else if (MRSelected === "医療事務") {
      return CODE.RECRUIT_SMALL_RESULT_RMR134;
    } else if (MRSelected === "秘書・受付") {
      return CODE.RECRUIT_SMALL_RESULT_RMR135;
    } else if (MRSelected === "通訳・翻訳") {
      return CODE.RECRUIT_SMALL_RESULT_RMR136;
    } else if (MRSelected === "営業事務・一般事務") {
      return CODE.RECRUIT_SMALL_RESULT_RMR137;
    } else if (MRSelected === "研究") {
      return CODE.RECRUIT_SMALL_RESULT_RMR138;
    } else if (MRSelected === "臨床開発") {
      return CODE.RECRUIT_SMALL_RESULT_RMR139;
    } else if (MRSelected === "薬事") {
      return CODE.RECRUIT_SMALL_RESULT_RMR140;
    } else if (MRSelected === "品質管理・品質保証") {
      return CODE.RECRUIT_SMALL_RESULT_RMR141;
    } else if (MRSelected === "技術サポート") {
      return CODE.RECRUIT_SMALL_RESULT_RMR142;
    } else if (MRSelected === "生産・製造・プロセス開発（医療系）") {
      return CODE.RECRUIT_SMALL_RESULT_RMR143;
    } else if (MRSelected === "メディカルアフェアーズ・学術") {
      return CODE.RECRUIT_SMALL_RESULT_RMR144;
    } else if (MRSelected === "ライセンシング") {
      return CODE.RECRUIT_SMALL_RESULT_RMR145;
    } else if (MRSelected === "医療・看護") {
      return CODE.RECRUIT_SMALL_RESULT_RMR146;
    } else if (MRSelected === "薬剤") {
      return CODE.RECRUIT_SMALL_RESULT_RMR147;
    } else if (MRSelected === "福祉") {
      return CODE.RECRUIT_SMALL_RESULT_RMR148;
    } else if (MRSelected === "医療系マーケティング") {
      return CODE.RECRUIT_SMALL_RESULT_RMR149;
    } else if (MRSelected === "開発") {
      return CODE.RECRUIT_SMALL_RESULT_RMR150;
    } else if (MRSelected === "運用") {
      return CODE.RECRUIT_SMALL_RESULT_RMR151;
    } else if (MRSelected === "投資銀行") {
      return CODE.RECRUIT_SMALL_RESULT_RMR152;
    } else if (MRSelected === "リサーチ") {
      return CODE.RECRUIT_SMALL_RESULT_RMR153;
    } else if (MRSelected === "審査・査定") {
      return CODE.RECRUIT_SMALL_RESULT_RMR154;
    } else if (MRSelected === "バックオフィス") {
      return CODE.RECRUIT_SMALL_RESULT_RMR155;
    } else {
      return [];
    }
  };
  const middleResultArray = smallResult();

  // clickValueの値
  // 0:初期値
  // 1:企業絞り込み変更時
  // 2:企業絞り込み検索ボタン押下時
  // 3:担当者絞り込み変更時
  // 4:担当者絞り込み検索ボタン押下時
  // 5:採用絞り込み変更時
  // 6:採用絞り込み検索ボタン押下時
  let clickValueFlg = true;
  if (clickValue === 2) {
    clickValueFlg = false;
  } else if (clickValue === 0 || clickValue === 1) {
    clickValueFlg = true;
  }
  let clickRecruitValueFlg = true;
  if (clickValue === 6) {
    clickRecruitValueFlg = false;
  } else if (clickValue === 0 || clickValue === 5) {
    clickRecruitValueFlg = true;
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
    clickValue === 3 ||
    clickValue === 4 ||
    clickValue === 5 ||
    corporateSearchClickFlg === true
  ) {
    if (props.corporateListCount >= 1 && props.corporateListCount <= 10000) {
      staffSearch = (
        <Card sx={{ mt: 1 }}>
          <Stack sx={{ m: 1 }} direction="row">
            <ManageSearchIcon />
            <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
              担当者 絞り込み
            </Typography>
          </Stack>
          <Grid container spacing={1} sx={{ mb: 1 }}>
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
                renderInput={(params) => (
                  <TextField {...params} label="ソース" />
                )}
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
  }

  return (
    <>
      <Card>
        <Stack sx={{ m: 1 }} direction="row">
          <ManageSearchIcon />
          <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
            企業 絞り込み
          </Typography>
        </Stack>
        <Grid container spacing={0}>
          <Grid item xs={1.5}>
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
              multiple
              options={industryOptions}
              groupBy={(industryOption) => industryOption.industry}
              getOptionLabel={(industryOption) => industryOption.sector}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => <TextField {...params} label="業種" />}
              onChange={businessCategoryChange}
              isOptionEqualToValue={(industryOption, value) =>
                industryOption.sector === value.sector
              }
              renderGroup={(params) => (
                <li key={params.key}>
                  <GroupHeader>{params.group}</GroupHeader>
                  {params.children}
                </li>
              )}
            />
          </Grid>
          <Grid item xs={2}>
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
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              売上(百万円)
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <TextField
                label=""
                size="small"
                onChange={minSalesAmountChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>―</Typography>
              <TextField
                label=""
                size="small"
                onChange={maxSalesAmountChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              従業員数(人)
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <TextField
                label=""
                size="small"
                onChange={minEmployeeNumberChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>―</Typography>
              <TextField
                label=""
                size="small"
                onChange={maxEmployeeNumberChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              設立(年)
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <TextField
                label="yyyy"
                size="small"
                onChange={minEstablishmentYearChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>―</Typography>
              <TextField
                label="yyyy"
                size="small"
                onChange={maxEstablishmentYearChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              資本金(百万円)
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <TextField
                label=""
                size="small"
                onChange={minCapitalStockChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>―</Typography>
              <TextField
                label=""
                size="small"
                onChange={maxCapitalStockChange}
              />
            </Stack>
          </Grid>
          {/* <Grid item xs={2.4}>
            <Autocomplete
              disablePortal
              options={Level1to10}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="レガシー企業レベル" />
              )}
              onChange={legacyCompanyChange}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Autocomplete
              disablePortal
              options={Level1to10}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="人的資本経営レベル" />
              )}
              onChange={humanCapitalRunningChange}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Autocomplete
              disablePortal
              options={Level1to10}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="研修強化レベル" />
              )}
              onChange={humanResourcesEducationalChange}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Autocomplete
              disablePortal
              options={Level1to10}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="新規事業推進レベル" />
              )}
              onChange={newBusinessChange}
            />
          </Grid> */}
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              サイトPV数
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <Autocomplete
                disablePortal
                options={MinSitePV}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={minSitePVChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>―</Typography>
              <Autocomplete
                disablePortal
                options={MaxSitePV}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={maxSitePVChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Typography sx={{ fontSize: 14, pl: 1, mb: -1 }}>
              平均年齢
            </Typography>
            <Stack sx={{ m: 1 }} direction="row">
              <Autocomplete
                disablePortal
                options={MinAverageAge}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={minAverageAgeChange}
              />
              <Typography sx={{ fontSize: 14, p: 0.5 }}>―</Typography>
              <Autocomplete
                disablePortal
                options={MaxAverageAge}
                size="small"
                sx={{ minWidth: 120 }}
                renderInput={(params) => <TextField {...params} label="" />}
                onChange={maxAverageAgeChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              disablePortal
              options={Advertising}
              size="small"
              sx={{ m: 1, mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="広告出稿" />
              )}
              onChange={advertisingChange}
            />
          </Grid>
          {/* <Grid item xs={2.4}>
            <Autocomplete
              disablePortal
              options={Documentpublish}
              size="small"
              sx={{ m: 1, mt: 2 }}
              renderInput={(params) => (
                <TextField {...params} label="資料掲載" />
              )}
              onChange={documentPublishChange}
            />
          </Grid>
          <Grid item xs={2.4}>
            <Autocomplete
              disablePortal
              options={SNS}
              size="small"
              sx={{ m: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="SNSアカウント" />
              )}
              onChange={SNSChange}
            />
          </Grid> */}
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              label="フリーテキスト"
              size="small"
              sx={{ m: 1, minWidth: 300 }}
              onChange={freeTextChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="除外フリーテキスト"
              size="small"
              sx={{ m: 1, minWidth: 300 }}
              onChange={exclusionFreeTextChange}
            />
          </Grid>
          <Grid item xs={2}></Grid>
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
      {/*<Card sx={{ mt: 1 }}>
        <Stack sx={{ m: 1 }} direction="row">
          <ManageSearchIcon />
          <Typography fontWeight="bold" sx={{ fontSize: 16, pl: 1 }}>
            採用 絞り込み
          </Typography>
        </Stack>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Autocomplete
              options={CODE.RECRUIT_BIG_RESULT}
              getOptionLabel={(option) => option.code}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="募集中の職種" />
              )}
              sx={{ m: 1 }}
              onChange={recruitBigResultChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              options={bigResultArray}
              getOptionLabel={(option) => option.code}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="募集中の職種(中項目)" />
              )}
              sx={{ m: 1 }}
              onChange={recruitMiddleResultChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              options={middleResultArray}
              getOptionLabel={(option) => option.code}
              size="small"
              renderInput={(params) => (
                <TextField {...params} label="募集中の職種(小項目)" />
              )}
              sx={{ m: 1 }}
              onChange={recruitSmallResultChange}
            />
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
              disabled={clickRecruitValueFlg}
              onClick={searchRecruitClick}
            >
              <SearchIcon />
              　検索
            </Button>
          </Grid>
        </Grid>
      </Card>*/}
      {staffSearch}
    </>
  );
};

export default Search;
