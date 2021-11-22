export interface SessionIdMessage {
  FCODE: 'session';
  SessionID: string;
  BaseClOrdId: string;
}

/**
 * 緊急公告訊息格式
 */
export interface UrgentNoticeMessage {
  FCODE: 'UrgentNotice';
  /**
   * 日期
   * - 格式: yyyy/MM/DD hh:mm:ss
   */
  DateTime: string;
  /**
   * 標題
   */
  Title: string;
  /**
   * 內文
   */
  Content: string;
}

/**
 * 斷線訊息格式
 */
export interface DisconnectMessage {
  FCODE: 'disconnect';
}

export interface HeartbeatMessage {
  FCODE: '21';
}

export interface RiskControlMessage {
  FCODE: '11';
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  CODE: '0000' | string; // 狀態 0000 表示正確,其它表示錯誤
  MARGIN: string; // 保證金不足金額   &&&&&&&&&&&&.&& “不足多 少”，所以為正數
  NEWQTY: string; // 新倉口數
  SERIALNO: string; // 查詢序號
  ERRMSG: string; // 錯誤訊息
}

/**
 * 期貨委託回報(0x23/0x25)
 *
 * 電子盤與人工盤格式一樣只是 FCODE 不同,所以共同使用
 */
export interface OrderReportMessage {
  /**
   * 資料格式
   * - '23': 電子盤
   * - '25': 人工盤
   */
  FCODE: '23' | '25';
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  SEQNO: string; // 委託書號
  ORDDT: string; // 委託日期 Format: YYYY/MM/DD
  ORDTM: string; // 委託時間 Format: HHMMSS
  EXH: string; // 交易所
  SPREAD: 'Y' | 'N'; // 組合方式 Y:組合 N：非組合
  PS1: 'B' | 'S'; // 買賣別1 B：買進 S：賣出
  COMTYPE1: '0' | '1'; // 商品類別1 0：期貨 1：選擇權
  COMNO1: string; // 商品代碼1
  COMNONAME1: string; //  商品代碼中文名1
  COMYM1: string; // 商品年月1 Format: YYYYMM
  STKPRC1: string; // 履約價1
  CALLPUT1: 'C' | 'P'; // Call/Put
  /**
   * 買賣別2
   * - 'B': 買進
   * - 'S'：賣出
   * - '': 無資料
   */
  /**
   * 買賣別2 B：買進  S：賣出;
   */
  PS2: '' | 'B' | 'S';
  /**
   * 商品類別2 0：期貨 1：選擇權
   */
  COMTYPE2: '' | '0' | '1';
  /**
   * 商品代碼2
   */
  COMNO2: string;
  COMNONAME2: string; //  商品代碼中文名2
  /**
   * 商品年月2 Format: YYYYMM
   */
  COMYM2: string;

  /**
   * 履約價2
   */
  STKPRC2: string;
  /**
   * Call/Put
   */
  CALLPUT2: 'C' | 'P';
  /**
   * 委託別 1：MKT 2：LMT 3：STP 4：SWL U：改價 C：刪單
   */
  ORDTYPE: '1' | '2' | '3' | '4' | 'U' | 'C';
  /**
   * 組合價差正負號
   */
  SIGN: '+' | '-';
  /**
   * 單價 1
   */
  PRICE1: string;
  /**
   * 單價 2
   */
  PRICE2: string;
  /**
   * 委託口數
   */
  ORDQTY: string;
  /**
   * 當沖碼      Y：當沖  N：非當沖
   */
  DTRADE: 'Y' | 'N';
  /**
   * 委託條件    1：當日帳。6：次日帳
   */
  ORDKND: '1' | '6';
  /**
   * 新平碼
   * - 'Y': 新倉
   * - 'N': 平倉
   * - 'A': 自動
   */
  OPEN: 'Y' | 'N' | '';
  AENO: string; // 營業員代碼
  OPERATOR: string; // 操盤員代碼
  CODE: string; // 狀態碼
  CNT: string; // 累計次數
  AVAIL: string; // 剩餘口數
  ERRMSG: string; //錯誤訊息
  TYPE: 'I' | 'V' | 'A' | 'E'; //來源別     “I”:網路單 “V”:語 音單 “A”:交易員下單 “E”:eLeader 單
  PDATE: string; // 到期日    LME 合約商品到期日, Format: YYYYMMDD
  NOPERATOR: string; // 新操盤員代碼
  ORDNO: string; // 委託單號
}

/**
 * 成交回報訊息(0x24/0x26)
 *
 * 電子盤與人工盤格式一樣只是 FCODE 不同,所以共同使用
 */
