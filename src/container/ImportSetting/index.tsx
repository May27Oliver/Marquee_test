import React from "react";
import classNames from "classnames/bind";
import styles from "container/Setting/index.module.css";
import { SymbolType } from "api/MarqueeConf";
import api from "api";
import useQueryGroupList from "container/ManageSetting/useQueryGroupList";

const cx = classNames.bind(styles);

const ImportSetting: React.FC = () => {
  const [importList, setImportList] = React.useState<SymbolType[] | null>(null);
  const [groupno, setGroupNo] = React.useState<number>(1);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const { value: symbolList } = useQueryGroupList(groupno);

  const handleCSV = (res: string) => {
    const newRes = res
      .replaceAll("\r\n", "\n")
      .split("\n")
      .map((item, index) => {
        const [stockName, stockNo, symbol] = item.split(",");
        return {
          groupId: groupno,
          stockName,
          stockNo,
          symbol,
          show: true,
          marqueeOrder: symbolList ? symbolList.length + index + 1 : index + 1,
        };
      })
      .filter(Boolean);
    setImportList(newRes);
  };

  React.useEffect(() => {
    if (importList === null || importList.length === 0) return;
    api.importSymbols(groupno, importList);
    //跳窗顯示匯入成功
  }, [importList]);

  return (
    <>
      <div className={cx("setting-type-content")}>
        <div className={cx("setting-content-line")}>
          <div className={cx("write-group-name")}>
            請選擇欲匯入群組名稱：
            <select
              className={cx("import-stock-group-name")}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                if (newValue === groupno) return;
                setGroupNo(newValue);
                setImportList([]);
              }}
            >
              <option value={1}>科技股</option>
              <option value={2}>電子股</option>
              <option value={3}>傳產股</option>
              <option value={4}>自選股</option>
            </select>
          </div>
          <div className={cx("upload-wrap")}>
            <button className={cx("import-file-fake-button")}>匯入檔案</button>
            <input
              ref={inputRef}
              className={cx("upload-file-input")}
              type="file"
              accept=".csv, application/vnd.ms-excel"
              onChange={async (e) => {
                if (!e.target.files || e.target.files.length === 0) return;
                const file = e.target.files[0];
                if (
                  file.type.match("text/csv") ||
                  file.type.match("application/vnd.ms-excel")
                ) {
                  let reader = new FileReader();
                  reader.readAsText(file);
                  reader.onload = (e) => {
                    if (!e.target || typeof e.target.result !== "string")
                      return;

                    handleCSV(e.target.result);
                  };
                } else {
                  //顯示檔案錯誤
                }
              }}
              multiple={false}
            />
          </div>
        </div>
        <div className={cx("import-stock-list")}>
          <div className={cx("stock-list")}>
            {importList?.map((stock) => {
              return (
                <div className={cx("stock-items")}>
                  <div className={cx("group-title-and-delete", "flex-row")}>
                    <div className={cx("group-item-title", "item-line-height")}>
                      {stock.stockName}
                    </div>
                  </div>
                  <div className={cx("item-line-height", "flex-column")}>
                    {stock.stockNo}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportSetting;
