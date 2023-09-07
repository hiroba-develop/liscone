const ACTION = [
  { key: "AC01", code: "架電" },
  { key: "AC02", code: "メール" },
  { key: "AC03", code: "フォーム送信" },
  { key: "AC04", code: "日程調整" },
];

const BIG_RESULT = [
  { key: "BR01", code: "受付拒否" },
  { key: "BR02", code: "受付突破" },
  { key: "BR03", code: "担当者拒否" },
  { key: "BR04", code: "担当者止まり" },
  { key: "BR05", code: "アポ" },
  { key: "BR06", code: "送信済み" },
  { key: "BR07", code: "未送信" },
  { key: "BR08", code: "実施済み" },
  { key: "BR09", code: "未実施" },
];
const BIG_RESULT_AC01 = [
  { key: "BR01", code: "受付拒否" },
  { key: "BR02", code: "受付突破" },
  { key: "BR03", code: "担当者拒否" },
  { key: "BR04", code: "担当者止まり" },
  { key: "BR05", code: "アポ" },
];
const BIG_RESULT_AC02 = [
  { key: "BR06", code: "送信済み" },
  { key: "BR07", code: "未送信" },
];
const BIG_RESULT_AC03 = [
  { key: "BR06", code: "送信済み" },
  { key: "BR07", code: "未送信" },
];
const BIG_RESULT_AC04 = [
  { key: "BR08", code: "実施済み" },
  { key: "BR09", code: "未実施" },
];

const SMALL_RESULT = [
  { key: "SR01", code: "不通" },
  { key: "SR02", code: "営業お断り" },
  { key: "SR03", code: "不在" },
  { key: "SR04", code: "リモートワーク" },
  { key: "SR05", code: "受電代行" },
  { key: "SR06", code: "伝言を残した" },
  { key: "SR07", code: "該当者/該当部署なし" },
  { key: "SR08", code: "アポ" },
  { key: "SR09", code: "HPからお問合せ" },
  { key: "SR10", code: "資料送付" },
  { key: "SR11", code: "コンテンツ案内" },
  { key: "SR12", code: "日程送付済み" },
  { key: "SR13", code: "リマインド" },
  { key: "SR14", code: "実施済み" },
];
const SMALL_RESULT_BR01 = [{ key: "SR01", code: "不通" }];
const SMALL_RESULT_BR02 = [{ key: "SR02", code: "営業お断り" }];
const SMALL_RESULT_BR03 = [{ key: "SR03", code: "不在" }];
const SMALL_RESULT_BR04 = [{ key: "SR04", code: "リモートワーク" }];
const SMALL_RESULT_BR05 = [
  { key: "SR05", code: "受電代行" },
  { key: "SR06", code: "伝言を残した" },
  { key: "SR07", code: "該当者/該当部署なし" },
  { key: "SR08", code: "アポ" },
  { key: "SR09", code: "HPからお問合せ" },
];
const SMALL_RESULT_BR06 = [{ key: "SR10", code: "資料送付" }];
const SMALL_RESULT_BR07 = [{ key: "SR11", code: "コンテンツ案内" }];
const SMALL_RESULT_BR08 = [{ key: "SR12", code: "日程送付済み" }];
const SMALL_RESULT_BR09 = [
  { key: "SR13", code: "リマインド" },
  { key: "SR14", code: "実施済み" },
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
  BIG_RESULT,
  BIG_RESULT_AC01,
  BIG_RESULT_AC02,
  BIG_RESULT_AC03,
  BIG_RESULT_AC04,
  SMALL_RESULT,
  SMALL_RESULT_BR01,
  SMALL_RESULT_BR02,
  SMALL_RESULT_BR03,
  SMALL_RESULT_BR04,
  SMALL_RESULT_BR05,
  SMALL_RESULT_BR06,
  SMALL_RESULT_BR07,
  SMALL_RESULT_BR08,
  SMALL_RESULT_BR09,
  TRAN_STATUS,
};
