const ACTION = [
  { key: "AC01", code: "架電" },
  { key: "AC02", code: "メール" },
  { key: "AC03", code: "ウェビナー案内" },
  { key: "AC04", code: "資料送付" },
  { key: "AC05", code: "フォーム送信" },
  { key: "AC06", code: "ミーティング" },
];

const BIG_RESULT = [
  { key: "BR01", code: "受付拒否" },
  { key: "BR02", code: "受付突破" },
  { key: "BR03", code: "担当者拒否" },
  { key: "BR04", code: "担当者止まり" },
  { key: "BR05", code: "担当者突破" },
];

const SMALL_RESULT = [
  { key: "SR01", code: "電話番号なし/現在使われていない" },
  { key: "SR02", code: "不通" },
  { key: "SR03", code: "担当営業お断り/ガチャ切り者拒否" },
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
  { key: "SR19", code: "担当者メール送付突破" },
  { key: "SR20", code: "日程打診" },
  { key: "SR21", code: "アポ" },
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
  SMALL_RESULT,
  TRAN_STATUS,
};
