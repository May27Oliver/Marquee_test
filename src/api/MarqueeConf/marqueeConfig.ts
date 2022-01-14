import { AxiosInstance } from "axios";
interface speedType {
  result: boolean;
  speed: number;
  message?: string;
}

interface MessageType {
  result: boolean;
  message: string;
}

interface DirectionType {
  result: boolean;
  direction: number; // 1:左, 2:右
  message?: string;
}

//取得速度資料
export const querySpeed = async (axios: AxiosInstance) => {
  const { data } = await axios.get<speedType>(`/getSpeed`);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, speed: data.speed };
};

//修改速度
export const updateSpeed = async (axios: AxiosInstance, speed: number) => {
  const request_data = JSON.stringify({
    speed,
  });
  const { data } = await axios.post<MessageType>(`/updateSpeed`, request_data);
  return data;
};

export const getDirection = async (axios: AxiosInstance) => {
  const { data } = await axios.get<DirectionType>(`/getDirection`);
  console.log("get direction", data);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, direction: data.direction };
};

//修改速度
export const updateDirection = async (
  axios: AxiosInstance,
  direction: number
) => {
  const request_data = JSON.stringify({
    direction,
  });
  const { data } = await axios.post<MessageType>(
    `/updateDirection`,
    request_data
  );
  return data;
};
