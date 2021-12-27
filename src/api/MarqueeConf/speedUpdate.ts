import axios, { AxiosInstance } from "axios";

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
export const querySpeed = async () => {
  const { data } = await axios.get<speedType>(`http://localhost:8888/getSpeed`);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, data: data.speed.Speed };
};

//修改速度
export const updateSpeed = async (speed: number) => {
  const request_data = JSON.stringify({
    speed,
  });
  const { data } = await axios.post<MessageType>(
    "http://localhost:8888/updateSpeed",
    request_data
  );
  return data;
};
