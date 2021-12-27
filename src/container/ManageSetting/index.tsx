import React from "react";
import classNames from "classnames/bind";
import styles from "container/Setting/index.module.css";
import api from "api";
import * as Icons from "icons";
import useQueryGroupList from "./useQueryGroupList";
import { SymbolType } from "api/MarqueeConf";

const cx = classNames.bind(styles);

const ManageSetting: React.FC = () => {
  const [searchWords, setSearchWords] = React.useState<string>(""); //快速查詢
  const [groupno, setGroupNo] = React.useState<number | null>(null);
  const {
    value: symbolList,
    loading,
    error,
    retry,
  } = useQueryGroupList(groupno);
  const [stockList, setStockList] = React.useState<SymbolType[]>([]);
  //add Symbol
  const [stockNo, setStockNo] = React.useState<string>("");
  const [stockName, setStockName] = React.useState<string>("");
  const filterAfterSearchWords = (stockList: SymbolType[]) => {
    if (!searchWords) return stockList;

    return stockList.filter((item) => {
      if (item.symbol.indexOf(searchWords) !== -1) {
        return true;
      } else {
        return false;
      }
    });
  };
  React.useEffect(() => {
    (async () => {
      const response = await api.getGroupNames();
      if (!response.result || !response.data) return;
      setGroupNo(response.data.group_id);
    })();
  }, []);

  React.useEffect(() => {
    if (!symbolList) return;
    // setGroupNo(symbolList)
    setStockList(symbolList);
  }, [symbolList]);

  React.useEffect(() => {
    if (!groupno) return;
    (async () => {
      await api.updateGroupNo(groupno);
    })();
  }, [groupno]);
  return (
    <>
      <div className={cx("setting-type-content")}>
        <div className={cx("list-wrap", "flex-column")}>
          <div className={cx("column-title")}>選擇播放群組：</div>
          <div className={cx("group-manage-column")}>
            <div className={cx("group-items", "bottom-line-none")}>
              <div className={cx("group-item-title", "item-line-height")}>
                {groupno && (
                  <select
                    className={cx("group-manage-setting")}
                    value={groupno}
                    onChange={(e) => {
                      setGroupNo(parseInt(e.target.value));
                    }}
                  >
                    <option value={1}>科技股</option>
                    <option value={2}>電子股</option>
                    <option value={3}>傳產股</option>
                    <option value={4}>自選股</option>
                  </select>
                )}
              </div>
              <div className={cx("play-wrap")}>
                <div className={cx("play-icom")}></div>
              </div>
            </div>
          </div>
          <div className={cx("column-title")}>
            股票管理：
            <div className={cx("quick-search")}>
              快速查詢(請輸入股票代碼)：
              <input
                type="text"
                onChange={(e) => {
                  setSearchWords(e.target.value);
                }}
              />
              <div className={cx("quick-search-icon")}>
                <Icons.Search fill="#ccc" width={20} />
              </div>
            </div>
          </div>
          <div className={cx("column-wrap")}>
            <div className={cx("column-list")}>
              {filterAfterSearchWords(stockList).map((stock, stidx) => (
                <div className={cx("stock-items")} key={stock.marqueeOrder}>
                  <div className={cx("group-title-and-delete", "flex-row")}>
                    <div
                      className={cx("group-item-delete", "item-line-height")}
                    >
                      <button
                        className={cx("delete-group")}
                        onClick={() => {
                          if (!groupno) return;
                          api.deleteSymbol(groupno, stock);
                          setStockList((prev) =>
                            prev.filter((stock, i) => {
                              return stidx !== i;
                            })
                          );
                          // retry();
                        }}
                      >
                        刪除
                      </button>
                    </div>
                    <div className={cx("group-item-title", "item-line-height")}>
                      {stock.stockName}
                    </div>
                  </div>
                  <div className={cx("item-line-height", "flex-column")}>
                    {stock.stockNo}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("add-stock-col")}>
            <div className={cx("item-line-height", "add-input-col")}>
              <div className={cx("add-stock-name", "add-col")}>
                股票名稱：
                <input
                  type="text"
                  onChange={(e) => setStockName(e.target.value)}
                />
              </div>
              <div className={cx("add-stock-no", "add-col")}>
                股票代碼：
                <input
                  type="text"
                  onChange={(e) => setStockNo(e.target.value)}
                />
              </div>
              <button
                className={cx("send-stock-name-to-list")}
                onClick={async () => {
                  if (!groupno) return;
                  await api.addSymbols(groupno, {
                    groupId: groupno,
                    symbol: stockNo + ".TW",
                    stockName: stockName,
                    stockNo: stockNo,
                    show: true,
                    marqueeOrder: stockList.length + 1,
                  });
                  retry();
                }}
              >
                新增
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSetting;
