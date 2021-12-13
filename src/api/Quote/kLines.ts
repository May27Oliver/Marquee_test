import decimal from "decimal.js";

import { AxiosInstance } from "axios";
import { KLine as KlineModel } from "model/KLine";

import { formateDateStringToTimeStamp } from "tools/formateDateStringToTimeStamp";
import getEnv from "tools/getEnv";

interface KLine {
  "31": number; // Price
  "273": string; // Tick Time
  "332": number; // High
  "333": number; // Low
  "1020": number; // Open
  "1025": number; // Volume
}

interface KLineResponse {
  SessionID: string;
  KLineCount: number;
  KLines: KLine[] | null;
}

function kLineResponseParser(kLines: KLine[], priceDecimal: number = 4) {
  const parser =
    (priceDecimal: number) =>
    (kLines: KLine): KlineModel => {
      const tickTime = formateDateStringToTimeStamp(kLines["273"]);
      const priceDelimiter = Math.pow(10, priceDecimal);
      const open = parseFloat(
        new decimal(kLines["1025"]).div(priceDelimiter).toPrecision()
      );
      const high = parseFloat(
        new decimal(kLines["332"]).div(priceDelimiter).toPrecision()
      );
      const low = parseFloat(
        new decimal(kLines["333"]).div(priceDelimiter).toPrecision()
      );
      const price = parseFloat(
        new decimal(kLines["31"]).div(priceDelimiter).toPrecision()
      );
      const vol = kLines["1020"];
      return {
        tickTime: tickTime,
        open,
        high,
        low,
        price,
        vol,
      };
    };

  return kLines.map<KlineModel>(parser(priceDecimal));
}

export interface GetKLinesParameters {
  symbol: string;
  sessionId: string;
  priceDecimal: number;
}

export const getKLines = async (
  axios: AxiosInstance,
  { symbol, sessionId, priceDecimal }: GetKLinesParameters
) => {
  const requestData = JSON.stringify({
    SessionID: sessionId,
    Symbol: symbol,
    StartTime: "00000000_00:00:00.000",
    EndTime: "99999999_99:99:99.999",
  });

  const { data } = await axios.post<KLineResponse>(`/api/kline`, requestData, {
    baseURL: getEnv("QUOTE_SLAVE_URL"),
  });
  if (!data.KLines || data.KLines.length === 0) {
    return [];
  }

  return kLineResponseParser(data.KLines, priceDecimal);
};
