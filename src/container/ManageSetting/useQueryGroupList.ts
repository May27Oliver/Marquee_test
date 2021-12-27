import api from "api";
import { useAsyncRetry } from "react-use";
import { SymbolType } from "api/MarqueeConf";

const useQueryGroupList = (groupId: number | null) => {
  return useAsyncRetry<SymbolType[]>(async () => {
    if (!groupId) return [];
    const response = await api.getSymbols(groupId);
    if (!response.result) return [];
    return response.data;
  }, [groupId]);
};

export default useQueryGroupList;
