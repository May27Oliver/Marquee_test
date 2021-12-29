import { AxiosInstance } from "axios";
interface speedType {
  result: boolean;
  speed: {
    Speed: number;
    Use: boolean;
  };
}

interface MessageType {
  result: boolean;
  message: string;
}

//取得速度資料
export const querySpeed = async (axios: AxiosInstance) => {
  const { data } = await axios.get<speedType>(`/getSpeed`);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, data: data.speed.Speed };
};

//修改速度
export const updateSpeed = async (axios: AxiosInstance, speed: number) => {
  const request_data = JSON.stringify({
    speed,
  });
  const { data } = await axios.post<MessageType>(`/updateSpeed`, request_data);
  return data;
};