export interface DealReportMessage {
  /**
   * 資料格式
   * - '24': 電子盤
   * - '26': 人工盤
   */
  FCODE: '24' | '26';
  /**
   * 市場別
   * - 國內
   * - 國外
   */
  MTYPE: 'I' | 'O';
  /**
   * 公司碼
   */
  COMPANY: string;
  /**
   * 帳號
   */
  ACCOUNT: string;
  /**
   * 網路單號
   */
  SEQNO: string;
  /**
   * 委託書號
   */
  ORDNO: string;
  /**
   * 委託日期
   * - Format: YYYY/MM/DD
   */
  ORDDT: string;
  /**
   * 委託日期
   * - Format: HHMMSS
   */
  ORDTM: string;
  /**
   * 交易所
   */
  EXH: string;
  /**
   * 組合方式
   * - Y: 組合
   * - N: 非組合
   */
  SPREAD: 'Y' | 'N';
  /**
   * 買賣別1
   * - B: 買進
   * - S: 賣出
   */
  PS: 'B' | 'S';
  /**
   * 商品類別1
   * - 0：期貨
   * - 1：選擇權
   */
  COMTYPE: '0' | '1';
  /**
   * 商品代碼
   */
  COMNO: string;
  COMNONAME: string; //商品代碼中文名
  /**
   * 商品年月
   * - Format: YYYYMM
   */
  COMYM: string;
  /**
   * 履約價
   */
  STKPRC: string;
  /**
   * Call/Put
   * - C: Call
   * - P: Put
   */
  CALLPUT: 'C' | 'P';
  /**
   * 成交口數
   */
  TRDQTY: string;
  /**
   * 成交單價
   */
  PRICE1: string;
  /**
   * 當沖碼
   * - Y: 當沖
   * - N: 非當沖
   */
  DTRADE: string;
  /**
   * 新平碼
   * - 'Y': 新倉
   * - 'N': 平倉
   * - 'A': 自動
   */
  OPEN: 'Y' | 'N' | '';
  /**
   * 交易所序號
   */
  FIRMORD: string;
  /**
   * 券商成交序號
   */
  SLIPNO: string;
  /**
   * 營業員代碼
   */
  AENO: string;
  /**
   * 操盤員代碼
   */
  OPERATOR: string;
  /**
   * 委託別
   * - A: 新增
   * - D: 刪單
   */
  TRDTYPE: 'A' | 'D';
  /**
   * 來源別
   * - I: 網路單
   * - V: 語音單
   * - A: 交易員下單
   * - E: eLeader 單
   */
  TYPE: 'I' | 'V' | 'A' | 'E';
  /**
   * 到期日
   * - LME 合約商品到期日
   * - Format: YYYYMMDD
   */
  PDATE: string;
  /**
   * 新制委託書號
   */
  ORDNO2: string;
  /**
   * 新操盤員代碼
   */
  NOPERATOR: string;
}

export interface QueryInsuranceMessage {
  FCODE: '42';
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  CURRENCY: string; //幣別
  DBALNE: string; //可委託額
  DWARN: string; //風險係數
  DADAMT: string; //追繳金額
  DBALNC: string; //本日餘額
  DBALN: string; //本日權益數
  DLBALN: string; //DLBALN
  DPMAMT: string; //權利金額
  DTPLAMT: string; //平倉損益
  DIMAMT: string; //帳戶出入金
  DTUNPL: string; //非日盤浮動損益
  DJUNPL: string; //日盤浮動損益
  DDUNPL: string; //今日異動
  DMFEEB: string; //手續交稅
  DAPAMT: string; //期權市值
  DVPAMT: string; //帳戶清算值
  DOIMMRG: string; //委託保金
  DTIMMRG: string; //部位保金
  DTMMMRG: string; //維持保金
  JPYMARGIN1: string; //日盤追加保金(定盤)
  OUTMONEY: string; //可網路出金金額
  MOVEJPYMARGIN1: string; //日盤追加保金(動盤)
  DERATE: string; //匯率
  RECORDCNT: string; //查詢總筆數
  CURRENTCNT: string; //目前筆數
  QTIME: string; //查詢時間
  SERIALNO: string; //查詢序號 依0X32 查詢序號欄位 回傳
}

