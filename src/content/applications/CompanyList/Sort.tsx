import {
  Box,
  Card,
  TextField,
  Typography,
  Stack,
  Grid,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const businessCategory = [
  { label: "すべて" },
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
  { label: "すべて" },
  { label: "エネルギー" },
  { label: "すべて" },
  { label: "銀行" },
  { label: "信用金庫・労働金庫" },
  { label: "信販・クレジット・ファイナンス" },
  { label: "その他金融" },
  { label: "リース・レンタル" },
  { label: "保険" },
  { label: "証券・投信・投資顧問" },
  { label: "すべて" },
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
  { label: "すべて" },
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
  { label: "すべて" },
  { label: "フードサービス" },
  { label: "ホテル・旅行" },
  { label: "教育" },
  { label: "エンターテインメント" },
  { label: "調査・コンサルタント" },
  { label: "人材サービス・人材紹介・人材派遣" },
  { label: "その他サービス" },
  { label: "すべて" },
  { label: "情報処理・ソフトウェア" },
  { label: "情報・インターネットサービス" },
  { label: "すべて" },
  { label: "情報通信" },
  { label: "マスコミ" },
  { label: "すべて" },
  { label: "運輸" },
  { label: "倉庫" },
  { label: "すべて" },
  { label: "官公庁・団体" },
];

const prefectures = [
  { label: "特に指定しない" },
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

const minSalesAmount = [
  { label: "特に指定しない" },
  { label: "0" },
  { label: "1億円" },
  { label: "3億円" },
  { label: "10億円" },
  { label: "50億円" },
  { label: "300億円" },
  { label: "1000億円" },
];

const maxSalesAmount = [
  { label: "特に指定しない" },
  { label: "1億円未満" },
  { label: "3億円" },
  { label: "10億円" },
  { label: "50億円" },
  { label: "300億円" },
  { label: "1000億円" },
];

const minEmployeeNumber = [
  { label: "特に指定しない" },
  { label: "0" },
  { label: "50" },
  { label: "100" },
  { label: "300" },
  { label: "500" },
  { label: "1000" },
  { label: "3000" },
  { label: "5000" },
];

const maxEmployeeNumber = [
  { label: "特に指定しない" },
  { label: "50" },
  { label: "100" },
  { label: "300" },
  { label: "500" },
  { label: "1000" },
  { label: "3000" },
  { label: "5000" },
];

const minEstablishmentYear = [
  { label: "特に指定しない" },
  { label: "2022〜" },
  { label: "2018〜" },
  { label: "2013〜" },
  { label: "1993〜" },
  { label: "1973〜" },
];

const maxEstablishmentYear = [
  { label: "特に指定しない" },
  { label: "〜2018" },
  { label: "〜2013" },
  { label: "〜1993" },
  { label: "〜1973" },
];

const minCapitalStock = [
  { label: "特に指定しない" },
  { label: "100万円以上" },
  { label: "500万円以上" },
  { label: "1000万円以上" },
  { label: "5000万円以上" },
  { label: "1億円以上" },
  { label: "10億円以上" },
  { label: "100億円以上" },
  { label: "1000億円以上" },
  { label: "5000億円以上" },
  { label: "1兆円以上" },
];

const maxCapitalStock = [
  { label: "特に指定しない" },
  { label: "100万円以下" },
  { label: "500万円以下" },
  { label: "1000万円以下" },
  { label: "5000万円以下" },
  { label: "1億円以下" },
  { label: "10億円以下" },
  { label: "100億円以下" },
  { label: "1000億円以下" },
  { label: "5000億円以下" },
  { label: "1兆円以下" },
];

function Sort() {
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
          <TextField label="法人番号" size="small" sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={2}>
          <TextField label="会社名・法人名" size="small" sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={businessCategory}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="業種" />}
          />
        </Grid>
        <Grid item xs={2}>
          <Autocomplete
            disablePortal
            options={prefectures}
            size="small"
            sx={{ m: 1 }}
            renderInput={(params) => <TextField {...params} label="都道府県" />}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField label="電話番号" size="small" sx={{ m: 1 }} />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            sx={{ fontSize: 16, m: 1 }}
            control={<Checkbox />}
            label="上場"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>売上</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minSalesAmount}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
            <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxSalesAmount}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>従業員数</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minEmployeeNumber}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
            <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxEmployeeNumber}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>設立</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minEstablishmentYear}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
            <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxEstablishmentYear}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Typography sx={{ fontSize: 16, pl: 1, mb: -1 }}>資本金</Typography>
          <Stack sx={{ m: 1 }} direction="row">
            <Autocomplete
              disablePortal
              options={minCapitalStock}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
            <Typography sx={{ fontSize: 16, p: 0.5 }}>-</Typography>
            <Autocomplete
              disablePortal
              options={maxCapitalStock}
              size="small"
              sx={{ minWidth: 130 }}
              renderInput={(params) => <TextField {...params} label="" />}
            />
          </Stack>
        </Grid>
      </Grid>
      <Box></Box>
    </Card>
  );
}

export default Sort;
