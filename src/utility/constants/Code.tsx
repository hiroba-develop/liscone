const ACTION = [
  { key: "AC01", code: "コール" },
  { key: "AC02", code: "メール" },
  { key: "AC03", code: "ウェビナー案内" },
  { key: "AC04", code: "資料送付" },
  { key: "AC05", code: "フォーム送信" },
  { key: "AC06", code: "ミーティング" },
];
const _ACTION = [
  { key: "AC01", code: "コール" },
  { key: "AC02", code: "メール" },
];
const BIG_RESULT = [
  { key: "BR01", code: "受付拒否" },
  { key: "BR02", code: "受付突破" },
  { key: "BR03", code: "担当者拒否" },
  { key: "BR04", code: "担当者止まり" },
  { key: "BR05", code: "担当者突破" },
  { key: "BR06", code: "送信済み" },
];

const BIG_RESULT_AC01 = [
  { key: "BR01", code: "受付拒否" },
  { key: "BR02", code: "受付突破" },
  { key: "BR03", code: "担当者拒否" },
  { key: "BR04", code: "担当者止まり" },
  { key: "BR05", code: "担当者突破" },
];
const BIG_RESULT_AC02 = [{ key: "BR06", code: "送信済み" }];

const SMALL_RESULT = [
  { key: "SR01", code: "電話番号なし" },
  { key: "SR02", code: "不通" },
  { key: "SR03", code: "営業お断り" },
  { key: "SR04", code: "担当者不在" },
  { key: "SR05", code: "リモートワーク" },
  { key: "SR06", code: "受電代行" },
  { key: "SR07", code: "担当者に伝言" },
  { key: "SR08", code: "お問い合わせフォーム" },
  { key: "SR09", code: "該当者・該当部署なし" },
  { key: "SR10", code: "担当者変更" },
  { key: "SR11", code: "折り返し待ち" },
  { key: "SR12", code: "サービス導入済" },
  { key: "SR13", code: "ニーズなし" },
  { key: "SR14", code: "本社・親会社が決定" },
  { key: "SR15", code: "ニーズあり" },
  { key: "SR16", code: "資料送付" },
  { key: "SR17", code: "別の担当を紹介" },
  { key: "SR18", code: "ウェビナー案内" },
  { key: "SR19", code: "メール送付" },
  { key: "SR20", code: "日程打診" },
  { key: "SR21", code: "アポ" },
];

const SMALL_RESULT_BR01 = [
  { key: "SR01", code: "電話番号なし" },
  { key: "SR02", code: "不通" },
  { key: "SR03", code: "営業お断り" },
  { key: "SR04", code: "担当者不在" },
  { key: "SR05", code: "リモートワーク" },
  { key: "SR06", code: "受電代行" },
  { key: "SR07", code: "担当者に伝言" },
  { key: "SR08", code: "お問い合わせフォーム" },
  { key: "SR09", code: "該当者・該当部署なし" },
];
const SMALL_RESULT_BR02 = [
  { key: "SR10", code: "担当者変更" },
  { key: "SR11", code: "折り返し待ち" },
];

const SMALL_RESULT_BR03 = [
  { key: "SR02", code: "不通" },
  { key: "SR03", code: "営業お断り" },
  { key: "SR12", code: "サービス導入済" },
  { key: "SR13", code: "ニーズなし" },
  { key: "SR14", code: "本社・親会社が決定" },
];

const SMALL_RESULT_BR04 = [
  { key: "SR15", code: "ニーズあり" },
  { key: "SR08", code: "お問い合わせフォーム" },
  { key: "SR16", code: "資料送付" },
  { key: "SR17", code: "別の担当を紹介" },
  { key: "SR18", code: "ウェビナー案内" },
  { key: "SR19", code: "メール送付" },
  { key: "SR20", code: "日程打診" },
];

const SMALL_RESULT_BR05 = [{ key: "SR21", code: "アポ" }];

const SMALL_RESULT_BR06 = [
  { key: "SR08", code: "お問い合わせフォーム" },
  { key: "SR16", code: "資料送付" },
  { key: "SR18", code: "ウェビナー案内" },
  { key: "SR20", code: "日程打診" },
];

const TRAN_STATUS = [
  { key: "TR01", code: "失注" },
  { key: "TR02", code: "契約" },
  { key: "TR03", code: "内示" },
  { key: "TR04", code: "決済者合意" },
  { key: "TR05", code: "有効商談" },
  { key: "TR06", code: "アポ" },
  { key: "TR07", code: "取引なし" },
];

export const CODE = {
  ACTION,
  _ACTION,
  BIG_RESULT,
  BIG_RESULT_AC01,
  BIG_RESULT_AC02,
  SMALL_RESULT,
  SMALL_RESULT_BR01,
  SMALL_RESULT_BR02,
  SMALL_RESULT_BR03,
  SMALL_RESULT_BR04,
  SMALL_RESULT_BR05,
  SMALL_RESULT_BR06,
  TRAN_STATUS,
};