export interface QueryOpenPositionMessage {
  FCODE: '43';
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  EXH: string; // 交易所
  CURRENCY: string; //幣別
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  TRDDT: string; // 成交日期 Format: YYYY/MM/DD
  PS: 'B' | 'S'; //買賣別 B:買進 S:賣出
  COMTYPE: '0' | '1' | ' '; // 商品類別 0:期貨 1:選擇權
  COMNO: string; // 商品代碼
  COMNONAME: string; //商品代碼中文名
  COMYM: string; // 商品年月 Format: YYYYMM
  STKPRC: string; // 履約價
  CALLPUT: string; // CALL/PUT
  OTQTY: string; // 未平倉量
  TRDPRE1: string; // 結算結算價
  MKTPRE1: string; // 市價
  PRTLOS: string; // 未平倉損益
  IAMT: string; // 原始保證金
  MAMT: string; // 維持保證金
  TRDPRC1: string; // 原始成交價
  DTRADE: 'Y' | 'N'; // 當沖碼Y:當沖 N:非當沖
  AENO: string; // 營業員代碼
  OPERATOR: string; // 操盤員代碼
  RECORDCNT: string; // 查詢總筆數
  CURRENTCNT: string; //  目前筆數
  QTIME: string; // 查詢時間HHMMSS
  SERIALNO: string; // 查詢序號依 0X33 查詢序號欄位的 值回傳
  PDATE: string; // 到期日YYYYMMDD
  ORDNO2: string; // 新制委託書號
  NOPERATOR: string; // 新操盤員代碼
  BLANK: string; // 空白
}

export interface QueryDayReversalMessage {
  FCODE: '44';
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  EXH: string; // 交易所
  CURRENCY: string; //幣別
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  TRDDT: string; // 成交日期 Format: YYYY/MM/DD
  PS: 'B' | 'S'; //買賣別 B:買進 S:賣出
  COMTYPE: '0' | '1'; // 商品類別 0:期貨 1:選擇權
  COMNO: string; // 商品代碼
  COMNONAME: string; // 商品代碼中文名
  COMYM: string; // 商品年月 Format: YYYYMM
  STKPRC: string; // 履約價
  CALLPUT: string; // CALL/PUT
  IAMT: string; //原始保證金
  MAMT: string; //維持保證金
  TRDPRC: string; //成交價
  OSTRDDT: string; //平倉成交日
  OSORDNO: string; //平倉委託單號
  OSTRDPRC: string; //平倉成交價
  OSQTY: string; //平倉口數
  OSPRTLOS: string; //平倉損益
  FEE: string; //手續費
  TAX: string; //交易稅
  NETRTLOS: string; //凈損益
  DTRADE: 'Y' | 'N'; //當沖碼Y:當沖 N:非當沖
  AENO: string; //營業員代碼
  OPERATOR: string; //操盤員代碼
  RECORDCNT: string; //查詢總筆數
  CURRENTCNT: string; //目前筆數
  QTIME: string; //查詢時間HHMMSS
  SERIALNO: string; //查詢序號
  PDATE: string; //到期日YYYYMMDD
  ORDNO2: string; //新制委託書號
  NOPERATOR: string; //新操盤員代碼
  BLANK: string; //   空白
}

export interface QueryFuturesStatusMessage {
  FCODE: '45';
  MTYPE: 'O'; //市場別 I：國內 O：國外
  COMPANY: string; //公司碼
  ACCOUNT: string; //帳號
  EXH: string; //交易所
  CURRENCY: string; //幣別
  COMTYPE: '0' | '1'; //商品類別 0：期貨 1：選擇權
  COMNO: string; //商品代碼
  COMNONAME: string; //商品代碼中文名
  COMYM: string; //商品年月  YYYYMM
  STKPRC: string; // 履約價
  CALLPUT: string; // CALL/PUT
  MKTPRE1: string; // 市價 MKTPRE1
  BSOPTQTY: string; // 昨日留倉口數(B) BSOPTQTY
  SSOPTQTY: string; // 昨日留倉口數(S) SSOPTQTY
  BORDQTY: string; // 今日委託口數(B) BORDQTY
  SORDQTY: string; // 今日委託口數(S) SORDQTY
  BTRDQTY: string; // 今日成交口數(B) BTRDQTY
  STRDQTY: string; // 今日成交口數(S) STRDQTY
  BOSTQTY: string; // 今日沖銷口數(B) BOSTQTY
  SOSTQTY: string; // 今日沖銷口數(S) SOSTQTY
  BCOPTQTY: string; // 今日留倉口數(B) BCOPTQTY
  SCOPTQTY: string; // 今日留倉口數(S) SCOPTQTY
  OSPRTLOS: string; // 平倉損益 OSPRTLOS
  TRDPRC: string; // 成交均價 TRDPRC
  PRTPRC: string; // 未平倉均價 PRTPRC
  PRTLOS: string; // 未平倉損益 PRTLOS
  RECORDCNT: string; // 查詢總筆數 RECORDCNT
  CURRENTCNT: string; // 目前筆數 CURRENTCNT
  QTIME: string; // 查詢時間 QTIME
  SERIALNO: string; // 查詢序號 SERIALNO
  PDATE: string; // 到期日 PDATE
}

