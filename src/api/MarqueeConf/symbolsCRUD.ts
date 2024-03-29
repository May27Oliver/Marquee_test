import { AxiosInstance } from "axios";

export type QueryResponse<T> =
  | {
      result: true;
      data: T;
    }
  | {
      result: false;
      reason: string;
    };

export interface SymbolListType {
  Symbol: string;
  GroupId: number;
  Show: boolean;
  MarqueeOrder: number;
  StockName: string;
}

interface QuerySymbols {
  result: boolean;
  symbols: SymbolListType[];
}
interface QueryMarqueeSymbols {
  result: boolean;
  symbols: string[];
}
interface MessageType {
  result: boolean;
  message: string;
}

interface ResponseGroupName {
  result: boolean;
  groupName: { GroupID: number; GroupName: string; Play: boolean };
}

export interface SymbolType {
  groupId: number;
  symbol: string;
  stockNo: string;
  stockName: string;
  show: boolean;
  marqueeOrder: number;
}

export const queryGroupName = async (axios: AxiosInstance) => {
  const { data } = await axios.get<ResponseGroupName>(`/getGroupName`);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }

  return {
    result: true,
    data: {
      group_id: data.groupName.GroupID,
      group_name: data.groupName.GroupName,
      play: data.groupName.Play,
    },
  };
};

/*查詢symbols*/
export const querySymbols = async (
  axios: AxiosInstance,
  groupId: number
): Promise<QueryResponse<SymbolType[]>> => {
  const { data } = await axios.get<QuerySymbols>(
    `/getSymbols/groupId=${groupId ? groupId : 1}`
  );
  const symbolList = data.symbols.map((item) => ({
    groupId: item.GroupId,
    symbol: item.Symbol,
    stockName: item.StockName,
    show: item.Show,
    stockNo: item.Symbol.slice(0, 4),
    marqueeOrder: item.MarqueeOrder,
  }));
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, data: symbolList };
};

//增加symbols
export const addSymbols = async (
  axios: AxiosInstance,
  groupno: number,
  symbol: SymbolType
) => {
  const requestData = JSON.stringify({
    groupId: groupno,
    symbol,
  });
  const { data } = await axios.post<MessageType>(`/addSymbol`, requestData);
};

//匯入symbols
export const importSymbols = async (
  axios: AxiosInstance,
  groupno: number,
  importList: SymbolType[]
) => {
  const request_data = JSON.stringify({
    groupId: groupno,
    symbols: importList,
  });
  const { data } = await axios.post<MessageType>(
    `/importSymbols`,
    request_data
  );
  return data;
};

//修改播放群組
export const updateGroupNo = async (axios: AxiosInstance, groupno: number) => {
  const request_data = JSON.stringify({
    groupId: groupno,
  });
  const { data } = await axios.post<MessageType>(
    `/updateGroupNo`,
    request_data
  );
  return data;
};

export const deleteSymbol = async (
  axios: AxiosInstance,
  groupno: number,
  symbol: SymbolType
) => {
  const requestData = JSON.stringify({
    groupId: groupno,
    symbol,
  });
  const { data } = await axios.post<MessageType>(`/deleteSymbol`, requestData);
  return data;
};

export const getMarqueeSymbols = async (
  axios: AxiosInstance
): Promise<QueryResponse<string[]>> => {
  const { data } = await axios.get<QueryMarqueeSymbols>(`/getMarqueeSymbols`);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, data: data.symbols };
};
