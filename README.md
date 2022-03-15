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

7.12/6 修改 gsap 動畫為單 timeline 後發現 chrome dev tool 內 performance 的效率很低，出現很多 cls 警告，原因為 socket 資料處理與畫面渲染彼此搶資料，故決定導入 redux 讓 model 與 view 分開，所有 500 檔商品資料在 redux 內進行 socket 資料處理，然後 view 再定時跟 redux 取資料更新畫面即可。

8.12/7 研究 rx.js，如何把握到註冊與解註冊的 timing，收 socket 不能一根一根跑，rx 能否過濾每一支商品？可以，在每個 stock component 內訂閱 socket 並 pipe(filter & throttleTime)即可

9.進行註冊與解註冊的功能建構，一次註冊 30 檔，並在特定時間進行 sliding window 註冊。

10.在個別 component getQuote，不知能否限定 api 不因為 component 重新 render 而重複呼叫。

11.在個別 component 內呼叫 api 結果資料回來量太大取不到

12.12/10sliding_window 取 Quote 註冊功能完成。

13.[Bug]線圖在重新註冊後會 double，處理完畢，取消解構賦值。

14.開始進行 golang 後端建置，使用 golang。

15.golang net/http 和 gin 套件進行監聽 server 端的服務

16.在 golang gin 設定 corse，暫且讓所有請求都回應。

17.切後台網頁，預估作業有：a.匯入 csv 檔案功能 b.管理群組資訊，增刪改查 c.改變播放群組

18. 12/23 匯入與新增 csv 與個股完成(已完成)。

19.查詢 speed 與查詢 groupname 尚未完成(已完成)。

20.完成匯入新增更改群組播放查詢等功能
因為有 Network low balance，所以現在上版要上兩個地方。

## 打包與上版

因為有 Network low balance，所以現在上版要上兩個地方。<br>
60.250.174.223<br>
<br>
192.168.192.225<br>

### 打包前記得要換 api 路徑：cod

檔案位置：<br>
src/api/index.tsx Line.16 行<br>

#### 打包時：

baseURL: getEnv("MARQUEE_KGI_URL"),<br>

#### 開發時

baseURL: getEnv("LOCAL_TEST"),<br>

### 打包指令

yarn run build<br>
-r 是整個目錄以及其下檔案一起複製的指令<br>

#### to 223

scp -r ./build/* root@60.250.174.223:/apex/VIP20/WebAdapter/static/elecScroll<br>

#### to 225 不能直接在本地端傳到 225，要透過 223 跳板傳輸，先到以下路徑:

root@60.250.174.223:/VIP20/WebAdapter/static<br>
<br>
scp -r ./elecScroll/* root@192.168.192.225:/apex/VIP20/WebAdapter/static/elecScroll