export interface QueryPaymentMessage {
  FCODE: '46'; //
  SEQNO: string; // 出金序號  2碼西元年+月+日+ 四碼流水號
  TYPE: '1' | '2'; // 異動別 1.出金申請 2.取消出金
  COMPANY: string; // 公司別
  ACCOUNT: string; // 帳號
  CODE:
    | 'D000' // D000:success
    | 'D001' // D001:餘額不足
    | 'D002' // D002:出金時間已過
    | 'D003' // D003:出金作業已完成
    | 'D004' // D004:無原出金申請
    | 'D005' // D005:重覆出金
    | 'D006' // D006:無此帳號
    | 'D007' // D007:出金失敗
    | 'D008' // D008:非世華銀行客戶
    | 'D009'; // D009:無此幣別帳號
  ERR: string; // 錯誤訊息
  SEQNO6: string; // 後台序號  取消時使用
}

export interface QueryMarginMessage {
  FCODE: '47';
  MTYPE: 'O'; //市場別
  COMPANY: string; //公司碼
  ACCOUNT: string; //帳號
  TRDDT: string; //追繳日期 YYYY/MM/DD
  LCTDAB: string; //前日餘額
  TDAB: string; //當日餘額
  PRTLOS: string; //部位損益
  EQUITY: string; //當日權益數
  IAMT: string; // 原始保證金
  MARGIN: string; // 追繳金額
  RISK: string; // 風險係數
  UPDATE: string; // 資料更新日期 YYYY/MM/DD
  UPTIME: string; // 資料更新時間 HH:MM:SS
  RECORDCNT: string; // 查詢總筆數
  CURRENTCNT: string; // 目前筆數
  QTIME: string; // 查詢時間 HHMMSS
  SERIALNO: string; // 查詢序號
}

export interface QueryPaymentAndIncomeMessage {
  FCODE: '48'; //
  MTYPE: 'O'; //市場別
  COMPANY: string; //公司碼
  ACCOUNT: string; //帳號
  TXDATE: string; //存提款日期  YYYY/MM/DD
  CDTYPE: 'H' | 'A'; //存提款類別  H:出金；A:入金
  CURRENCY: 'NTD' | 'USD' | 'HKD' | 'EUR' | 'CAD' | 'BAS' | 'JPY'; //幣別
  TXAMT: string; //金額
  BANK: string; //存款銀行
  BANKAC: string; // 存款帳號
  TOBANK: string; // 提款銀行
  TOBANKAC: string; // 提款帳號
  UPDATE: string; // 資料更新日期 YYYY/MM/DD
  UPTIME: string; // 資料更新時間 HH:MM:SS
  RECORDCNT: string; // 查詢總筆數  0 表示無資料
  CURRENTCNT: string; // 目前筆數
  QTIME: string; // 查詢時間 HH:MM:SS
  SERIALNO: string; // 查詢序號
  IBANK: string; // 存款銀行名稱 IBANK-NAME
  OBANK: string; // 提款銀行名稱 OBANK-NAME
  MEDIA: 'N' | 'T' | 'S' | 'R' | ''; //出金狀態碼  入金為空白 出金-N:申請,T:核准, S:轉媒體, R:未核准
  SEQNO6: string; // 後台序號   取消時使用
}

export interface QueryCapitalTransferMessage {
  FCODE: '4A'; //
  SEQNO: string; // 出金序號
  TYPE: '1' | '2'; //幣別; // 異動別  1.內轉外 2.外轉內
  COMPANY: string; // 公司碼
  ACCOUNT: string; ///帳號 ACTNO
  CODE:
    | 'D000' // D000:success
    | 'D001' // D001:餘額不足
    | 'D002' // D002:出金時間已過
    | 'D003' // D003:出金作業已完成
    | 'D004' // D004:無原出金申請
    | 'D005' // D005:重覆出金
    | 'D006' // D006:無此帳號
    | 'D007' // D007:出金失敗
    | 'D008' // D008:無此出金帳號
    | 'D009'; // D009:法人戶不可網路出金
  SCODE: string; // 來源別
}

export interface QueryDomesticAndForeignPaymentandIncomeMessage {
  FCODE: '4E'; //
  SEQNO: string; // 序號(前台)
  SQNO: string; // 序號(後台)
  TDATE: string; // 交易日期  YYYY/MM/DD
  MTYPE: 'O'; // 市場別
  IOTYPE: string; // 提存類別  1:入金, 2:出金
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  CNAME: string; // 客戶名稱
  CURRENCY: string; // 幣別  USD:美金,NTD:台幣
  AMT: string; // 金額
  IBANK: string; // 存款銀行
  BANKAC: string; // 存款帳號
  OBANK: string; // 提款銀行
  TOBANKAC: string; // 提款帳號
  IDATE: string; // 申請日期
  ITIME: string; // 申請時間
  UPDATE: string; // 資料更新日期 YYYY/MM/DD
  UPTIME: string; // 資料更新時間 HH:MM:SS
  BNKSQNO: string; // 金資序號
  MSG: string; // 訊息
  NSQNO: string; // 網路序號  語音取消出金使用
  SCODE: string; // 來源別  語音取消出金使用
  MEDIA: '' | 'S' | 'N' | 'T' | 'X'; // 出金狀態碼  入金為空白, 出金: S=已出金, N、T=核准中, X=已取消出金
  CURRENTCNT: string; // 目前筆數
  RECORDCNT: string; // 查詢總筆數  0 表示無資料
  QTIME: string; // 查詢時間 HH:MM:SS
}

