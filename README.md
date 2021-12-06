# 股價派送系統

## 工作記錄

2021.11.19 建立好 Socket 連線，連接永豐報價系統取得資料 1.設定環境變數.env 檔
.env 檔內有內外期主機的 url，讀取 env 檔的程式為 tools/getEnv.ts
內期為 SLAVE，外期為 MASTER。

2.連結內外期 Socket
相關程式為 App.tsx 的 useConnectMasterQuoteSocket(外期)和 useConnectSlaveQuoteSocket(內期)，Socket 建立好後，相關通道資料會記載在 useApex 這個 context api 內。

3.取得 SessionId
連結到 Socket 後 Socket 會給你 SessionId(兩張張學友演唱會門票)，有了 SessionId 就能向豐全球內外期主機要 Quote、Kline 和 Tick，相關程式寫在 App.tsx 的 useListenApexSessionIdSubject，內外期 sessionId 同樣記載在 Context Api：useApexContext 內

4.取得 Quote,Tick,Kline
有了 Quote 就可以取得個股資訊，相關程式為 useSingleQuote 這個 hook
有了 Kline 和 Tick 就可以即時更新個股資訊，相關程式為 api 內的 registerTick()，把個股 Symbol,需要的資料 types,內外期 SessionId 當作參數丟進去，就可以取得 Kline 和 Tick

5.製作跑馬燈動畫，12/1 號使用 gsap 製作
動畫 timeline()從右到左，計算時間
問題：gsap 在切換網頁頁面時動畫會停止，產生重疊。
用 gsap.ticker.lagSmoothing(0)處理。

6.製作線圖，收 Tick，8 秒 render 一次，從開盤到收盤早上九點到下午一點，一分 K 總共會有 240 根左右的 KLine，只取 30 根，亦即大概 8 分鐘取一根。
先做一個有 30 個元素的陣列，api 取 KLine 時，把 KLine 收盤價 以 8 分為單位安插入陣列，剩下陣列的空值由 socket 的資料填入，然後 socket 取到 KLine 資料時要去更換當下時間最近的那根 KLine 的收盤價。
