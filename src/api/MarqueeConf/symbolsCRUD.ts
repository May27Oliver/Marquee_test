import axios, { AxiosInstance } from "axios";

export type QueryResponse<T> =
  | {
      result: true;
      data: T;
    }
  | {
      result: false;
      reason: string;
    };

export interface symbolListType {
  Symbol: string;
  GroupId: string;
  Show: boolean;
  Marquee_order: number;
  StockName: string;
}

interface QuerySymbols {
  result: boolean;
  data: symbolListType[];
}

interface createSymbolsRes {
  success: boolean;
}

interface testRes {
  message: string;
}

interface groupnameType {
  result: boolean;
  data: {
    group_id: number;
    group_name: string;
    play: boolean;
  };
}

export interface requestSymbol {
  symbol: string;
  stockNo: string;
  stockName: string;
  show: boolean;
  marqueeOrder: number;
}

export const queryGroupName = async () => {
  const { data } = await axios.get<groupnameType>(
    `http://localhost:8888/getGroupName`
  );
  console.log("測試api queryGroupName data", data);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, data: data.data };
};

/*查詢symbols*/
export const querySymbols = async (
  groupID: number
): Promise<QueryResponse<symbolListType[]>> => {
  const { data } = await axios.get<QuerySymbols>(
    `http://localhost:8888/getSymbols/groupname=${groupID}`
  );
  console.log("測試api querySymbols data", data);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, data: data.data };
};

//增加symbols
export const addSymbols = async (groupno: number, symbol: requestSymbol) => {
  const requestData = JSON.stringify({
    groupId: groupno,
    symbol,
  });
  const { data } = await axios.post<createSymbolsRes>(
    "http://localhost:8888/addSymbol",
    requestData
  );
  console.log("createSymbols data response", data);
};

//匯入symbols
export const importSymbols = async (
  groupno: number,
  importList: requestSymbol[]
) => {
  const request_data = JSON.stringify({
    groupId: groupno,
    symbols: importList,
  });
  const { data } = await axios.post<createSymbolsRes>(
    "http://localhost:8888/importSymbols",
    request_data
  );
  console.log("importSymbols data response", data);
};

//修改播放群組
export const updateGroupNo = async (groupno: number) => {
  const request_data = JSON.stringify({
    groupId: groupno,
  });
  const { data } = await axios.post<createSymbolsRes>(
    "http://localhost:8888/updateGroupNo",
    request_data
  );
};

//修改速度
export const updateSpeed = async (speed: number) => {
  const request_data = JSON.stringify({
    speed,
  });
  const { data } = await axios.post<createSymbolsRes>(
    "http://localhost:8888/updateSpeed",
    request_data
  );
};

export const deleteSymbol = async (groupno: number, symbol: requestSymbol) => {
  const requestData = JSON.stringify({
    groupId: groupno,
    symbol,
  });
  const { data } = await axios.post<createSymbolsRes>(
    "http://localhost:8888/deleteSymbol",
    requestData
  );
};