export interface QueryMaxPaymentMessage {
  FCODE: '4F'; //
  SEQNO: string; // 出金序號
  TYPE: 'A' | 'B' | 'C'; // 異動別  A:國外出金, B:外轉內,  C:國內出金＆內轉外
  COMPANY: string; // 公司別
  ACCOUNT: string; // 帳號 ACTNO
  CODE: 'D040' | 'D006'; // 狀態 CODE D040:查詢成功 D006:無此帳號  國內出金無此欄位
  ERRMSG: string; // 錯誤訊息
  TAMT: string; // 可出金額
  MCODE: 'NTD' | 'USD' | 'HKD' | 'EUR' | 'CAD' | 'BAS' | 'JPY' | 'NTT'; // 幣別  NTT-新台幣、NTD-新台幣、USD-美元、HKD港幣、EUR-歐元、CAD-加幣、 BAS-基幣
}

export interface QueryDayCommissionMessage {
  FCODE: '61'; //
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  ORDDT: string; // 委託日期 yyyy/mm/dd
  ORDTM: string; // 委託時間 HHMMSS
  EXH: string; // 交易所
  SPREAD: string; //  組合方式   N:非組合
  PS1: 'B' | 'S'; //  買賣別 1   B：買進  S：賣出
  COMTYPE1: '0' | '1'; //  商品類別1    0：期貨 1：選擇權
  COMNO1: string; //  商品代碼1
  COMNONAME1: string; //  商品代碼中文名1
  COMYM1: string; //  商品年月1  YYYYMM
  STKPRC1: string; //  履約價1
  CALLPUT1: string; //  CP1
  PS2: 'B' | 'S'; //  買賣別2  B：買進  S：賣出
  COMTYPE2: '0' | '1'; //  商品類別2  0：期貨 1：選擇權
  COMNO2: string; //  商品代碼2
  COMNONAME2: string; //  商品代碼中文名2
  COMYM2: string; //  商品年月2  YYYYMM
  STKPRC2: string; //  履約價2
  CALLPUT2: string; //  CP2
  ORDTYPE: '1' | '2' | '3' | '4' | 'U' | 'C'; // 委託別 1：MKT 2：LMT 3：STP 4：SWL U：改價 C：刪單
  SIGN: string; //  組合價差正負號 +／-
  PRICE1: string; //  單價1
  PRICE2: string; //  單價2
  ORDQTY: string; //  委託口數
  DTRADE: 'Y' | 'N'; //  當沖碼 Y：當沖 N：非當沖
  ORDKND: '1' | '6'; //  委託條件 1：當日帳。6：次日帳
  /**
   * 新平碼
   * - 'Y': 新倉
   * - 'N': 平倉
   * - 'A': 自動
   */
  OPEN: 'Y' | 'N' | '';
  AENO: string; //  營業員代碼
  OPERATOR: string; //  操盤員代碼
  CODE: string; //  狀態碼
  CNT: string; //  累計次數
  UDPQTY: string; //  改價口數
  TRDQTY: string; //  成交口數
  AVGPRICE: string; //  成交均價
  ERRMSG: string; //  錯誤訊息
  TYPE: 'I' | 'V' | 'A' | 'E'; //  來源別 “I”:網路單 “V”:語音單 “A”:交易員下單 “E”:eLeader 單
  MARGIN: string; //   保證金不足金額    “不足 多少”，所以為正數
  AVAIL: string; //  剩餘口數
  CLOSETRD: string; //  結案否
  RECORDCNT: string; //  查詢總筆數 0 表示無資料
  CURRENTCNT: string; //  目前筆數
  SERIALNO: string; //  查詢序號
  PDATE: string; //  到期日  LME 合約商品到期日， YYYYMMDD
}

