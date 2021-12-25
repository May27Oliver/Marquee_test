import Axios, { AxiosInstance } from "axios";

interface speedType {
  result: boolean;
  speed_data: {
    speed: number;
    use: boolean;
  };
}
//取得速度資料
export const querySpeed = async () => {
  const { data } = await Axios.get<speedType>(
    `http://localhost:8888/getSpeeds`
  );
  console.log("測試api querySpeed data", data);
  if (!data.result) {
    return { result: false, reason: "查無資料" };
  }
  return { result: true, reason: data.speed_data };
};
