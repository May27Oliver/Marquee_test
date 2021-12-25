import api from "api";
import { useAsyncRetry } from "react-use";
import { symbolListType } from "api/MarqueeConf";

const useQueryGroupList = (groupId: number) => {
  return useAsyncRetry<symbolListType[]>(async () => {
    const response = await api.getSymbols(groupId);
    if (!response.result) return [];
    return response.data;
  }, [groupId]);
};

export default useQueryGroupList;