export interface QueryDayTransactionMessage {
  FCODE: '62'; //
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  ORDDT: string; // 委託日期   YYYY/MM/DD
  ORDTM: string; // 委託時間   HHMMSS
  TRDTM: string; // 成交時間   HHMMSS
  TRDDT: string; //  成交日期   YYYY/MM/DD
  EXH: string; //  交易所
  SPREAD: string; //  組合方式   N:非組合
  PS: string; //  買賣別   B：買進  S：賣出
  COMTYPE: string; //  商品類別      0：期貨 1：選擇權
  COMNO: string; //  商品代碼
  COMNONAME: string; //商品代碼中文名
  COMYM: string; //  商品年月   YYYYMM
  STKPRC: string; //  履約價
  CALLPUT: string; //  CP
  TRDQTY: string; //  本次成交口數/成交總口數
  PRICE: string; //  成交單價/均價
  ODPRICE: string; //  原委託價
  DTRADE: string; //  當沖碼    Y：當沖 N：非當沖
  AENO: string; //  營業員代碼
  OPERATOR: string; //  操盤員代碼
  TRDTYPE: string; //  委託別
  TYPE: string; //  來源別 “I”:網路單 “V”:語音單 “A”:交易員下單 “E”:eLeader 單
  RECORDCNT: string; //  查詢總筆數
  CURRENTCNT: string; //  目前筆數
  SERIALNO: string; //  查詢序號
  PDATE: string; //  到期日
}

export interface QueryHistoryCommissionMessage {
  FCODE: '63'; //
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  ORDDT: string; // 委託日期 yyyy/mm/dd
  ORDTM: string; // 委託時間 HHMMSS
  EXH: string; // 交易所
  SPREAD: string; //  組合方式   N:非組合
  PS1: 'B' | 'S'; //  買賣別 1   B：買進  S：賣出
  COMTYPE1: '0' | '1'; //  商品類別1    0：期貨 1：選擇權
  COMNO1: string; //  商品代碼1
  COMNONAME1: string; //  商品代碼中文名1
  COMYM1: string; //  商品年月1  YYYYMM
  STKPRC1: string; //  履約價1
  CALLPUT1: string; //  CP1
  /**
   * 買賣別2
   * - 'B': 買進
   * - 'S'：賣出
   * - '': 無資料
   */
  PS2: '' | 'B' | 'S';
  COMTYPE2: '0' | '1'; //  商品類別2  0：期貨 1：選擇權
  COMNO2: string; //  商品代碼2
  COMNONAME2: string; //  商品代碼中文名2
  COMYM2: string; //  商品年月2  YYYYMM
  STKPRC2: string; //  履約價2
  CALLPUT2: string; //  CP2
  ORDTYPE: '1' | '2' | '3' | '4' | 'U' | 'C'; // 委託別 1：MKT 2：LMT 3：STP 4：SWL U：改價 C：刪單
  SIGN: string; //  組合價差正負號 +／-
  PRICE1: string; //  單價1
  PRICE2: string; //  單價2
  ORDQTY: string; //  委託口數
  DTRADE: 'Y' | 'N'; //  當沖碼 Y：當沖 N：非當沖
  ORDKND: '1' | '6'; //  委託條件 1：當日帳。6：次日帳
  /**
   * 新平碼
   * - 'Y': 新倉
   * - 'N': 平倉
   * - 'A': 自動
   */
  OPEN: 'Y' | 'N' | '';
  AENO: string; //  營業員代碼
  OPERATOR: string; //  操盤員代碼
  CODE: string; //  狀態碼
  CNT: string; //  累計次數
  UDPQTY: string; //  改價口數
  TRDQTY: string; //  成交口數
  AVGPRICE: string; //  成交均價
  ERRMSG: string; //  錯誤訊息
  TYPE: 'I' | 'V' | 'A' | 'E'; //  來源別 “I”:網路單 “V”:語音單 “A”:交易員下單 “E”:eLeader 單
  MARGIN: string; //   保證金不足金額    “不足 多少”，所以為正數
  AVAIL: string; //  剩餘口數
  CLOSETRD: string; //  結案否
  RECORDCNT: string; //  查詢總筆數
  CURRENTCNT: string; //  目前筆數
  SERIALNO: string; //  查詢序號
  PDATE: string; //  到期日  LME 合約商品到期日， YYYYMMDD
}

export interface QueryHistoryTransactionMessage {
  FCODE: '64'; //
  MTYPE: 'O'; // 市場別
  COMPANY: string; // 公司碼
  ACCOUNT: string; // 帳號
  SEQNO: string; // 網路單號
  ORDNO: string; // 委託單號
  ORDDT: string; // 委託日期   YYYY/MM/DD
  ORDTM: string; // 委託時間   HHMMSS
  TRDTM: string; // 成交時間   HHMMSS
  TRDDT: string; //  成交日期   YYYY/MM/DD
  EXH: string; //  交易所
  SPREAD: string; //  組合方式   N:非組合
  PS: 'B' | 'S'; //  買賣別   B：買進  S：賣出
  COMTYPE: '0' | '1'; //  商品類別      0：期貨 1：選擇權
  COMNO: string; //  商品代碼
  COMNONAME: string; //商品代碼中文名
  COMYM: string; //  商品年月   YYYYMM
  STKPRC: string; //  履約價
  CALLPUT: string; //  CP
  TRDQTY: string; //  本次成交口數/成交總口數
  PRICE: string; //  成交單價/均價
  ODPRICE: string; //  原委託價
  DTRADE: 'Y' | 'N'; //  當沖碼    Y：當沖 N：非當沖
  AENO: string; //  營業員代碼
  OPERATOR: string; //  操盤員代碼
  TRDTYPE: string; //  委託別
  TYPE: 'I' | 'V' | 'A' | 'E'; //  來源別 “I”:網路單 “V”:語音單 “A”:交易員下單 “E”:eLeader 單
  RECORDCNT: string; //  查詢總筆數
  CURRENTCNT: string; //  目前筆數
  SERIALNO: string; //  查詢序號
  PDATE: string; //  到期日
}

