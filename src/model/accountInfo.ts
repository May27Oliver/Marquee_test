import { padEnd } from "lodash";

export interface AccountInfo {
  company: string; // 公司碼
  account: string; // 帳號碼
  agentId: string; //營員代號
  certificateFlag: string; //憑證註記
  firstLogin: string; //第一次登入註記
  NJC25: string; //電子同意書日期
  agreeDailyTradeFlag: string; //當沖同意註記
  CSCDFlag: string; //信用戶註記
  CUTX: "Y" | "N"; //全委戶註記 ‘Y’ 全委戶 ‘N’ 非全委戶
  id: string;
  AccName: string;
}

export interface AccountInfoResponse {
  ACType: "S" | "F" | "H"; //‘S’證券 ‘F’期貨 ‘H’複委託
  BHNO: string; //分公司
  AccName: string; //帳號姓名
  AgentID: string; //營員代號
  CAFlag: string; //憑證註記
  FirstLogin: string; //第一次登入註記
  NJC25: string; //電子同意書日期
  CSEQ: string; //帳號
  CKNO: string; //帳號檢查碼
  CDFlag: string; //當沖同意註記
  CSCDFlag: string; //信用戶註記
  CUTX: "Y" | "N"; //全委戶註記 ‘Y’ 全委戶 ‘N’ 非全委戶
  ID: string;
}

export function responseToModelConverter(
  account: AccountInfoResponse
): AccountInfo {
  return {
    company: padEnd(`${account.ACType}${account.BHNO}`, 7, "0"),
    account: `${account.CSEQ}${account.CKNO}`,
    agentId: account.AgentID,
    certificateFlag: account.CAFlag,
    firstLogin: account.FirstLogin,
    NJC25: account.NJC25,
    agreeDailyTradeFlag: account.CDFlag,
    CSCDFlag: account.CSCDFlag,
    CUTX: account.CUTX,
    id: account.ID,
    AccName: account.AccName,
  };
}
