import env from "@beam-australia/react-env";

export type EnvKey =
  | "APP_NAME"
  | "QUOTE_MASTER_URL"
  | "QUOTE_MASTER_SOCKET_END_POINT"
  | "QUOTE_SLAVE_URL"
  | "QUOTE_SLAVE_SOCKET_END_POINT"
  | "VERSION"
  | "TRADE_API_URL"
  | "TRADE_SOCKET_END_POINT";

export interface EnvObject {
  appName: string;
  quoteMasterUrl: string;
  quoteMasterSocketEndPoint: string;
  version: string;
}

function getEnv(): EnvObject;
function getEnv(key: EnvKey): string;
function getEnv(key?: EnvKey) {
  if (key) {
    return env(key);
  }

  return {
    appName: env("APP_NAME"),
    quoteMasterUrl: env("QUOTE_MASTER_URL"),
    quoteMasterSocketEndPoint: env("QUOTE_MASTER_SOCKET_END_POINT"),
    version: env("VERSION"),
  };
}

export { getEnv };

export default getEnv;