export interface QueryHistoryReversalMessage {
  FCODE: '65';
  MTYPE: 'O';
  COMPANY: string; //  公司碼
  ACCOUNT: string; //  帳號
  EXH: string; //  交易所
  CURRENCY: string; //  幣別
  SEQNO: string; //  網路單號
  ORDNO: string; //  委託單號
  TRDDT: string; //  成交日期
  PS: 'B' | 'S'; //   買賣別   B：買進  S：賣出
  COMTYPE: '0' | '1'; //   商品類別 0：期貨 1：選擇權
  COMNO: string; //   商品代碼
  COMNONAME: string; //   商品代碼中文名
  COMYM: string; //   商品年月   YYYYMM
  STKPRC: string; //   履約價
  CALLPUT: string; //   CALL/PUT
  IAMT: string; //   原始保證金
  MAMT: string; //   維持保證金
  TRDPRC: string; //   成交價
  OSTRDDT: string; //   平倉成交日  YYYY/MM/DD
  OSORDNO: string; //   平倉委託單號
  OSTRDPRC: string; //   平倉成交價
  OSQTY: string; //   平倉口數
  OSPRTLOS: string; //   平倉損益
  FEE: string; //   手續費
  TAX: string; //   交易稅
  NETRTLOS: string; //   凈損益
  AENO: string; //   營業員代碼
  OPERATOR: string; //   操盤員代碼
  RECORDCNT: string; //   查詢總筆數
  CURRENTCNT: string; //   目前筆數
  QTIME: string; //   查詢時間 HHMMSS
  SERIALNO: string; //   查詢序號
  PDATE: string; //   到期日 YYYYMMDD
  ORDDT: string; //   資料日期  YYYYMMDD
  ORDNO2: string; //   新制委託書號
  NOPERATOR: string; //   新操盤員代碼
  BLANK: string; //   空白
}

export interface QueryHistoryInsuranceMessage {
  FCODE: '66';
  MTYPE: 'O';
  COMPANY: string; //公司碼
  ACCOUNT: string; //帳號
  CURRENCY: string; //幣別
  DBALNE: string; //可委託額
  DWARN: string; //風險係數
  DADAMT: string; //追繳金額
  DBALNC: string; //本日餘額
  DBALN: string; //本日權益數
  DLBALN: string; // 昨日餘額
  DPMAMT: string; // 權利金額
  DTPLAMT: string; // 平倉損益
  DIMAMT: string; // 帳戶出入金
  DTUNPL: string; // 非日盤浮動損益
  DJUNPL: string; // 日盤浮動損益
  DDUNPL: string; // (今日異動)
  DMFEEB: string; // 手續交稅
  DAPAMT: string; // 選擇權市值
  DVPAMT: string; // 帳戶清算值
  DOIMMRG: string; // 委託保金
  DTIMMRG: string; // 部位保金
  DTMMMRG: string; // 維持保金
  JPYMARGIN1: string; // 日盤追加保金(定盤)
  OUTMONEY: string; // 可網路出金金額
  MOVEJPYMARGIN1: string; // 日盤追加保金(動盤)
  DERATE: string; // 匯率
  RECORDCNT: string; // 查詢總筆數 0 表示無資料
  CURRENTCNT: string; // 目前筆數
  QTIME: string; // 查詢時間 HHMMSS
  SERIALNO: string; // 查詢序號
  ORDDT: string; // 資料日期 YYYY/MM/DD
}

