import moment from 'moment-timezone';
import decimal from 'decimal.js';
import { AxiosInstance } from 'axios';

import { History as HistoryModel } from 'model/History';

import getEnv from 'tools/getEnv';

const BASE_QUERY_COUNT = 300;
const DATE_FORMAT = 'YYYYMMDD';

interface HistoryResponse {
  35: string;
  48: string;
  50: string;
  12008: string;
  12017: string;
  20119: string;
  20120: number;
  20121: History[] | null;
}

interface History {
  '31': string; // Price
  '273': string; // Tick Time
  '332': string; // High
  '333': string; // Low
  '1025': string; // Open
  '1020': string; // Volume
}

function historyResponseParser(
  histories: History[],
  priceDecimal: number,
): HistoryModel[] {
  return histories.map((history) => {
    const tickTime = history['273'];
    let dateTime = moment
      .tz(tickTime, 'YYYYMMDD_HH:mm:ss', 'Etc/GMT')
      .valueOf();
    const priceDelimiter = Math.pow(10, priceDecimal);
    const open = parseFloat(
      new decimal(history['1025']).div(priceDelimiter).toPrecision(),
    );
    const high = parseFloat(
      new decimal(history['332']).div(priceDelimiter).toPrecision(),
    );
    const low = parseFloat(
      new decimal(history['333']).div(priceDelimiter).toPrecision(),
    );
    const price = parseFloat(
      new decimal(history['31']).div(priceDelimiter).toPrecision(),
    );
    const vol = parseInt(history['1020']);

    return {
      tickTime: dateTime,
      open,
      high,
      low,
      price,
      vol,
    };
  });
}

type Period = '1' | '5' | '10' | '30' | '60' | 'D' | 'M' | 'W';

export interface GetHistoryParameters {
  symbol: string;
  period: Period;
  priceDecimal: number;
}

export const getHistory = async (
  axios: AxiosInstance,
  { symbol, period, priceDecimal }: GetHistoryParameters,
) => {
  const baseDay = moment().add('day', 1);
  const endDate = baseDay.format(DATE_FORMAT);
  const startDate = baseDay.subtract('year', 10).format(DATE_FORMAT);

  const requestData = JSON.stringify({
    50: '00001',
    1129: 'APEX0001',
    35: 'GetHisData',
    48: symbol,
    20119: period,
    30070: startDate,
    30071: endDate,
    30072: BASE_QUERY_COUNT,
  });

  const response = await axios.post<HistoryResponse>(
    `/api/history`,
    requestData,
    {
      baseURL: getEnv('QUOTE_MASTER_URL'),
    },
  );

  if (response.data[12008] !== '00000') {
    throw new Error('系統繁忙');
  }

  const histories = response.data[20121];
  return !Array.isArray(histories)
    ? []
    : historyResponseParser(histories, priceDecimal);
};
