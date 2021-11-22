import { AxiosInstance } from "axios";
import getEnv from "tools/getEnv";

export interface RegisterResponse {
  result: "success" | "fail";
}

export type RegisterAvailableTypes = "Tick" | "KLine" | "BA" | "1BA" | "UE";

export interface RegisterParameters {
  symbols: string[] | string;
  types: RegisterAvailableTypes[];
  masterSessionId: string;
  slaveSessionId: string;
  others?: { [k: string]: string };
}

export const register = async (
  axios: AxiosInstance,
  {
    symbols,
    types,
    masterSessionId,
    slaveSessionId,
    others,
  }: RegisterParameters
) => {
  const baseRequestData = {
    Prods: Array.isArray(symbols) ? symbols : [symbols],
    Types: types,
    ...others,
  };

  // debugger
  const results = await Promise.all([
    axios.post<RegisterResponse>(
      `/api/reg`,
      JSON.stringify({ SessionId: masterSessionId, ...baseRequestData }),
      {
        baseURL: getEnv("QUOTE_MASTER_URL"),
      }
    ),
    axios.post<RegisterResponse>(
      `/api/reg`,
      JSON.stringify({ SessionId: slaveSessionId, ...baseRequestData }),
      {
        baseURL: getEnv("QUOTE_SLAVE_URL"),
      }
    ),
  ]);

  return results.every(({ data: { result } }) => result === "success");
};

export default register;