export interface QueryYesterdayPositionMessage {
  FCODE: '67';
  MTYPE: 'O';
  COMPANY: string; //公司碼
  ACCOUNT: string; //帳號
  EXH: string; //交易所
  CURRENCY: string; //幣別
  COMTYPE: '0' | '1'; //商品類別 0：期貨 1：選擇權
  COMNO: string; //商品代碼
  COMNONAME: string; //商品代碼中文名
  COMYM: string; //商品年月   YYYYMM
  STKPRC: string; // 履約價
  CALLPUT: string; // CALL/PUT
  MKTPRE1: string; // 市價
  BSOPTQTY: string; // 昨日留倉口數(B)
  SSOPTQTY: string; // 昨日留倉口數(S)
  BORDQTY: string; // 今日委託口數(B)
  SORDQTY: string; // 今日委託口數(S)
  STRDQTY: string; // 今日成交口數(S)
  BOSTQTY: string; // 今日沖銷口數(B)
  SOSTQTY: string; // 今日沖銷口數(S)
  BCOPTQTY: string; // 今日留倉口數(B)
  SCOPTQTY: string; // 今日留倉口數(S)
  OSPRTLOS: string; // 平倉損益
  TRDPRC: string; // 成交均價
  BPRTPRC: string; // 買未平倉均價
  SPRTPRC: string; // 賣未平倉均價
  PRTLOS: string; // 未平倉損益
  RECORDCNT: string; //查詢總筆數
  CURRENTCNT: string; // 目前筆數
  QTIME: string; // 查詢時間 HHMMSS
  SERIALNO: string; // 查詢序號
  PDATE: string; // 到期日
  TAIFEXSYMBOL: string; // TAIFEX 商品代碼
}

export interface QueryYesterdayTransactionMessage {
  FCODE: '68';
  MTYPE: 'O';
  COMPANY: string; // 分公司代號
  ACCOUNT: string; // 客戶帳號
  COMTYPE: 'F' | 'P' | 'C'; // 商品類別   期貨：F 選擇權：(P-賣權 C-買權)
  SPREAD: 'Y' | 'N'; // 組合方式   Y:組合, N:非組合
  BS: 'B' | 'S'; // 買賣別   B:買進 S:賣出
  EXH: string; // 交易所
  CURRENCY: string; // 幣別
  COMNO: string; //  商品代碼
  COMNONAME: string; //商品代碼中文名
  COMYM: string; //  履約月份   YYYYMM
  STKPRC1: string; //  履約價格
  CALLPUT: string; //  CP1
  TDATE: string; //  成交日期
  TTIME: string; //  成交時間
  PRICE: string; //  成交價格
  TRDQTY: string; //  成交口數
  ORDNO: string; //  委託書號
  DNO: string; //  分單號碼
  DTRADE: string; //  當沖碼Ｆ
  OPEN: 'O' | 'C' | 'A'; //  新平碼   O:開倉 C:平倉 A:自動
  TRADECODE: string; //  交易代碼
  RECORDCNT: string; //  查詢總筆數
  CURRENTCNT: string; //  目前筆數
  QTIME: string; //  查詢時間   HHMMSS
  SERIALNO: string; //  查詢序號
}

export interface QueryCustomersSignMessage {
  FCODE: '80';
  SEQNO: string; // 前台序號
  COMPANY: string; // 公司別
  ACCOUNT: string; // 帳號
  TYPE: '1' | '3' | '5' | '7' | 'A'; // 簽署種類   1:當沖申請 3:市價同意書申請 5:下單 IP 同位址申請 7:盤後檢核簽署 A:委任帳號查詢
  QUALIFIED: 'Y' | 'N'; // 資格符合   Y:已簽署  N:未簽署
  MESSAGE: string; // 訊息   中文訊息，如”無此帳號”
}

export interface CheckAndChangePasswordMessage {
  FCODE: '81';
  SEQNO: string; // 前台序號
  TYPE: 'A' | 'B'; // 異動別    A:密碼驗證(2004) B:密碼更改(2005)
  COMPANY: string; // 分公司
  ACCOUNT: string; // 客戶帳號
  CODE: string; // 狀態
  SCODE: 'V000' | 'V099' | 'V098' | 'V001' | 'V097' | 'V096'; // 來源別  V000:密碼正確 V099:密碼錯誤 V098:首次驗證 V001:處理成功 V097:處理失敗 V096:密碼錯誤三次
}

export type OrderSocketMessage =
  | SessionIdMessage
  | UrgentNoticeMessage
  | DisconnectMessage
  | HeartbeatMessage
  | RiskControlMessage
  | OrderReportMessage
  | DealReportMessage
  | QueryInsuranceMessage
  | QueryOpenPositionMessage
  | QueryDayReversalMessage
  | QueryFuturesStatusMessage
  | QueryPaymentMessage
  | QueryMarginMessage
  | QueryPaymentAndIncomeMessage
  | QueryCapitalTransferMessage
  | QueryDomesticAndForeignPaymentandIncomeMessage
  | QueryMaxPaymentMessage
  | QueryDayCommissionMessage
  | QueryDayTransactionMessage
  | QueryHistoryCommissionMessage
  | QueryHistoryTransactionMessage
  | QueryHistoryReversalMessage
  | QueryHistoryInsuranceMessage
  | QueryYesterdayPositionMessage
  | QueryYesterdayTransactionMessage
  | QueryCustomersSignMessage
  | CheckAndChangePasswordMessage;
