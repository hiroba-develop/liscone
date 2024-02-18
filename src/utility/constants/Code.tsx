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
  { key: "SR08", code: "HPからお問合せ" },
  { key: "SR09", code: "ニーズなし" },
  { key: "SR10", code: "予算NG" },
  { key: "SR11", code: "決裁権限なし" },
  { key: "SR12", code: "時期不明" },
  { key: "SR13", code: "ランクA" },
  { key: "SR14", code: "ランクB" },
  { key: "SR15", code: "ランクC" },
  { key: "SR16", code: "ランクD" },
  { key: "SR17", code: "ランクE" },
  { key: "SR18", code: "資料送付" },
  { key: "SR19", code: "コンテンツ案内" },
  { key: "SR20", code: "状況伺い" },
  { key: "SR21", code: "日程送付済み" },
  { key: "SR22", code: "リマインド" },
  { key: "SR23", code: "実施済み" },
];
const SMALL_RESULT_BR01 = [
  { key: "SR01", code: "不通" },
  { key: "SR02", code: "営業お断り" },
  { key: "SR03", code: "不在" },
  { key: "SR04", code: "リモートワーク" },
  { key: "SR05", code: "受電代行" },
  { key: "SR06", code: "伝言を残した" },
  { key: "SR07", code: "該当者/該当部署なし" },
  { key: "SR08", code: "HPからお問合せ" },
];
const SMALL_RESULT_BR02 = [
  { key: "SR02", code: "営業お断り" },
  { key: "SR03", code: "不在" },
  { key: "SR04", code: "リモートワーク" },
  { key: "SR06", code: "伝言を残した" },
  { key: "SR07", code: "該当者/該当部署なし" },
  { key: "SR08", code: "HPからお問合せ" },
];
const SMALL_RESULT_BR03 = [
  { key: "SR01", code: "不通" },
  { key: "SR02", code: "営業お断り" },
  { key: "SR07", code: "該当者/該当部署なし" },
  { key: "SR08", code: "HPからお問合せ" },
  { key: "SR09", code: "ニーズなし" },
  { key: "SR10", code: "予算NG" },
  { key: "SR11", code: "決裁権限なし" },
  { key: "SR12", code: "時期不明" },
];
const SMALL_RESULT_BR04 = [
  { key: "SR01", code: "不通" },
  { key: "SR02", code: "営業お断り" },
  { key: "SR07", code: "該当者/該当部署なし" },
  { key: "SR08", code: "HPからお問合せ" },
  { key: "SR09", code: "ニーズなし" },
  { key: "SR10", code: "予算NG" },
  { key: "SR11", code: "決裁権限なし" },
  { key: "SR12", code: "時期不明" },
];
const SMALL_RESULT_BR05 = [
  { key: "SR13", code: "ランクA" },
  { key: "SR14", code: "ランクB" },
  { key: "SR15", code: "ランクC" },
  { key: "SR16", code: "ランクD" },
  { key: "SR17", code: "ランクE" },
];
const SMALL_RESULT_BR06 = [
  { key: "SR18", code: "資料送付" },
  { key: "SR19", code: "コンテンツ案内" },
  { key: "SR20", code: "状況伺い" },
];
const SMALL_RESULT_BR07 = [
  { key: "SR18", code: "資料送付" },
  { key: "SR19", code: "コンテンツ案内" },
  { key: "SR20", code: "状況伺い" },
];
const SMALL_RESULT_BR08 = [
  { key: "SR21", code: "日程送付済み" },
  { key: "SR22", code: "リマインド" },
  { key: "SR23", code: "実施済み" },
];
const SMALL_RESULT_BR09 = [
  { key: "SR21", code: "日程送付済み" },
  { key: "SR22", code: "リマインド" },
  { key: "SR23", code: "実施済み" },
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

const RECRUIT_BIG_RESULT = [
  { key: "RBR01", code: "営業職" },
  { key: "RBR02", code: "企画・管理" },
  { key: "RBR03", code: "技術職（SE・インフラエンジニア・Webエンジニア）" },
  { key: "RBR04", code: "技術職（組み込みソフトウェア）" },
  { key: "RBR05", code: "技術職（機械・電気）" },
  { key: "RBR06", code: "技術職（化学・素材・化粧品・トイレタリー）" },
  { key: "RBR07", code: "技術職（食品・香料・飼料）" },
  {
    key: "RBR08",
    code: "技術職・専門職（建設・建築・不動産・プラント・工場）",
  },
  {
    key: "RBR09",
    code: "専門職（コンサルティングファーム・専門事務所・監査法人）",
  },
  { key: "RBR10", code: "クリエイター・クリエイティブ職" },
  { key: "RBR11", code: "販売・サービス職" },
  { key: "RBR12", code: "公務員・教員・農林水産関連職" },
  { key: "RBR13", code: "事務・アシスタント" },
  { key: "RBR14", code: "医療系専門職" },
  { key: "RBR15", code: "金融系専門職" },
];

const RECRUIT_MIDDLE_RESULT_RBR01 = [
  { key: "RMR01", code: "IT営業 " },
  { key: "RMR02", code: "半導体・電子部品・エレクトロニクス製品営業 " },
  { key: "RMR03", code: "自動車・装置・機械製品営業 " },
  { key: "RMR04", code: "原料・素材・化学製品営業 " },
  { key: "RMR05", code: "医療営業 " },
  { key: "RMR06", code: "食品・日用品・消費財営業 " },
  { key: "RMR07", code: "建設・土木・不動産・住宅営業 " },
  { key: "RMR08", code: "金融営業 " },
  { key: "RMR09", code: "広告・メディア営業 " },
  { key: "RMR10", code: "人材・求人広告営業 " },
  { key: "RMR11", code: "その他営業職 " },
];
const RECRUIT_MIDDLE_RESULT_RBR02 = [
  { key: "RMR12", code: "マーケティング・商品企画・広告宣伝 " },
  { key: "RMR13", code: "経理・財務・会計・内部統制 " },
  { key: "RMR14", code: "総務・法務・知財・内部監査 " },
  { key: "RMR15", code: "物流管理（企画）・購買・貿易 " },
  {
    key: "RMR16",
    code: "データアナリスト・データサイエンティスト・リサーチャー ",
  },
  { key: "RMR17", code: "役員・事業統括マネジャー " },
  { key: "RMR18", code: "経営企画・事業企画・営業企画 " },
  { key: "RMR19", code: "広報・IR " },
  { key: "RMR20", code: "人事 " },
];
const RECRUIT_MIDDLE_RESULT_RBR03 = [
  { key: "RMR21", code: "ITコンサルタント・システムコンサルタント " },
  { key: "RMR22", code: "プリセールス " },
  { key: "RMR23", code: "業務系アプリケーションエンジニア・プログラマ " },
  { key: "RMR24", code: "インフラエンジニア " },
  { key: "RMR25", code: "サポート・ヘルプデスク " },
  { key: "RMR26", code: "社内SE（社内情報システム） " },
  { key: "RMR27", code: "研究開発（R&D）エンジニア " },
  { key: "RMR28", code: "品質管理 " },
  { key: "RMR29", code: "データサイエンティスト " },
  { key: "RMR30", code: "プログラマ・Webサービス系エンジニア " },
  { key: "RMR31", code: "スマホアプリ・ネイティブアプリ系エンジニア " },
  {
    key: "RMR32",
    code: "制御系ソフトウェア開発（通信・ネットワーク・IoT関連） ",
  },
  { key: "RMR33", code: "セキュリティエンジニア " },
];
const RECRUIT_MIDDLE_RESULT_RBR04 = [
  {
    key: "RMR34",
    code: "基礎研究・先行開発・要素技術開発（組み込みソフトウエア） ",
  },
  { key: "RMR35", code: "プロジェクトマネージャー（組み込みソフトウエア） " },
  {
    key: "RMR36",
    code: "アプリケーション・ミドルウェア・デバイスドライバ・ファームウェア ",
  },
  {
    key: "RMR37",
    code: "品質管理・品質保証・テクニカルサポート（組み込みソフトウエア） ",
  },
  { key: "RMR38", code: "評価・デバッグ（デバッガ―） " },
  { key: "RMR39", code: "ユーザーインタフェース " },
  { key: "RMR40", code: "画像処理 " },
  { key: "RMR41", code: "音声処理 " },
  { key: "RMR42", code: "プリセールス・アプリケーションエンジニア " },
  { key: "RMR43", code: "コンサルティング（品質・開発プロセスなど） " },
];
const RECRUIT_MIDDLE_RESULT_RBR05 = [
  { key: "RMR44", code: "基礎研究・先行開発・要素技術開発 " },
  { key: "RMR45", code: "機械設計 " },
  { key: "RMR46", code: "品質管理・品質保証 " },
  { key: "RMR47", code: "生産技術 " },
  {
    key: "RMR48",
    code: "セールスエンジニア・アプリケーションエンジニア・FAE ",
  },
  { key: "RMR49", code: "サービスエンジニア・サポートエンジニア " },
  { key: "RMR50", code: "その他技術職（機械・電気） " },
  { key: "RMR51", code: "CADオペレーター（機械） " },
  { key: "RMR52", code: "光学設計 " },
  { key: "RMR53", code: "CAE解析 " },
  { key: "RMR54", code: "回路設計 " },
  { key: "RMR55", code: "電気設計・シーケンス制御 " },
  { key: "RMR56", code: "評価・実験 " },
  { key: "RMR57", code: "製品企画・プロジェクトマネージャー " },
  { key: "RMR58", code: "金型設計 " },
  { key: "RMR59", code: "製造（溶接・加工・組立など） " },
  { key: "RMR60", code: "生産管理・工場長 " },
  { key: "RMR61", code: "デバイス開発（半導体・太陽光・液晶・LEDなど） " },
  {
    key: "RMR62",
    code: "プロセスエンジニア（半導体・太陽光・液晶・LEDなど） ",
  },
  { key: "RMR63", code: "整備士 " },
  { key: "RMR64", code: "テクニカルライター（マニュアル制作） " },
];
const RECRUIT_MIDDLE_RESULT_RBR06 = [
  { key: "RMR65", code: "基礎・応用研究（化学） " },
  { key: "RMR66", code: "製品開発（化学） " },
  { key: "RMR67", code: "製造プロセス開発・工法開発（化学） " },
  { key: "RMR68", code: "品質管理（化学） " },
  {
    key: "RMR69",
    code: "技術営業・アプリケーションエンジニア（化学・素材・化粧品・トイレタリー） ",
  },
  { key: "RMR70", code: "その他製造・生産 " },
  { key: "RMR71", code: "分析・解析・測定・各種評価試験 " },
  { key: "RMR72", code: "基礎・応用研究（化粧品・トイレタリー） " },
  { key: "RMR73", code: "製品開発（化粧品・トイレタリー） " },
  { key: "RMR74", code: "製造プロセス開発・工法開発（化粧品・トイレタリー） " },
  { key: "RMR75", code: "生産管理（化学・素材・化粧品・トイレタリー） " },
  { key: "RMR76", code: "品質管理（化粧品・トイレタリー） " },
  { key: "RMR77", code: "品質保証・監査・化学法規（化学） " },
  { key: "RMR78", code: "品質保証・監査・薬事（化粧品・トイレタリー） " },
  { key: "RMR79", code: "テクニカルサポート（技術系サポート職） " },
  { key: "RMR80", code: "製造・生産（化学） " },
  { key: "RMR81", code: "製造・生産（化粧品・トイレタリー） " },
  { key: "RMR82", code: "工場長（化学・素材・化粧品・トイレタリー） " },
];
const RECRUIT_MIDDLE_RESULT_RBR07 = [
  { key: "RMR83", code: "基礎・応用研究（食品・香料・飼料） " },
  { key: "RMR84", code: "製品開発（食品・香料・飼料） " },
  { key: "RMR85", code: "製造プロセス開発・工法開発（食品・香料・飼料） " },
  { key: "RMR86", code: "生産管理（食品・香料・飼料） " },
  { key: "RMR87", code: "品質管理（食品・香料・飼料） " },
  { key: "RMR88", code: "品質保証・監査（食品・香料・飼料） " },
  {
    key: "RMR89",
    code: "技術営業・アプリケーションエンジニア（食品・香料・飼料） ",
  },
  {
    key: "RMR90",
    code: "テクニカルサポート（技術系サポート職）（食品・香料・飼料） ",
  },
  { key: "RMR91", code: "製造・生産（食品・香料・飼料） " },
  { key: "RMR92", code: "分析・解析・測定・各種評価試験（食品・香料・飼料） " },
  { key: "RMR93", code: "工場長（食品・香料・飼料） " },
];
const RECRUIT_MIDDLE_RESULT_RBR08 = [
  { key: "RMR94", code: "技術開発・部材開発・解析・調査 " },
  { key: "RMR95", code: "建築設計・積算 " },
  { key: "RMR96", code: "施工管理 " },
  { key: "RMR97", code: "その他建設・建築・不動産・プラント・工場関連職 " },
  { key: "RMR98", code: "プラント " },
  { key: "RMR99", code: "職人・現場作業員 " },
  { key: "RMR100", code: "不動産開発 " },
  { key: "RMR101", code: "不動産運用・管理 " },
  { key: "RMR102", code: "施設管理（技術系） " },
  { key: "RMR103", code: "設備設計・積算 " },
  { key: "RMR104", code: "土木設計・測量 " },
  { key: "RMR105", code: "工場ファシリティ・ユーティリティ・労働安全衛生 " },
];
const RECRUIT_MIDDLE_RESULT_RBR09 = [
  { key: "RMR106", code: "ビジネスコンサルタント " },
  { key: "RMR107", code: "専門事務所（会計・監査法人・法律・労務） " },
];
const RECRUIT_MIDDLE_RESULT_RBR10 = [
  { key: "RMR108", code: "出版・広告・販促・印刷 " },
  { key: "RMR109", code: "映像・映画・音響・イベント・芸能関連 " },
  {
    key: "RMR110",
    code: "ファッション（アパレル／アクセサリー／テキスタイル） ",
  },
  {
    key: "RMR111",
    code: "プロダクトデザイナー／インダストリアルデザイナー（工業デザイナー） ",
  },
  { key: "RMR112", code: "その他クリエイティブ系職種 " },
  { key: "RMR113", code: "Web制作・モバイル（制作・開発） " },
  { key: "RMR114", code: "ソーシャル・ゲーム（制作・開発） " },
];
const RECRUIT_MIDDLE_RESULT_RBR11 = [
  { key: "RMR115", code: "店舗・販売 " },
  { key: "RMR116", code: "店舗開発・施設管理 " },
  { key: "RMR117", code: "美容関連（理美容・エステ・マッサージ・美容部員） " },
  { key: "RMR118", code: "旅行関連 " },
  { key: "RMR119", code: "宿泊施設・ホテル " },
  { key: "RMR120", code: "運輸・物流サービス " },
  { key: "RMR121", code: "警備／清掃／監視／保守 " },
  {
    key: "RMR122",
    code: "テレマーケティング／カスタマーサポート／コールセンター ",
  },
  {
    key: "RMR123",
    code: "教育／スクール／研修／塾講師／専門学校／英会話学校 ",
  },
  { key: "RMR124", code: "バイヤー／MD " },
  { key: "RMR125", code: "ブライダル・葬祭 " },
];
const RECRUIT_MIDDLE_RESULT_RBR12 = [
  { key: "RMR126", code: "公務員（地方・国家公務員） " },
  { key: "RMR127", code: "教員／日本語教師／学校・大学事務 " },
  { key: "RMR128", code: "農林水産関連職 " },
];
const RECRUIT_MIDDLE_RESULT_RBR13 = [
  { key: "RMR129", code: "経理事務・財務アシスタント " },
  { key: "RMR130", code: "総務・法務・知財・人事アシスタント " },
  { key: "RMR131", code: "購買・物流・貿易アシスタント " },
  { key: "RMR132", code: "企画・マーケティングアシスタント " },
  { key: "RMR133", code: "金融事務 " },
  { key: "RMR134", code: "医療事務 " },
  { key: "RMR135", code: "秘書・受付 " },
  { key: "RMR136", code: "通訳・翻訳 " },
  { key: "RMR137", code: "営業事務・一般事務 " },
];
const RECRUIT_MIDDLE_RESULT_RBR14 = [
  { key: "RMR138", code: "研究 " },
  { key: "RMR139", code: "臨床開発 " },
  { key: "RMR140", code: "薬事" },
  { key: "RMR141", code: "品質管理・品質保証" },
  { key: "RMR142", code: "技術サポート " },
  { key: "RMR143", code: "生産・製造・プロセス開発（医療系） " },
  { key: "RMR144", code: "メディカルアフェアーズ・学術 " },
  { key: "RMR145", code: "ライセンシング " },
  { key: "RMR146", code: "医療・看護 " },
  { key: "RMR147", code: "薬剤 " },
  { key: "RMR148", code: "福祉 " },
  { key: "RMR149", code: "医療系マーケティング " },
];
const RECRUIT_MIDDLE_RESULT_RBR15 = [
  { key: "RMR150", code: "開発 " },
  { key: "RMR151", code: "運用 " },
  { key: "RMR152", code: "投資銀行 " },
  { key: "RMR153", code: "リサーチ " },
  { key: "RMR154", code: "審査・査定 " },
  { key: "RMR155", code: "バックオフィス " },
];
const RECRUIT_SMALL_RESULT_RMR01 = [
  { key: "RSR01", code: "IT法人営業（直販）" },
  { key: "RSR01", code: "IT法人営業（代理店）" },
  { key: "RSR01", code: "Web系（IT）ソリューション営業" },
  { key: "RSR01", code: "IT個人営業" },
];
const RECRUIT_SMALL_RESULT_RMR02 = [
  { key: "RSR01", code: "半導体・電子部品・エレクトロニクス製品営業（国内）" },
  { key: "RSR01", code: "半導体・電子部品・エレクトロニクス製品営業（海外）" },
];
const RECRUIT_SMALL_RESULT_RMR03 = [
  { key: "RSR01", code: "装置・工作機械・産業機械営業（国内）" },
  { key: "RSR01", code: "装置・工作機械・産業機械営業（海外）" },
  { key: "RSR01", code: "精密機械・計測機器・分析機器・光学製品営業（国内）" },
  { key: "RSR01", code: "精密機械・計測機器・分析機器・光学製品営業（海外）" },
  { key: "RSR01", code: "自動車・建機・自動車部品営業（国内）" },
  { key: "RSR01", code: "自動車・建機・自動車部品営業（海外）" },
];
const RECRUIT_SMALL_RESULT_RMR04 = [
  { key: "RSR01", code: "原料・素材・化学製品営業（国内）" },
  { key: "RSR01", code: "原料・素材・化学製品営業（海外）" },
];
const RECRUIT_SMALL_RESULT_RMR05 = [
  { key: "RSR01", code: "MR（製薬会社）" },
  { key: "RSR01", code: "医療機器営業（メディカル機器営業）" },
  { key: "RSR01", code: "OTC（一般用医薬品）" },
  { key: "RSR01", code: "MS・医薬品卸・代理店" },
  { key: "RSR01", code: "ライフサイエンス（理化学機器・試薬）" },
  { key: "RSR01", code: "その他医療系営業" },
];
const RECRUIT_SMALL_RESULT_RMR06 = [
  { key: "RSR01", code: "食品・飲料営業（国内）" },
  { key: "RSR01", code: "日用品・化粧品営業（国内）" },
  { key: "RSR01", code: "その他消費財営業（国内）" },
  {
    key: "RSR01",
    code: "食品・飲料・日用品・化粧品・その他消費財営業（海外）",
  },
];
const RECRUIT_SMALL_RESULT_RMR07 = [
  { key: "RSR01", code: "建設・不動産法人営業" },
  { key: "RSR01", code: "建設・不動産個人営業" },
];
const RECRUIT_SMALL_RESULT_RMR08 = [
  { key: "RSR01", code: "金融法人営業" },
  { key: "RSR01", code: "金融個人営業・ファイナンシャルプランナー" },
];
const RECRUIT_SMALL_RESULT_RMR09 = [
  { key: "RSR01", code: "広告・メディア法人営業（新規中心）" },
  { key: "RSR01", code: "広告・メディア法人営業（既存・ルートセールス中心）" },
  { key: "RSR01", code: "広告・メディア代理店営業・パートナーセールス" },
  { key: "RSR01", code: "広告・メディア個人営業" },
  { key: "RSR01", code: "広告・メディア海外営業" },
];
const RECRUIT_SMALL_RESULT_RMR10 = [
  { key: "RSR01", code: "派遣営業" },
  { key: "RSR01", code: "派遣コーディネーター" },
  { key: "RSR01", code: "人材紹介営業" },
  { key: "RSR01", code: "求人広告営業" },
  { key: "RSR01", code: "キャリアコンサルタント・キャリアアドバイザー" },
  { key: "RSR01", code: "ブティック・エグゼクティブ" },
  { key: "RSR01", code: "その他人材・コーディネーター・求人広告営業" },
];
const RECRUIT_SMALL_RESULT_RMR11 = [
  { key: "RSR01", code: "その他法人営業（新規中心）" },
  { key: "RSR01", code: "その他法人営業（既存・ルートセールス中心）" },
  { key: "RSR01", code: "その他代理店営業・パートナーセールス" },
  { key: "RSR01", code: "その他個人営業" },
  { key: "RSR01", code: "その他海外営業" },
];
const RECRUIT_SMALL_RESULT_RMR12 = [
  { key: "RSR01", code: "商品企画・サービス企画" },
  { key: "RSR01", code: "広告宣伝" },
  { key: "RSR01", code: "販売促進・PR" },
  { key: "RSR01", code: "MD" },
  { key: "RSR01", code: "Webマーケティング（ネット広告・販促PRなど）" },
  { key: "RSR01", code: "その他マーケティング・商品企画・広告宣伝" },
];
const RECRUIT_SMALL_RESULT_RMR13 = [
  { key: "RSR01", code: "経理（財務会計）" },
  { key: "RSR01", code: "財務" },
  { key: "RSR01", code: "管理会計" },
  { key: "RSR01", code: "内部統制" },
];
const RECRUIT_SMALL_RESULT_RMR14 = [
  { key: "RSR01", code: "総務" },
  { key: "RSR01", code: "法務" },
  { key: "RSR01", code: "知的財産（知財）・特許" },
  { key: "RSR01", code: "内部監査" },
];
const RECRUIT_SMALL_RESULT_RMR15 = [
  { key: "RSR01", code: "購買・調達・バイヤー・MD" },
  { key: "RSR01", code: "間接購買・総務購買" },
  { key: "RSR01", code: "物流管理（ベンダー管理・配送管理・受発注管理など）" },
  {
    key: "RSR01",
    code: "SCM企画・物流企画・需要予測（サプライチェーンマネジメント）",
  },
  { key: "RSR01", code: "貿易・国際業務（輸出入業務・通関など）" },
  { key: "RSR01", code: "倉庫管理・作業・在庫管理（ピッキング）" },
];
const RECRUIT_SMALL_RESULT_RMR16 = [
  { key: "RSR01", code: "リサーチャー（リサーチ）・市場調査" },
  { key: "RSR01", code: "データアナリスト・データサイエンティスト" },
];
const RECRUIT_SMALL_RESULT_RMR17 = [
  { key: "RSR01", code: "経営者・経営幹部・役員（CFO／CEO／COO）" },
  { key: "RSR01", code: "事業統括マネジャー" },
];
const RECRUIT_SMALL_RESULT_RMR18 = [
  { key: "RSR01", code: "経営企画" },
  { key: "RSR01", code: "事業企画・新規事業開発" },
  { key: "RSR01", code: "営業企画" },
];
const RECRUIT_SMALL_RESULT_RMR19 = [
  { key: "RSR01", code: "広報" },
  { key: "RSR01", code: "IR" },
];
const RECRUIT_SMALL_RESULT_RMR20 = [
  { key: "RSR01", code: "人事（教育・採用担当）" },
  { key: "RSR01", code: "人事（給与社保）" },
  { key: "RSR01", code: "人事（労務・人事制度）" },
  { key: "RSR01", code: "その他人事" },
];
const RECRUIT_SMALL_RESULT_RMR21 = [
  { key: "RSR01", code: "ITコンサルタント（アプリ）" },
  { key: "RSR01", code: "ITコンサルタント（インフラ）" },
];
const RECRUIT_SMALL_RESULT_RMR22 = [{ key: "RSR01", code: "プリセールス" }];
const RECRUIT_SMALL_RESULT_RMR23 = [
  {
    key: "RSR01",
    code: "システムエンジニア（Web・オープン系・パッケージ開発）",
  },
  { key: "RSR01", code: "システムエンジニア（汎用機系）" },
  {
    key: "RSR01",
    code: "プロジェクトマネジャー（Web・オープン系・パッケージ開発）",
  },
  { key: "RSR01", code: "システム・ITアーキテクト" },
  { key: "RSR01", code: "パッケージ導入・システム導入" },
];
const RECRUIT_SMALL_RESULT_RMR24 = [
  { key: "RSR01", code: "サーバーエンジニア（設計構築）" },
  { key: "RSR01", code: "ネットワークエンジニア（設計構築）" },
  { key: "RSR01", code: "データベースエンジニア" },
  { key: "RSR01", code: "プロジェクトマネージャー（インフラ）" },
  {
    key: "RSR01",
    code: "Webサービスエンジニア（ネットワーク・サーバー・データベース）",
  },
  { key: "RSR01", code: "運用・監視・保守（インフラ）" },
];
const RECRUIT_SMALL_RESULT_RMR25 = [
  { key: "RSR01", code: "テクニカルサポート・カスタマーサポート（IT製品）" },
  { key: "RSR01", code: "ヘルプデスク" },
];
const RECRUIT_SMALL_RESULT_RMR26 = [
  { key: "RSR01", code: "システム開発・運用（アプリ担当）" },
  { key: "RSR01", code: "システム構築・運用（インフラ担当）" },
  { key: "RSR01", code: "IT戦略・システム企画担当" },
];
const RECRUIT_SMALL_RESULT_RMR27 = [
  { key: "RSR01", code: "研究開発（R&D）エンジニア" },
];
const RECRUIT_SMALL_RESULT_RMR28 = [
  { key: "RSR01", code: "QAエンジニア・テスター" },
];
const RECRUIT_SMALL_RESULT_RMR29 = [
  { key: "RSR01", code: "データサイエンティスト・アナリスト" },
  { key: "RSR01", code: "データサイエンティスト・エンジニアリング" },
];
const RECRUIT_SMALL_RESULT_RMR30 = [
  { key: "RSR01", code: "Webサービス・プロジェクトマネジャー" },
  {
    key: "RSR01",
    code: "Webサービス系エンジニア（フロントエンド・サーバーサイド・フルスタック）",
  },
];
const RECRUIT_SMALL_RESULT_RMR31 = [
  { key: "RSR01", code: "スマホアプリ・ネイティブアプリ系エンジニア" },
];
const RECRUIT_SMALL_RESULT_RMR32 = [
  {
    key: "RSR01",
    code: "制御系ソフトウェア開発（通信・ネットワーク・IoT関連）",
  },
];
const RECRUIT_SMALL_RESULT_RMR33 = [
  { key: "RSR01", code: "セキュリティコンサルタント・アナリスト" },
  {
    key: "RSR01",
    code: "セキュリティエンジニア（脆弱性診断・ネットワークセキュリティ）",
  },
];
const RECRUIT_SMALL_RESULT_RMR34 = [
  { key: "RSR01", code: "基礎研究・先行開発・要素技術開発" },
];
const RECRUIT_SMALL_RESULT_RMR35 = [
  { key: "RSR01", code: "プロジェクトマネージャー" },
];
const RECRUIT_SMALL_RESULT_RMR36 = [
  { key: "RSR01", code: "機械・電子部品" },
  { key: "RSR01", code: "家電・AV機器・複合機" },
  { key: "RSR01", code: "パチンコ・パチスロ・遊戯機器" },
  { key: "RSR01", code: "医療機器" },
  { key: "RSR01", code: "スマホアプリ・ネイティブアプリ系エンジニア" },
  { key: "RSR01", code: "無線・通信機器" },
  { key: "RSR01", code: "半導体" },
  { key: "RSR01", code: "精密・計測・分析機器" },
  { key: "RSR01", code: "ストレージ（HDD・SSDなど）" },
  { key: "RSR01", code: "自動車・自動車部品・車載製品" },
  { key: "RSR01", code: "建機・その他輸送機器" },
  { key: "RSR01", code: "工作機械・産業機械・半導体製造装置・産業用ロボット" },
  { key: "RSR01", code: "ロボット（作業用ロボット・パワードスーツなど）" },
  {
    key: "RSR01",
    code: "その他アプリケーション・ミドルウェア・デバイスドライバ・ファームウェア",
  },
  { key: "RSR01", code: "iOS・Android" },
  { key: "RSR01", code: "ネットワーク・IoT" },
];
const RECRUIT_SMALL_RESULT_RMR37 = [
  { key: "RSR01", code: "家電・AV機器・複合機 （品質管理）" },
  { key: "RSR01", code: "機械・電子部品 （品質管理）" },
  { key: "RSR01", code: "医療機器 （品質管理）" },
  { key: "RSR01", code: "スマートフォン・タブレット・携帯端末 （品質管理）" },
  { key: "RSR01", code: "無線・通信機器 （品質管理）" },
  { key: "RSR01", code: "自動車・自動車部品・車載製品 （品質管理）" },
  {
    key: "RSR01",
    code: "工作機械・産業機械・半導体製造装置・産業用ロボット （品質管理）",
  },
  {
    key: "RSR01",
    code: "その他品質管理・品質保証・テクニカルサポート（組み込みソフトウエア）",
  },
];
const RECRUIT_SMALL_RESULT_RMR38 = [
  { key: "RSR01", code: "評価・デバッグ（デバッガ―）" },
];
const RECRUIT_SMALL_RESULT_RMR39 = [
  { key: "RSR01", code: "ユーザーインタフェース" },
];
const RECRUIT_SMALL_RESULT_RMR40 = [{ key: "RSR01", code: "画像処理" }];
const RECRUIT_SMALL_RESULT_RMR41 = [{ key: "RSR01", code: "音声処理" }];
const RECRUIT_SMALL_RESULT_RMR42 = [
  {
    key: "RSR01",
    code: "プリセールス・アプリケーションエンジニア（自動車業界向け）",
  },
  { key: "RSR01", code: "プリセールス（その他業界向け）" },
];
const RECRUIT_SMALL_RESULT_RMR43 = [
  { key: "RSR01", code: "コンサルティング（品質・開発プロセスなど）" },
];
const RECRUIT_SMALL_RESULT_RMR44 = [
  { key: "RSR01", code: "基礎研究・先行開発・要素技術開発（機械）" },
  { key: "RSR01", code: "基礎研究・先行開発・要素技術開発（電気）" },
];
const RECRUIT_SMALL_RESULT_RMR45 = [
  { key: "RSR01", code: "機械・電子部品・コネクタ設計" },
  { key: "RSR01", code: "家電・AV・スマートフォン・携帯端末・複合機設計" },
  { key: "RSR01", code: "医療機器設計" },
  { key: "RSR01", code: "精密・計測・分析機器設計" },
  { key: "RSR01", code: "自動車・自動車部品設計" },
  { key: "RSR01", code: "工作機械・産業機械・ロボット設計" },
  { key: "RSR01", code: "半導体製造装置設計" },
  { key: "RSR01", code: "その他機械設計" },
  { key: "RSR01", code: "パチンコ・パチスロ・遊戯機器設計" },
  { key: "RSR01", code: "無線・通信機器設計" },
  { key: "RSR01", code: "建機・その他輸送機器設計" },
  { key: "RSR01", code: "プラント機器・設備設計" },
];
const RECRUIT_SMALL_RESULT_RMR46 = [
  { key: "RSR01", code: "品質管理（機械）" },
  { key: "RSR01", code: "品質管理（電気・電子・半導体）" },
  { key: "RSR01", code: "品質保証（機械）" },
  { key: "RSR01", code: "品質保証（電気・電子・半導体）" },
];
const RECRUIT_SMALL_RESULT_RMR47 = [
  { key: "RSR01", code: "工程設計・工法開発・工程改善・IE（機械・金属加工）" },
  { key: "RSR01", code: "設備立ち上げ・設計（電気・制御設計）" },
  { key: "RSR01", code: "設備保全" },
  { key: "RSR01", code: "工程設計・工法開発・工程改善・IE（樹脂成形）" },
  {
    key: "RSR01",
    code: "工程設計・工法開発・工程改善・IE（組立・アッセンブリ）",
  },
  { key: "RSR01", code: "工程設計・工法開発・工程改善・IE（その他）" },
  { key: "RSR01", code: "設備立ち上げ・設計（機械設計）" },
];
const RECRUIT_SMALL_RESULT_RMR48 = [
  { key: "RSR01", code: "家電・AV・携帯端末・複合機エンジニア" },
  { key: "RSR01", code: "医療機器エンジニア" },
  { key: "RSR01", code: "精密・計測・分析機器エンジニア" },
  { key: "RSR01", code: "自動車・自動車部品エンジニア" },
  { key: "RSR01", code: "建機・その他輸送機器エンジニア" },
  { key: "RSR01", code: "半導体エンジニア" },
  { key: "RSR01", code: "半導体製造装置エンジニア" },
  {
    key: "RSR01",
    code: "その他セールスエンジニア・アプリケーションエンジニア・FAE",
  },
  { key: "RSR01", code: "基地局・無線機器・通信機器エンジニア" },
  { key: "RSR01", code: "工作機械・産業機械・ロボットエンジニア" },
  { key: "RSR01", code: "プラント機器・設備エンジニア" },
  { key: "RSR01", code: "機械・電子部品・コネクタエンジニア" },
  { key: "RSR01", code: "ソフトウェア（CAD・CAM・CAE）" },
  { key: "RSR01", code: "ソフトウェア（その他）" },
];
const RECRUIT_SMALL_RESULT_RMR49 = [
  {
    key: "RSR01",
    code: "自動車・航空・建機・その他輸送機器サービスエンジニア",
  },
  { key: "RSR01", code: "家電・AV・携帯端末・複合機サービスエンジニア" },
  { key: "RSR01", code: "医療機器サービスエンジニア" },
  { key: "RSR01", code: "精密・計測・分析機器サービスエンジニア" },
  { key: "RSR01", code: "工作機械・産業機械・ロボットサービスエンジニア" },
  { key: "RSR01", code: "半導体製造装置サービスエンジニア" },
  { key: "RSR01", code: "その他サービスエンジニア" },
  { key: "RSR01", code: "基地局・無線機器・通信機器サービスエンジニア" },
  { key: "RSR01", code: "機械・電子部品サービスエンジニア" },
  { key: "RSR01", code: "プラント機器・設備サービスエンジニア" },
];
const RECRUIT_SMALL_RESULT_RMR50 = [
  { key: "RSR01", code: "その他技術職（機械・電気）" },
];
const RECRUIT_SMALL_RESULT_RMR51 = [
  { key: "RSR01", code: "CADオペレーター（機械）" },
];
const RECRUIT_SMALL_RESULT_RMR52 = [{ key: "RSR01", code: "光学設計" }];
const RECRUIT_SMALL_RESULT_RMR53 = [
  { key: "RSR01", code: "CAE解析（熱・流体）" },
  { key: "RSR01", code: "CAE解析（構造・応力・衝突・振動）" },
  { key: "RSR01", code: "CAE解析（電磁界・電磁場）" },
  { key: "RSR01", code: "CAE解析（その他）" },
];
const RECRUIT_SMALL_RESULT_RMR54 = [
  { key: "RSR01", code: "アナログ（電源）回路設計" },
  { key: "RSR01", code: "アナログ（パワーエレクトロニクス）回路設計" },
  { key: "RSR01", code: "アナログ（高周波・RF・通信）回路設計" },
  { key: "RSR01", code: "アナログ（その他アナログ）回路設計" },
  { key: "RSR01", code: "デジタル（マイコン・CPU・DSP）回路設計" },
  { key: "RSR01", code: "デジタル（FPGA）回路設計" },
  { key: "RSR01", code: "デジタル（その他デジタル）回路設計" },
  { key: "RSR01", code: "半導体・IC（アナログ）回路設計" },
  { key: "RSR01", code: "半導体・IC（デジタル）回路設計" },
  { key: "RSR01", code: "半導体・IC（メモリ）回路設計" },
  { key: "RSR01", code: "半導体・IC（その他IC）回路設計" },
  { key: "RSR01", code: "レイアウト回路設計" },
];
const RECRUIT_SMALL_RESULT_RMR55 = [
  { key: "RSR01", code: "シーケンス制御（PLC・シーケンス・ラダー）" },
  { key: "RSR01", code: "電気設計（工作機械・装置・設備・制御盤など）" },
];
const RECRUIT_SMALL_RESULT_RMR56 = [
  { key: "RSR01", code: "評価・実験（機械）" },
  { key: "RSR01", code: "評価・実験（電気・電子・半導体）" },
];
const RECRUIT_SMALL_RESULT_RMR57 = [
  { key: "RSR01", code: "製品企画・プロジェクトマネージャー（電気）" },
  { key: "RSR01", code: "製品企画・プロジェクトマネージャー（機械）" },
];
const RECRUIT_SMALL_RESULT_RMR58 = [
  { key: "RSR01", code: "プレス金型設計" },
  { key: "RSR01", code: "射出成型金型設計" },
  { key: "RSR01", code: "その他金型設計" },
];
const RECRUIT_SMALL_RESULT_RMR59 = [
  { key: "RSR01", code: "機械・金属加工" },
  { key: "RSR01", code: "組立・その他製造職" },
];
const RECRUIT_SMALL_RESULT_RMR60 = [
  { key: "RSR01", code: "生産管理（機械・電気）" },
  { key: "RSR01", code: "工場長（機械・電気）" },
];
const RECRUIT_SMALL_RESULT_RMR61 = [
  { key: "RSR01", code: "デバイス開発（パワー半導体）" },
  { key: "RSR01", code: "デバイス開発（LED・発光デバイス・光半導体）" },
  { key: "RSR01", code: "デバイス開発（メモリ）" },
  { key: "RSR01", code: "デバイス開発（その他半導体）" },
  { key: "RSR01", code: "デバイス開発（太陽光・液晶など）" },
  { key: "RSR01", code: "デバイス開発（センサー）" },
];
const RECRUIT_SMALL_RESULT_RMR62 = [
  { key: "RSR01", code: "プロセスインテグレーション" },
  { key: "RSR01", code: "プロセスエンジニア（前工程）" },
  { key: "RSR01", code: "プロセスエンジニア（後工程）" },
];
const RECRUIT_SMALL_RESULT_RMR63 = [
  { key: "RSR01", code: "整備士（自動車・建機・航空機など）" },
];
const RECRUIT_SMALL_RESULT_RMR64 = [
  { key: "RSR01", code: "テクニカルライター（マニュアル制作）" },
];
const RECRUIT_SMALL_RESULT_RMR65 = [
  { key: "RSR01", code: "基礎・応用研究（有機）" },
  { key: "RSR01", code: "基礎・応用研究（高分子）" },
  { key: "RSR01", code: "基礎・応用研究（ガラス・セラミック）" },
  { key: "RSR01", code: "基礎・応用研究（カーボン）" },
  { key: "RSR01", code: "基礎・応用研究（金属・鉄鋼）" },
  { key: "RSR01", code: "基礎・応用研究（非鉄金属）" },
  { key: "RSR01", code: "基礎・応用研究（その他無機）" },
  { key: "RSR01", code: "基礎・応用研究（有機金属・錯体・触媒）" },
];
const RECRUIT_SMALL_RESULT_RMR66 = [
  { key: "RSR01", code: "製品開発（有機）" },
  { key: "RSR01", code: "製品開発（高分子）" },
  { key: "RSR01", code: "製品開発（ガラス・セラミック）" },
  { key: "RSR01", code: "製品開発（カーボン）" },
  { key: "RSR01", code: "製品開発（金属・鉄鋼）" },
  { key: "RSR01", code: "製品開発（非鉄金属）" },
  { key: "RSR01", code: "製品開発（その他無機）" },
  { key: "RSR01", code: "製品開発（有機金属・錯体・触媒）" },
];
const RECRUIT_SMALL_RESULT_RMR67 = [
  { key: "RSR01", code: "製造プロセス開発・工法開発（合成・重合）" },
  {
    key: "RSR01",
    code: "製造プロセス開発・工法開発（配合設計品）（塗料・接着剤など）",
  },
  { key: "RSR01", code: "製造プロセス開発・工法開発（加工成型）（樹脂）" },
  {
    key: "RSR01",
    code: "製造プロセス開発・工法開発（加工成型）（金属・鉄鋼・ガラス）",
  },
  {
    key: "RSR01",
    code: "製造プロセス開発・工法開発（無機・セラミック・非鉄金属）",
  },
  {
    key: "RSR01",
    code: "製造プロセス開発・工法開発（半導体・太陽光・液晶・LEDなど）",
  },
];
const RECRUIT_SMALL_RESULT_RMR68 = [
  { key: "RSR01", code: "品質管理（化学品・化成品・化学原料など）" },
  {
    key: "RSR01",
    code: "品質管理（加工成型品・樹脂・金属・鉄鋼・ガラスなど）",
  },
];
const RECRUIT_SMALL_RESULT_RMR69 = [
  {
    key: "RSR01",
    code: "技術営業・アプリケーションエンジニア（化学・素材・化粧品・トイレタリー）",
  },
];
const RECRUIT_SMALL_RESULT_RMR70 = [{ key: "RSR01", code: "その他製造・生産" }];
const RECRUIT_SMALL_RESULT_RMR71 = [
  { key: "RSR01", code: "分析・解析・測定・各種評価試験（化学）" },
  {
    key: "RSR01",
    code: "分析・解析・測定・各種評価試験（化粧品・トイレタリー）",
  },
];
const RECRUIT_SMALL_RESULT_RMR72 = [
  { key: "RSR01", code: "基礎・応用研究（化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR73 = [
  { key: "RSR01", code: "製品開発（化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR74 = [
  { key: "RSR01", code: "製造プロセス開発・工法開発（化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR75 = [
  { key: "RSR01", code: "生産管理（化学・素材・化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR76 = [
  { key: "RSR01", code: "品質管理（化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR77 = [
  { key: "RSR01", code: "品質保証・監査（化学品・化成品・化学原料など）" },
  {
    key: "RSR01",
    code: "品質保証・監査（加工成型品）（樹脂・金属・鉄鋼・ガラスなど）",
  },
  { key: "RSR01", code: "化学法規" },
];
const RECRUIT_SMALL_RESULT_RMR78 = [
  { key: "RSR01", code: "品質保証・監査" },
  { key: "RSR01", code: "申請・薬事" },
];
const RECRUIT_SMALL_RESULT_RMR79 = [
  { key: "RSR01", code: "テクニカルサポート（技術系サポート職）" },
];
const RECRUIT_SMALL_RESULT_RMR80 = [
  { key: "RSR01", code: "製造・生産リーダー（化学）" },
  { key: "RSR01", code: "製造・生産オペレーター（化学）" },
];
const RECRUIT_SMALL_RESULT_RMR81 = [
  { key: "RSR01", code: "製造・生産リーダー（化粧品・トイレタリー）" },
  { key: "RSR01", code: "製造・生産オペレーター（化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR82 = [
  { key: "RSR01", code: "工場長（化学・素材・化粧品・トイレタリー）" },
];
const RECRUIT_SMALL_RESULT_RMR83 = [
  { key: "RSR01", code: "基礎・応用研究（食品原料・機能性素材物質原料）" },
  { key: "RSR01", code: "基礎・応用研究（食品アプリケーション）" },
  { key: "RSR01", code: "基礎・応用研究（食品メニュー開発・中食・外食）" },
  { key: "RSR01", code: "基礎・応用研究（香料）" },
  { key: "RSR01", code: "基礎・応用研究（飼料・ペットフード）" },
];
const RECRUIT_SMALL_RESULT_RMR84 = [
  { key: "RSR01", code: "製品開発（食品原料・機能性素材物質原料）" },
  { key: "RSR01", code: "製品開発（食品アプリケーション）" },
  { key: "RSR01", code: "製品開発（食品メニュー開発・中食・外食）" },
  { key: "RSR01", code: "製品開発（香料）" },
  { key: "RSR01", code: "製品開発（飼料・ペットフード）" },
];
const RECRUIT_SMALL_RESULT_RMR85 = [
  { key: "RSR01", code: "製造プロセス開発・工法開発（食品・飲料プラント）" },
  { key: "RSR01", code: "製造プロセス開発・工法開発（製造ライン）" },
];
const RECRUIT_SMALL_RESULT_RMR86 = [
  { key: "RSR01", code: "生産管理（食品・香料・飼料）" },
];
const RECRUIT_SMALL_RESULT_RMR87 = [
  { key: "RSR01", code: "品質管理（食品・香料・飼料）" },
];
const RECRUIT_SMALL_RESULT_RMR88 = [
  { key: "RSR01", code: "品質保証・監査（食品・香料・飼料）" },
];
const RECRUIT_SMALL_RESULT_RMR89 = [
  {
    key: "RSR01",
    code: "技術営業・アプリケーションエンジニア（食品・香料・飼料）",
  },
];
const RECRUIT_SMALL_RESULT_RMR90 = [
  {
    key: "RSR01",
    code: "テクニカルサポート（技術系サポート職）（食品・香料・飼料）",
  },
];
const RECRUIT_SMALL_RESULT_RMR91 = [
  { key: "RSR01", code: "製造・生産リーダー（食品・香料・飼料）" },
  { key: "RSR01", code: "製造・生産オペレーター（食品・香料・飼料）" },
];
const RECRUIT_SMALL_RESULT_RMR92 = [
  { key: "RSR01", code: "分析・解析・測定・各種評価試験（食品・香料・飼料）" },
];
const RECRUIT_SMALL_RESULT_RMR93 = [
  { key: "RSR01", code: "工場長（食品・香料・飼料）" },
];
const RECRUIT_SMALL_RESULT_RMR94 = [
  { key: "RSR01", code: "技術開発・工法開発（建築・土木）" },
  { key: "RSR01", code: "部材開発・建材開発（建築・土木）" },
  { key: "RSR01", code: "構造解析・耐震診断（建築・土木）" },
];
const RECRUIT_SMALL_RESULT_RMR95 = [
  { key: "RSR01", code: "建築意匠設計" },
  { key: "RSR01", code: "建築構造設計" },
  { key: "RSR01", code: "製図・CADオペレーター（建築設計）" },
  { key: "RSR01", code: "内装設計・インテリア・空間デザイン" },
  { key: "RSR01", code: "積算（建築設計）" },
  { key: "RSR01", code: "設計監理" },
  { key: "RSR01", code: "内装設計（店舗）" },
  { key: "RSR01", code: "内装設計・リフォーム・インテリア（住宅）" },
  { key: "RSR01", code: "内装設計（オフィス）" },
];
const RECRUIT_SMALL_RESULT_RMR96 = [
  { key: "RSR01", code: "建築施工管理（RC造・S造・SRC造）" },
  { key: "RSR01", code: "建築施工管理（木造）" },
  { key: "RSR01", code: "建築施工管理（店舗内装）" },
  { key: "RSR01", code: "建築施工管理（住宅内装・リフォーム・インテリア）" },
  { key: "RSR01", code: "建築施工管理（オフィス内装）" },
  { key: "RSR01", code: "設備施工管理（電気）" },
  { key: "RSR01", code: "設備施工管理（空調・衛生設備）" },
  { key: "RSR01", code: "設備施工管理（通信設備／消防・防災設備）" },
  { key: "RSR01", code: "土木施工管理（橋梁）" },
  {
    key: "RSR01",
    code: "土木施工管理（トンネル・道路・造成・ダム・河川・港湾・造園など）",
  },
  { key: "RSR01", code: "土木施工管理（上下水道）" },
  { key: "RSR01", code: "その他設備施工管理" },
];
const RECRUIT_SMALL_RESULT_RMR97 = [
  { key: "RSR01", code: "その他建設・建築・不動産・プラント・工場関連職" },
];
const RECRUIT_SMALL_RESULT_RMR98 = [
  { key: "RSR01", code: "プラントプロジェクトマネジメント（国内）" },
  { key: "RSR01", code: "プラントプロジェクトマネジメント（海外）" },
  { key: "RSR01", code: "プラント設計（建築・土木）" },
  { key: "RSR01", code: "プラント設計（電気・計装）" },
  { key: "RSR01", code: "プラント設計（機械）" },
  { key: "RSR01", code: "プラント設計（プロセス）" },
  { key: "RSR01", code: "プラント施工管理（建築・土木）" },
  { key: "RSR01", code: "プラント施工管理（電気・計装）" },
  { key: "RSR01", code: "プラント施工管理（機械）" },
  { key: "RSR01", code: "資材調達（プラント）" },
  { key: "RSR01", code: "オペレーション・試運転（プラント）" },
  { key: "RSR01", code: "解析・調査（プラント）" },
  { key: "RSR01", code: "メンテナンス（プラント）" },
];
const RECRUIT_SMALL_RESULT_RMR99 = [
  { key: "RSR01", code: "大工・とび・左官・設備など" },
];
const RECRUIT_SMALL_RESULT_RMR100 = [
  { key: "RSR01", code: "不動産開発企画" },
  { key: "RSR01", code: "コンストラクションマネジメント・PM・FM（施主側）" },
  { key: "RSR01", code: "不動産仕入（用地・一棟・区分）" },
  { key: "RSR01", code: "デューデリジェンス（建築）" },
  { key: "RSR01", code: "デューデリジェンス（不動産鑑定評価）" },
  { key: "RSR01", code: "品質管理・安全管理（技術系）" },
];
const RECRUIT_SMALL_RESULT_RMR101 = [
  { key: "RSR01", code: "アセットマネジメント（アセットマネジャー）" },
  { key: "RSR01", code: "プロパティマネジメント（オフィス）" },
  { key: "RSR01", code: "プロパティマネジメント（商業施設・その他）" },
  { key: "RSR01", code: "プロパティマネジメント（住居・賃貸管理）" },
  { key: "RSR01", code: "ビル・建物管理" },
  { key: "RSR01", code: "分譲マンション管理" },
  { key: "RSR01", code: "マンション管理（技術系）" },
  { key: "RSR01", code: "アフターメンテナンス（マンション・戸建）" },
];
const RECRUIT_SMALL_RESULT_RMR102 = [
  { key: "RSR01", code: "ビルマネジメント（商業施設・店舗・オフィス）" },
  { key: "RSR01", code: "ビルメンテナンス（商業施設・店舗・オフィス）" },
];
const RECRUIT_SMALL_RESULT_RMR103 = [
  { key: "RSR01", code: "電気設備設計" },
  { key: "RSR01", code: "空調・衛生設備" },
  { key: "RSR01", code: "通信設備／消防・防災設備" },
  { key: "RSR01", code: "製図・CADオペレーター（設備設計）" },
  { key: "RSR01", code: "積算（設備設計）" },
];
const RECRUIT_SMALL_RESULT_RMR104 = [
  { key: "RSR01", code: "土木設計・測量（都市計画・環境）" },
  { key: "RSR01", code: "土木設計・測量（橋梁）" },
  { key: "RSR01", code: "土木設計・測量（トンネル・道路・造成）" },
  { key: "RSR01", code: "土木設計・測量（ダム・河川・港湾）" },
  { key: "RSR01", code: "土木設計・測量（上下水道）" },
  { key: "RSR01", code: "製図・CADオペレーター（土木設計）" },
  { key: "RSR01", code: "測量" },
  { key: "RSR01", code: "土壌・地質・地盤調査" },
];
const RECRUIT_SMALL_RESULT_RMR105 = [
  { key: "RSR01", code: "工場ファシリティ・ユーティリティ（電気・空調衛生）" },
  { key: "RSR01", code: "労働安全衛生（EHS・HSE）" },
];
const RECRUIT_SMALL_RESULT_RMR106 = [
  { key: "RSR01", code: "戦略・経営コンサルタント" },
  { key: "RSR01", code: "組織・人事コンサルタント" },
  { key: "RSR01", code: "業務改革コンサルタント（BPR）" },
  { key: "RSR01", code: "リスクコンサルタント" },
  { key: "RSR01", code: "その他ビジネスコンサルタント" },
  { key: "RSR01", code: "会計コンサルタント・財務アドバイザリー" },
  {
    key: "RSR01",
    code: "製造業コンサルタント（製品開発・生産技術・品質管理）",
  },
];
const RECRUIT_SMALL_RESULT_RMR107 = [
  { key: "RSR01", code: "会計士・会計専門職" },
  { key: "RSR01", code: "弁護士" },
  { key: "RSR01", code: "弁理士・特許技術者" },
  { key: "RSR01", code: "司法書士" },
  { key: "RSR01", code: "行政書士" },
  { key: "RSR01", code: "社会保険労務士" },
  { key: "RSR01", code: "税理士" },
];
const RECRUIT_SMALL_RESULT_RMR108 = [
  {
    key: "RSR01",
    code: "プロデューサー・ディレクター・プランナー（出版・広告・販促・印刷）",
  },
  { key: "RSR01", code: "デザイナー（グラフィック・その他）" },
  { key: "RSR01", code: "その他出版・広告・販促・印刷関連" },
  { key: "RSR01", code: "アートディレクター（出版・広告・販促・印刷）" },
  { key: "RSR01", code: "編集・記者・ライター" },
  { key: "RSR01", code: "DTPオペレーター" },
];
const RECRUIT_SMALL_RESULT_RMR109 = [
  {
    key: "RSR01",
    code: "プロデューサー・ディレクター・プランナー（映像・映画・音響・イベント・芸能関連）",
  },
  { key: "RSR01", code: "AP（アシスタントプロデューサー）・AD・制作進行管理" },
  { key: "RSR01", code: "脚本家・放送作家・シナリオライター" },
  {
    key: "RSR01",
    code: "サウンドクリエイター（映像・映画・音響・イベント・芸能関連）",
  },
  { key: "RSR01", code: "その他映像・音響・イベント・芸能関連" },
  { key: "RSR01", code: "制作技術（実写・アニメ・音響・カメラ・舞台）" },
  { key: "RSR01", code: "芸能マネジャー" },
];
const RECRUIT_SMALL_RESULT_RMR110 = [
  {
    key: "RSR01",
    code: "ファッション（服飾）デザイナー・パタンナー・スタイリスト",
  },
  { key: "RSR01", code: "VMD" },
  {
    key: "RSR01",
    code: "その他ファッション（アパレル・アクセサリー・テキスタイル）",
  },
];
const RECRUIT_SMALL_RESULT_RMR111 = [
  {
    key: "RSR01",
    code: "プロダクトデザイナー・インダストリアルデザイナー（工業デザイナー）",
  },
];
const RECRUIT_SMALL_RESULT_RMR112 = [
  { key: "RSR01", code: "その他クリエイティブ職" },
];
const RECRUIT_SMALL_RESULT_RMR113 = [
  { key: "RSR01", code: "Webプロデューサー・Webディレクター・Webプランナー" },
  { key: "RSR01", code: "アートディレクター（Web・モバイル）" },
  { key: "RSR01", code: "Webデザイナー" },
  {
    key: "RSR01",
    code: "マークアップエンジニア・コーダー・フロントエンドエンジニア（Web・モバイル）",
  },
  { key: "RSR01", code: "Webライター・Web編集（コンテンツ制作）" },
  { key: "RSR01", code: "UI・UXデザイナー（Web・モバイル）" },
  { key: "RSR01", code: "アシスタントディレクター・制作進行管理" },
];
const RECRUIT_SMALL_RESULT_RMR114 = [
  { key: "RSR01", code: "ゲームプロデューサー・ディレクター・プランナー" },
  { key: "RSR01", code: "アートディレクター（ゲーム制作／開発）" },
  { key: "RSR01", code: "UI・UXデザイナー（ゲーム制作／開発）" },
  { key: "RSR01", code: "ゲームデザイナー・イラストレーター" },
  { key: "RSR01", code: "CGデザイナー" },
  {
    key: "RSR01",
    code: "マークアップエンジニア・コーダー・フロントエンドエンジニア（ゲーム）",
  },
  { key: "RSR01", code: "ゲームプログラマ" },
  { key: "RSR01", code: "サウンドクリエイター（ゲーム制作／開発）" },
  { key: "RSR01", code: "デバッグ（デバッガー）" },
];
const RECRUIT_SMALL_RESULT_RMR115 = [
  { key: "RSR01", code: "店長" },
  { key: "RSR01", code: "販売員・接客・売り場担当" },
  {
    key: "RSR01",
    code: "ホールスタッフ・フロアスタッフ・調理スタッフ（飲食）",
  },
];
const RECRUIT_SMALL_RESULT_RMR116 = [
  { key: "RSR01", code: "施設長" },
  { key: "RSR01", code: "エリアマネジャー・スーパーバイザー（SV）" },
  { key: "RSR01", code: "店舗開発・FC開発" },
];
const RECRUIT_SMALL_RESULT_RMR117 = [
  { key: "RSR01", code: "美容師・理容師・その他美容関連" },
  {
    key: "RSR01",
    code: "美容部員・エステティシャン・マッサージ・ビューティーアドバイザー",
  },
];
const RECRUIT_SMALL_RESULT_RMR118 = [
  { key: "RSR01", code: "旅行手配員・添乗員・ツアーコンダクター" },
];
const RECRUIT_SMALL_RESULT_RMR119 = [
  { key: "RSR01", code: "施設管理・マネジメント" },
  { key: "RSR01", code: "フロント業務・予約受付" },
  { key: "RSR01", code: "その他宿泊施設・ホテル関連" },
];
const RECRUIT_SMALL_RESULT_RMR120 = [
  { key: "RSR01", code: "道路旅客・貨物運送（ドライバー・運転手・運転士）" },
  { key: "RSR01", code: "航空・鉄道・船舶運送" },
  { key: "RSR01", code: "倉庫業" },
];
const RECRUIT_SMALL_RESULT_RMR121 = [
  { key: "RSR01", code: "清掃・警備・守衛" },
];
const RECRUIT_SMALL_RESULT_RMR122 = [
  { key: "RSR01", code: "スーパーバイザー（SV）" },
  { key: "RSR01", code: "カスタマーサポート・ユーザーサポート・オペレータ" },
];
const RECRUIT_SMALL_RESULT_RMR123 = [
  { key: "RSR01", code: "スクール長・マネジャー" },
  { key: "RSR01", code: "講師・指導員・インストラクター" },
];
const RECRUIT_SMALL_RESULT_RMR124 = [
  { key: "RSR01", code: "バイヤー・ディストリビューター" },
  { key: "RSR01", code: "マーチャンダイザー" },
];
const RECRUIT_SMALL_RESULT_RMR125 = [
  { key: "RSR01", code: "ブライダルコーディネーター・ウェディングプランナー" },
  { key: "RSR01", code: "葬祭ディレクター・プランナー" },
  { key: "RSR01", code: "その他ブライダル・葬祭関連" },
];
const RECRUIT_SMALL_RESULT_RMR126 = [
  { key: "RSR01", code: "検察官・裁判官・裁判所職員" },
  { key: "RSR01", code: "国会職員" },
  { key: "RSR01", code: "警察官・消防官・防衛庁職員・自衛官" },
  { key: "RSR01", code: "その他公務員" },
];
const RECRUIT_SMALL_RESULT_RMR127 = [
  { key: "RSR01", code: "大学講師" },
  { key: "RSR01", code: "小・中・高等学校教師" },
  { key: "RSR01", code: "保育士・幼稚園教諭" },
];
const RECRUIT_SMALL_RESULT_RMR128 = [
  { key: "RSR01", code: "農業／畜産／酪農" },
];
const RECRUIT_SMALL_RESULT_RMR129 = [
  { key: "RSR01", code: "経理事務・財務アシスタント" },
];
const RECRUIT_SMALL_RESULT_RMR130 = [
  { key: "RSR01", code: "総務アシスタント" },
  { key: "RSR01", code: "法務アシスタント" },
  { key: "RSR01", code: "人事アシスタント" },
];
const RECRUIT_SMALL_RESULT_RMR131 = [
  { key: "RSR01", code: "物流・購買アシスタント" },
  { key: "RSR01", code: "貿易事務" },
];
const RECRUIT_SMALL_RESULT_RMR132 = [
  { key: "RSR01", code: "マーケティング・広報アシスタント" },
  { key: "RSR01", code: "経営企画／事業統括アシスタント" },
];
const RECRUIT_SMALL_RESULT_RMR133 = [
  { key: "RSR01", code: "金融事務（銀行員・証券）" },
  { key: "RSR01", code: "金融事務（生保・損保）" },
  { key: "RSR01", code: "その他金融事務" },
  { key: "RSR01", code: "窓口" },
];
const RECRUIT_SMALL_RESULT_RMR134 = [{ key: "RSR01", code: "医療事務" }];
const RECRUIT_SMALL_RESULT_RMR135 = [
  { key: "RSR01", code: "秘書" },
  { key: "RSR01", code: "受付" },
];
const RECRUIT_SMALL_RESULT_RMR136 = [{ key: "RSR01", code: "通訳・翻訳" }];
const RECRUIT_SMALL_RESULT_RMR137 = [
  { key: "RSR01", code: "営業事務・アシスタント" },
  { key: "RSR01", code: "一般事務・アシスタント" },
];
const RECRUIT_SMALL_RESULT_RMR138 = [
  { key: "RSR01", code: "研究（シーズ探索・スクリーニング）" },
  { key: "RSR01", code: "非臨床研究（薬物動態・GLP）" },
  { key: "RSR01", code: "非臨床研究（安全性・毒性・GLP）" },
  { key: "RSR01", code: "製剤研究（処方設計）" },
  { key: "RSR01", code: "研究（基礎研究）" },
  { key: "RSR01", code: "非臨床研究（薬理・GLP）" },
  { key: "RSR01", code: "分析研究" },
  { key: "RSR01", code: "研究（バイオインフォマティクス）" },
  { key: "RSR01", code: "製剤研究（スケールアップ・工業化）" },
  { key: "RSR01", code: "製造プロセス・工法開発（再生医療製品）" },
];
const RECRUIT_SMALL_RESULT_RMR139 = [
  { key: "RSR01", code: "臨床企画（プロトコル作成）" },
  { key: "RSR01", code: "スタディマネージャー・プロジェクトマネジャー" },
  { key: "RSR01", code: "CRA（臨床開発モニター）" },
  { key: "RSR01", code: "臨床研究" },
  { key: "RSR01", code: "CRC（治験コーディネーター）" },
  { key: "RSR01", code: "統計解析" },
  { key: "RSR01", code: "DM（臨床研究データマネジメント）" },
  { key: "RSR01", code: "QC（臨床開発QC）" },
  { key: "RSR01", code: "GCP監査・QA（臨床開発QA）" },
  { key: "RSR01", code: "臨床薬理" },
  { key: "RSR01", code: "MW（メディカルライティング）" },
  { key: "RSR01", code: "SMA（治験事務局）" },
  { key: "RSR01", code: "メディカルドクター（クリニカル・臨床開発）" },
  { key: "RSR01", code: "PV（安全性情報担当）" },
  { key: "RSR01", code: "PMS（製造販売後調査）" },
  { key: "RSR01", code: "メディカルドクター（セイフティ・PV）" },
];
const RECRUIT_SMALL_RESULT_RMR140 = [
  { key: "RSR01", code: "医薬品開発薬事" },
  { key: "RSR01", code: "医薬品CMC薬事" },
  { key: "RSR01", code: "申請（医療機器）" },
  { key: "RSR01", code: "申請（OTC・医薬部外品）" },
  { key: "RSR01", code: "マーケットアクセス・薬価戦略" },
];
const RECRUIT_SMALL_RESULT_RMR141 = [
  { key: "RSR01", code: "医薬品質管理・試験担当（QC）（製造所）" },
  { key: "RSR01", code: "医薬品質保証（QA）（本社）" },
  { key: "RSR01", code: "医薬品質保証（QA）（製造所）" },
  { key: "RSR01", code: "医療機器品質管理・品質保証（GQP・QMS）" },
  { key: "RSR01", code: "医療機器安全管理（GVP）" },
];
const RECRUIT_SMALL_RESULT_RMR142 = [
  { key: "RSR01", code: "技術営業・アプリケーションスペシャリスト" },
  { key: "RSR01", code: "クリニカルスペシャリスト" },
];
const RECRUIT_SMALL_RESULT_RMR143 = [
  { key: "RSR01", code: "生産管理（医療）" },
  { key: "RSR01", code: "製造オペレーター（医療）" },
  { key: "RSR01", code: "製造工程管理・工程改善（医療）" },
  { key: "RSR01", code: "工場長（医療）" },
];
const RECRUIT_SMALL_RESULT_RMR144 = [
  { key: "RSR01", code: "学術・DI" },
  {
    key: "RSR01",
    code: "メディカルサイエンスリエゾン・メディカルアフェアーズ",
  },
  { key: "RSR01", code: "メディカルドクター（アフェアーズ・学術）" },
];
const RECRUIT_SMALL_RESULT_RMR145 = [{ key: "RSR01", code: "ライセンシング" }];
const RECRUIT_SMALL_RESULT_RMR146 = [
  { key: "RSR01", code: "病院長・事務長" },
  { key: "RSR01", code: "医師" },
  { key: "RSR01", code: "看護師" },
  { key: "RSR01", code: "歯科医師" },
  { key: "RSR01", code: "歯科衛生士・歯科技工士" },
  { key: "RSR01", code: "カウンセラー・臨床心理士" },
  { key: "RSR01", code: "栄養士・管理栄養士" },
  { key: "RSR01", code: "臨床検査技師" },
  { key: "RSR01", code: "診療放射線技師" },
  { key: "RSR01", code: "保健師" },
  { key: "RSR01", code: "獣医師" },
  { key: "RSR01", code: "臨床工学技士" },
  { key: "RSR01", code: "その他医療・看護" },
];
const RECRUIT_SMALL_RESULT_RMR147 = [
  { key: "RSR01", code: "薬剤師・管理薬剤師" },
  { key: "RSR01", code: "登録販売者" },
];
const RECRUIT_SMALL_RESULT_RMR148 = [
  { key: "RSR01", code: "院長・福祉施設長" },
  { key: "RSR01", code: "介護福祉士・ケアマネジャー" },
  { key: "RSR01", code: "ホームヘルパー・ケアワーカー" },
  { key: "RSR01", code: "ケースワーカー" },
];
const RECRUIT_SMALL_RESULT_RMR149 = [
  { key: "RSR01", code: "医療系プロダクトマネージャー" },
  { key: "RSR01", code: "医療系リサーチ" },
  { key: "RSR01", code: "医療系マーケティングコミュニケーション" },
];
const RECRUIT_SMALL_RESULT_RMR150 = [
  { key: "RSR01", code: "金融商品開発" },
  { key: "RSR01", code: "アクチュアリー" },
  { key: "RSR01", code: "クオンツ（開発）" },
  { key: "RSR01", code: "その他開発" },
];
const RECRUIT_SMALL_RESULT_RMR151 = [
  { key: "RSR01", code: "ディーラー・トレーダー・トレーディング" },
  { key: "RSR01", code: "ファンドマネジャー" },
  { key: "RSR01", code: "クオンツ（運用）" },
  { key: "RSR01", code: "その他運用" },
];
const RECRUIT_SMALL_RESULT_RMR152 = [
  { key: "RSR01", code: "ストラクチャードファイナンス" },
  { key: "RSR01", code: "公開・引受" },
  { key: "RSR01", code: "M&A" },
  { key: "RSR01", code: "その他投資銀行" },
  { key: "RSR01", code: "プロジェクトファイナンス" },
];
const RECRUIT_SMALL_RESULT_RMR153 = [
  { key: "RSR01", code: "エコノミスト" },
  { key: "RSR01", code: "ストラテジスト" },
  { key: "RSR01", code: "アナリスト" },
];
const RECRUIT_SMALL_RESULT_RMR154 = [
  { key: "RSR01", code: "融資審査（法人）" },
  { key: "RSR01", code: "融資・契約審査（個人）" },
  { key: "RSR01", code: "債権回収" },
  { key: "RSR01", code: "支払査定" },
  { key: "RSR01", code: "引受査定" },
];
const RECRUIT_SMALL_RESULT_RMR155 = [
  { key: "RSR01", code: "決済" },
  { key: "RSR01", code: "投信計理" },
  { key: "RSR01", code: "カストディ" },
  { key: "RSR01", code: "その他バックオフィス" },
  { key: "RSR01", code: "約定" },
  { key: "RSR01", code: "受渡" },
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
  RECRUIT_BIG_RESULT,
  RECRUIT_MIDDLE_RESULT_RBR01,
  RECRUIT_MIDDLE_RESULT_RBR02,
  RECRUIT_MIDDLE_RESULT_RBR03,
  RECRUIT_MIDDLE_RESULT_RBR04,
  RECRUIT_MIDDLE_RESULT_RBR05,
  RECRUIT_MIDDLE_RESULT_RBR06,
  RECRUIT_MIDDLE_RESULT_RBR07,
  RECRUIT_MIDDLE_RESULT_RBR08,
  RECRUIT_MIDDLE_RESULT_RBR09,
  RECRUIT_MIDDLE_RESULT_RBR10,
  RECRUIT_MIDDLE_RESULT_RBR11,
  RECRUIT_MIDDLE_RESULT_RBR12,
  RECRUIT_MIDDLE_RESULT_RBR13,
  RECRUIT_MIDDLE_RESULT_RBR14,
  RECRUIT_MIDDLE_RESULT_RBR15,
  RECRUIT_SMALL_RESULT_RMR01,
  RECRUIT_SMALL_RESULT_RMR02,
  RECRUIT_SMALL_RESULT_RMR03,
  RECRUIT_SMALL_RESULT_RMR04,
  RECRUIT_SMALL_RESULT_RMR05,
  RECRUIT_SMALL_RESULT_RMR06,
  RECRUIT_SMALL_RESULT_RMR07,
  RECRUIT_SMALL_RESULT_RMR08,
  RECRUIT_SMALL_RESULT_RMR09,
  RECRUIT_SMALL_RESULT_RMR10,
  RECRUIT_SMALL_RESULT_RMR11,
  RECRUIT_SMALL_RESULT_RMR12,
  RECRUIT_SMALL_RESULT_RMR13,
  RECRUIT_SMALL_RESULT_RMR14,
  RECRUIT_SMALL_RESULT_RMR15,
  RECRUIT_SMALL_RESULT_RMR16,
  RECRUIT_SMALL_RESULT_RMR17,
  RECRUIT_SMALL_RESULT_RMR18,
  RECRUIT_SMALL_RESULT_RMR19,
  RECRUIT_SMALL_RESULT_RMR20,
  RECRUIT_SMALL_RESULT_RMR21,
  RECRUIT_SMALL_RESULT_RMR22,
  RECRUIT_SMALL_RESULT_RMR23,
  RECRUIT_SMALL_RESULT_RMR24,
  RECRUIT_SMALL_RESULT_RMR25,
  RECRUIT_SMALL_RESULT_RMR26,
  RECRUIT_SMALL_RESULT_RMR27,
  RECRUIT_SMALL_RESULT_RMR28,
  RECRUIT_SMALL_RESULT_RMR29,
  RECRUIT_SMALL_RESULT_RMR30,
  RECRUIT_SMALL_RESULT_RMR31,
  RECRUIT_SMALL_RESULT_RMR32,
  RECRUIT_SMALL_RESULT_RMR33,
  RECRUIT_SMALL_RESULT_RMR34,
  RECRUIT_SMALL_RESULT_RMR35,
  RECRUIT_SMALL_RESULT_RMR36,
  RECRUIT_SMALL_RESULT_RMR37,
  RECRUIT_SMALL_RESULT_RMR38,
  RECRUIT_SMALL_RESULT_RMR39,
  RECRUIT_SMALL_RESULT_RMR40,
  RECRUIT_SMALL_RESULT_RMR41,
  RECRUIT_SMALL_RESULT_RMR42,
  RECRUIT_SMALL_RESULT_RMR43,
  RECRUIT_SMALL_RESULT_RMR44,
  RECRUIT_SMALL_RESULT_RMR45,
  RECRUIT_SMALL_RESULT_RMR46,
  RECRUIT_SMALL_RESULT_RMR47,
  RECRUIT_SMALL_RESULT_RMR48,
  RECRUIT_SMALL_RESULT_RMR49,
  RECRUIT_SMALL_RESULT_RMR50,
  RECRUIT_SMALL_RESULT_RMR51,
  RECRUIT_SMALL_RESULT_RMR52,
  RECRUIT_SMALL_RESULT_RMR53,
  RECRUIT_SMALL_RESULT_RMR54,
  RECRUIT_SMALL_RESULT_RMR55,
  RECRUIT_SMALL_RESULT_RMR56,
  RECRUIT_SMALL_RESULT_RMR57,
  RECRUIT_SMALL_RESULT_RMR58,
  RECRUIT_SMALL_RESULT_RMR59,
  RECRUIT_SMALL_RESULT_RMR60,
  RECRUIT_SMALL_RESULT_RMR61,
  RECRUIT_SMALL_RESULT_RMR62,
  RECRUIT_SMALL_RESULT_RMR63,
  RECRUIT_SMALL_RESULT_RMR64,
  RECRUIT_SMALL_RESULT_RMR65,
  RECRUIT_SMALL_RESULT_RMR66,
  RECRUIT_SMALL_RESULT_RMR67,
  RECRUIT_SMALL_RESULT_RMR68,
  RECRUIT_SMALL_RESULT_RMR69,
  RECRUIT_SMALL_RESULT_RMR70,
  RECRUIT_SMALL_RESULT_RMR71,
  RECRUIT_SMALL_RESULT_RMR72,
  RECRUIT_SMALL_RESULT_RMR73,
  RECRUIT_SMALL_RESULT_RMR74,
  RECRUIT_SMALL_RESULT_RMR75,
  RECRUIT_SMALL_RESULT_RMR76,
  RECRUIT_SMALL_RESULT_RMR77,
  RECRUIT_SMALL_RESULT_RMR78,
  RECRUIT_SMALL_RESULT_RMR79,
  RECRUIT_SMALL_RESULT_RMR80,
  RECRUIT_SMALL_RESULT_RMR81,
  RECRUIT_SMALL_RESULT_RMR82,
  RECRUIT_SMALL_RESULT_RMR83,
  RECRUIT_SMALL_RESULT_RMR84,
  RECRUIT_SMALL_RESULT_RMR85,
  RECRUIT_SMALL_RESULT_RMR86,
  RECRUIT_SMALL_RESULT_RMR87,
  RECRUIT_SMALL_RESULT_RMR88,
  RECRUIT_SMALL_RESULT_RMR89,
  RECRUIT_SMALL_RESULT_RMR90,
  RECRUIT_SMALL_RESULT_RMR91,
  RECRUIT_SMALL_RESULT_RMR92,
  RECRUIT_SMALL_RESULT_RMR93,
  RECRUIT_SMALL_RESULT_RMR94,
  RECRUIT_SMALL_RESULT_RMR95,
  RECRUIT_SMALL_RESULT_RMR96,
  RECRUIT_SMALL_RESULT_RMR97,
  RECRUIT_SMALL_RESULT_RMR98,
  RECRUIT_SMALL_RESULT_RMR99,
  RECRUIT_SMALL_RESULT_RMR100,
  RECRUIT_SMALL_RESULT_RMR101,
  RECRUIT_SMALL_RESULT_RMR102,
  RECRUIT_SMALL_RESULT_RMR103,
  RECRUIT_SMALL_RESULT_RMR104,
  RECRUIT_SMALL_RESULT_RMR105,
  RECRUIT_SMALL_RESULT_RMR106,
  RECRUIT_SMALL_RESULT_RMR107,
  RECRUIT_SMALL_RESULT_RMR108,
  RECRUIT_SMALL_RESULT_RMR109,
  RECRUIT_SMALL_RESULT_RMR110,
  RECRUIT_SMALL_RESULT_RMR111,
  RECRUIT_SMALL_RESULT_RMR112,
  RECRUIT_SMALL_RESULT_RMR113,
  RECRUIT_SMALL_RESULT_RMR114,
  RECRUIT_SMALL_RESULT_RMR115,
  RECRUIT_SMALL_RESULT_RMR116,
  RECRUIT_SMALL_RESULT_RMR117,
  RECRUIT_SMALL_RESULT_RMR118,
  RECRUIT_SMALL_RESULT_RMR119,
  RECRUIT_SMALL_RESULT_RMR120,
  RECRUIT_SMALL_RESULT_RMR121,
  RECRUIT_SMALL_RESULT_RMR122,
  RECRUIT_SMALL_RESULT_RMR123,
  RECRUIT_SMALL_RESULT_RMR124,
  RECRUIT_SMALL_RESULT_RMR125,
  RECRUIT_SMALL_RESULT_RMR126,
  RECRUIT_SMALL_RESULT_RMR127,
  RECRUIT_SMALL_RESULT_RMR128,
  RECRUIT_SMALL_RESULT_RMR129,
  RECRUIT_SMALL_RESULT_RMR130,
  RECRUIT_SMALL_RESULT_RMR131,
  RECRUIT_SMALL_RESULT_RMR132,
  RECRUIT_SMALL_RESULT_RMR133,
  RECRUIT_SMALL_RESULT_RMR134,
  RECRUIT_SMALL_RESULT_RMR135,
  RECRUIT_SMALL_RESULT_RMR136,
  RECRUIT_SMALL_RESULT_RMR137,
  RECRUIT_SMALL_RESULT_RMR138,
  RECRUIT_SMALL_RESULT_RMR139,
  RECRUIT_SMALL_RESULT_RMR140,
  RECRUIT_SMALL_RESULT_RMR141,
  RECRUIT_SMALL_RESULT_RMR142,
  RECRUIT_SMALL_RESULT_RMR143,
  RECRUIT_SMALL_RESULT_RMR144,
  RECRUIT_SMALL_RESULT_RMR145,
  RECRUIT_SMALL_RESULT_RMR146,
  RECRUIT_SMALL_RESULT_RMR147,
  RECRUIT_SMALL_RESULT_RMR148,
  RECRUIT_SMALL_RESULT_RMR149,
  RECRUIT_SMALL_RESULT_RMR150,
  RECRUIT_SMALL_RESULT_RMR151,
  RECRUIT_SMALL_RESULT_RMR152,
  RECRUIT_SMALL_RESULT_RMR153,
  RECRUIT_SMALL_RESULT_RMR154,
  RECRUIT_SMALL_RESULT_RMR155,
};
