import { AxiosInstance } from "axios";

export interface LoginType {
  result: boolean;
  message: string;
  code?: number;
  sessionId?: string;
}

export interface VerifyResultType {
  result: boolean;
  verify: string;
}

export const login = async (
  axios: AxiosInstance,
  account: string,
  password: string
) => {
  const request_data = JSON.stringify({
    account,
    password,
  });
  const { data } = await axios.post<LoginType>(`/login`, request_data);
  if (data.result && data.sessionId) {
    //如果登入成功就將sessionId寫入cookie
    document.cookie = `sessionId=${data.sessionId}`;
  }
  return data;
};

export const verifyLogin = async (axios: AxiosInstance, sessionId: string) => {
  const request_data = JSON.stringify({
    sessionId,
  });
  const { data } = await axios.post<VerifyResultType>(
    `/verifyLogin`,
    request_data
  );
  return data;
};
